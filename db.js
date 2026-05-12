// ─────────────────────────────────────────────────────────────────────────────
// db.js — Camada de persistência Supabase + localStorage (fallback offline)
//
// Fluxo:
//   1. DB.init()  → puxa todos os dados do Supabase e popula o localStorage
//   2. DB.save()  → escreve no localStorage imediatamente (síncrono) +
//                   envia ao Supabase em background (assíncrono)
//   3. DB.load()  → lê do localStorage (já sincronizado pelo init)
//
// Os simuladores não precisam saber se estão online ou offline.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// ── ⚠️ SUBSTITUA PELOS SEUS DADOS DO SUPABASE ────────────────────────────────
const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co';
const SUPABASE_KEY = 'SUA_ANON_KEY'; // chave "anon public" do seu projeto
// ─────────────────────────────────────────────────────────────────────────────

const TABLE    = 'simulator_data';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const KNOWN_KEYS = new Set([
    'msi_elo_v14_prime',
    'msi_tl_career_v1',
    'msi_qualifiers_v1',
    'tl_trophies_v1',
    'msi_calib_state_v1',
    // 'calib_pending_tl' é intencionalmente EXCLUÍDA — é estado efêmero de sessão.
    // Se sincronizar com Supabase, o DB.init() restaura ela após o usuário confirmar
    // o resultado, reabrindo o modal em loop. Deve viver só no localStorage.
    'kickoff_save_v1',
    'masters_save_v1',
    'msi_save_v15_zero',
    'msi_archive_v15_zero',
    'msi_champs_v15_zero',
    'tl_player_profile_v1',
    'tl_seasons_history_v1',
    'global_invitational_v1',
]);

let _online     = true;
let _writeQueue = [];

function setStatus(online) {
    _online = online;
    const el = document.getElementById('dbStatus');
    if (!el) return;
    el.textContent = online ? '🟢 Online' : '🔴 Offline (dados locais)';
    el.style.color = online ? '#42f590'   : '#ff9d00';
}

async function sbWrite(key, value) {
    try {
        if (value === null || value === undefined) {
            const { error } = await supabase.from(TABLE).delete().eq('key', key);
            if (error) throw error;
        } else {
            const { error } = await supabase.from(TABLE).upsert(
                { key, value, updated_at: new Date().toISOString() },
                { onConflict: 'key' }
            );
            if (error) throw error;
        }
        setStatus(true);
    } catch (e) {
        console.warn(`[DB] write failed "${key}", queued:`, e.message);
        setStatus(false);
        _writeQueue.push({ key, value });
    }
}

async function flushQueue() {
    if (!_writeQueue.length) return;
    const pending = [..._writeQueue];
    _writeQueue   = [];
    for (const { key, value } of pending) await sbWrite(key, value);
    console.log(`[DB] Flushed ${pending.length} pending write(s)`);
}

window.addEventListener('online', flushQueue);

window.DB = {
    async init() {
        const el = document.getElementById('dbStatus');
        if (el) { el.textContent = '🔄 Sincronizando...'; el.style.color = '#6a8fa8'; }

        try {
            const { data, error } = await supabase.from(TABLE).select('key, value');
            if (error) throw error;
            (data || []).forEach(row => {
                if (row.value !== null && row.value !== undefined)
                    localStorage.setItem(row.key, JSON.stringify(row.value));
            });
            setStatus(true);
            console.log(`[DB] Synced ${(data||[]).length} key(s) from Supabase`);
        } catch (e) {
            setStatus(false);
            console.warn('[DB] Supabase unreachable, using localStorage only:', e.message);
        }
    },

    save(key, value) {
        try {
            if (value === null || value === undefined) localStorage.removeItem(key);
            else localStorage.setItem(key, JSON.stringify(value));
        } catch (e) { console.warn('[DB] localStorage write failed:', e.message); }
        if (KNOWN_KEYS.has(key)) sbWrite(key, value);
    },

    load(key) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    },

    remove(key) {
        localStorage.removeItem(key);
        if (KNOWN_KEYS.has(key)) sbWrite(key, null);
    },

    removeAll(keys) { keys.forEach(k => this.remove(k)); },

    isOnline() { return _online; },
};

// Dispara evento global quando DB estiver pronto
// (scripts não-módulo podem escutar window.addEventListener('db-ready', ...))
document.dispatchEvent(new CustomEvent('db-ready'));
