// ─────────────────────────────────────────────────────────────────────────────
// navbar.js — Navbar reutilizável injetada em todas as páginas
// ─────────────────────────────────────────────────────────────────────────────

const NAVBAR_PAGES = [
    { href: 'tl_trofeus.html',                    label: '🏠 Início',      key: 'tl_trofeus'   },
    { href: 'calibracao.html',                    label: '⚙️ Calibração', key: 'calibracao'   },
    { href: 'kickoff.html',                       label: '🎯 Kickoff',    key: 'kickoff'      },
    { href: 'masters.html',                       label: '⚔️ Masters',    key: 'masters'      },
    { href: 'Champion_MSI_CAREER_EDITION.html',   label: '🏆 Champion',   key: 'champion'     },
];

// Detecta a página atual pelo nome do arquivo
function getCurrentPage() {
    const path = window.location.pathname.split('/').pop() || 'tl_trofeus.html';
    for (const p of NAVBAR_PAGES) {
        if (path === p.href) return p.key;
    }
    return '';
}

// Retorna status de cada torneio (com base no localStorage)
function getPageStatus(key) {
    try {
        switch (key) {
            case 'calibracao': {
                const s = (DB.load('msi_calib_state_v1') || null);
                const elo = (DB.load('msi_elo_v14_prime') || {});
                const tlElo = elo['Team Liquid']?.elo ?? 0;
                if (tlElo >= 1000) return { dot: '✅', tip: `Calibração concluída — ELO: ${tlElo}` };
                if (s?.cycle > 1 || tlElo > 0) return { dot: '🔄', tip: `Em andamento — ELO: ${tlElo}` };
                return { dot: '⚪', tip: 'Não iniciado' };
            }
            case 'kickoff': {
                const q = (DB.load('msi_qualifiers_v1') || {});
                const done = ['AMER','EMEA','PAC','CN'].filter(r => q[r]?.length === 2).length;
                if (done === 4) return { dot: '✅', tip: '4/4 regiões classificadas' };
                if (done > 0)  return { dot: '🔄', tip: `${done}/4 regiões concluídas` };
                return { dot: '⚪', tip: 'Não iniciado' };
            }
            case 'masters': {
                const s = (DB.load('masters_save_v1') || null);
                if (!s) return { dot: '⚪', tip: 'Não iniciado' };
                if (s.currentPhase === 'FINISHED') return { dot: '✅', tip: 'Masters concluído' };
                return { dot: '🔄', tip: `Em andamento — ${s.currentPhase}` };
            }
            case 'champion': {
                const s = (DB.load('msi_save_v15_zero') || null);
                if (!s) return { dot: '⚪', tip: 'Não iniciado' };
                if (s.currentPhase === 'FINISHED') return { dot: '✅', tip: `Season ${s.seasonNumber || '?'} concluída` };
                return { dot: '🔄', tip: `Season ${s.seasonNumber || '?'} em andamento` };
            }
            default: return null;
        }
    } catch(e) { return null; }
}

function injectNavbar() {
    const current = getCurrentPage();
    const eloData = (DB.load('msi_elo_v14_prime') || {});
    const tlElo   = eloData['Team Liquid']?.elo ?? '—';

    const links = NAVBAR_PAGES.map(p => {
        const isActive = p.key === current;
        const status   = getPageStatus(p.key);
        const dot      = status ? `<span class="nav-dot" title="${status.tip}">${status.dot}</span>` : '';
        return `<a href="${p.href}" class="nav-link ${isActive ? 'active' : ''}" title="${p.label}">
            ${p.label}${dot}
        </a>`;
    }).join('');

    const html = `
<nav id="mainNav">
    <div class="nav-inner">
        <a href="tl_trofeus.html" class="nav-brand">
            <img src="https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1637252586938_teamliquid.png" alt="TL">
            <span>TL <span class="nav-brand-sim">SIM</span></span>
        </a>
        <div class="nav-links">${links}</div>
        <div class="nav-right">
            <span class="nav-elo">ELO <strong id="navElo">${tlElo}</strong></span>
            <span id="dbStatus" class="nav-status">🔄</span>
        </div>
    </div>
</nav>
<style>
    #mainNav {
        position: sticky; top: 0; z-index: 1000;
        background: rgba(9,9,11,0.92);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(0,174,255,0.15);
        width: 100%; padding: 0 20px;
        box-sizing: border-box;
    }
    .nav-inner {
        max-width: 1200px; margin: 0 auto;
        display: flex; align-items: center; gap: 8px;
        height: 52px;
    }
    .nav-brand {
        display: flex; align-items: center; gap: 8px;
        text-decoration: none; color: #fff;
        font-weight: 900; font-size: 1rem;
        letter-spacing: 2px; text-transform: uppercase;
        margin-right: 8px; flex-shrink: 0;
    }
    .nav-brand img { width: 28px; height: 28px; object-fit: contain; }
    .nav-brand-sim { color: #00aeff; }
    .nav-links {
        display: flex; align-items: center; gap: 2px; flex: 1;
        overflow-x: auto; scrollbar-width: none;
    }
    .nav-links::-webkit-scrollbar { display: none; }
    .nav-link {
        display: flex; align-items: center; gap: 4px;
        padding: 6px 12px; border-radius: 4px;
        text-decoration: none; color: #6a8fa8;
        font-size: 0.78rem; font-weight: bold;
        text-transform: uppercase; letter-spacing: 0.5px;
        white-space: nowrap; transition: all 0.15s;
        border: 1px solid transparent;
    }
    .nav-link:hover { color: #00aeff; background: rgba(0,174,255,0.06); }
    .nav-link.active {
        color: #00aeff; background: rgba(0,174,255,0.1);
        border-color: rgba(0,174,255,0.2);
    }
    .nav-dot { font-size: 0.7rem; }
    .nav-right {
        display: flex; align-items: center; gap: 10px;
        margin-left: auto; flex-shrink: 0;
    }
    .nav-elo {
        font-size: 0.75rem; color: #6a8fa8;
        font-family: 'Consolas', monospace;
    }
    .nav-elo strong { color: #ffd700; }
    .nav-status {
        font-size: 0.68rem; font-family: monospace;
        color: #666; white-space: nowrap;
    }
    /* Adjust body padding to account for navbar */
    body { padding-top: 0 !important; }
</style>`;

    // Inject at top of body
    document.body.insertAdjacentHTML('afterbegin', html);

    // Remove any old dbStatus divs that might have been injected earlier
    document.querySelectorAll('body > div#dbStatus').forEach(el => el.remove());
}

// Auto-update ELO in navbar after DB.init
const _origDBInit = window.DB?.init?.bind(window.DB);
if (_origDBInit) {
    window.DB.init = async function() {
        await _origDBInit();
        const eloData = (DB.load('msi_elo_v14_prime') || {});
        const tlElo   = eloData['Team Liquid']?.elo ?? '—';
        const el = document.getElementById('navElo');
        if (el) el.textContent = tlElo;
    };
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectNavbar);
} else {
    injectNavbar();
}
