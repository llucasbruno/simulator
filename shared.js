// =============================================================================
// shared.js — Constantes, dados e utilitários compartilhados por todo o projeto
// =============================================================================

// ── Chaves do banco ──────────────────────────────────────────────────────────
const ELO_KEY        = 'msi_elo_v14_prime';
const TL_STATS_KEY   = 'msi_tl_career_v1';
const QUALIFIER_KEY  = 'msi_qualifiers_v1';
const TROPHY_KEY     = 'tl_trophies_v1';
const CALIB_KEY      = 'msi_calib_state_v1';
const KICKOFF_KEY    = 'kickoff_save_v1';
const MASTERS_KEY    = 'masters_save_v1';
const CHAMPION_KEY   = 'msi_save_v15_zero';
const ARCHIVE_KEY    = 'msi_archive_v15_zero';
const CHAMPS_KEY     = 'msi_champs_v15_zero';
const PROFILE_KEY    = 'tl_player_profile_v1';
const SEASONS_KEY    = 'tl_seasons_history_v1'; // histórico de seasons

const DEFAULT_LOGO = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23555'%3E%3Cpath d='M12 2L2 7l1.5 11L12 22l8.5-4L22 7l-10-5z'/%3E%3C/svg%3E";

// ── Times ────────────────────────────────────────────────────────────────────
const REAL_TEAMS_DATA = [
    { name:"NRG",         region:"AMER", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1731490666442_NRGWHT.png" },
    { name:"SEN",         region:"AMER", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1739254422982_sent.png" },
    { name:"LOUD",        region:"AMER", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1644060140569_LOUDGreen.png" },
    { name:"LEV",         region:"AMER", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1644148043034_Leviatncolor.png" },
    { name:"100T",        region:"AMER", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1644966311613_100TVAL.png" },
    { name:"C9",          region:"AMER", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1725635348011_C9-Logo.png" },
    { name:"EG",          region:"AMER", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1731490673901_VintageEG.png" },
    { name:"MIBR",        region:"AMER", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1648844013086_mibr_white-logo.png" },
    { name:"FUR",         region:"AMER", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1644059765262_FURIA-LOGO.png" },
    { name:"KRU",         region:"AMER", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1630017626481_kru.png" },
    { name:"G2",          region:"AMER", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1675329807714_G2-Esports-Logo1.png" },
    { name:"2G",          region:"AMER", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1734014001506_2gPurple.png" },
    { name:"FNC",         region:"EMEA", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1644542427486_download37.png" },
    { name:"Team Liquid", region:"EMEA", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1637252586938_teamliquid.png" },
    { name:"NAVI",        region:"EMEA", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1627386036528_Natus_Vincere_2021_lightmode.png" },
    { name:"TH",          region:"EMEA", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1674060672534_600px-Team_Heretics_2022_allmode1.png" },
    { name:"VIT",         region:"EMEA", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1722030793680_VITALITY_YELLOW.png" },
    { name:"KC",          region:"EMEA", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1651626649157_download1.png" },
    { name:"FUT",         region:"EMEA", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1644342678681_FUT_VRL_DARK.png" },
    { name:"BBL",         region:"EMEA", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1674060310685_BBL-GOLD-EMBLEM1.png" },
    { name:"MKOI",        region:"EMEA", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1734088118323_LOGOS_MKOI_BLUE.png" },
    { name:"APK",         region:"EMEA", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1673468188944_Apeks_Logomark_Orange1.png" },
    { name:"M8",          region:"EMEA", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1734098462992_M8Color_DarkBG.png" },
    { name:"GX",          region:"EMEA", logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1706547566185_GX.png" },
    { name:"PRX",         region:"PAC",  logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1630018120582_paper-rex-2021.png" },
    { name:"DRX",         region:"PAC",  logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1705652820016_DRXwhite.png" },
    { name:"GEN",         region:"PAC",  logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1678453609404_GenG_logo_200407-051.png" },
    { name:"T1",          region:"PAC",  logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1677137430839_T1_infoboximage1.png" },
    { name:"TS",          region:"PAC",  logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1636575342048_team-secret-on-dark.png" },
    { name:"ZETA",        region:"PAC",  logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1630017899610_zeta.png" },
    { name:"DFM",         region:"PAC",  logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1675669923678_190px-DetonatioN_FocusMe_2022_darkmode1.png" },
    { name:"RRQ",         region:"PAC",  logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1707306458590_LOGO_RRQ_orange.png" },
    { name:"TLN",         region:"PAC",  logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1674056858749_Talon_Esports_logo1.png" },
    { name:"GE",          region:"PAC",  logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1677137854820_GERedandBlue-WhiteBG.png" },
    { name:"BME",         region:"PAC",  logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1739254331177_boom.png" },
    { name:"NS",          region:"PAC",  logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1674219422693_NS_.png" },
    { name:"EDG",         region:"CN",   logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1735920597800_edg1.png" },
    { name:"BLG",         region:"CN",   logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1707126028220_BLG.png" },
    { name:"FPX",         region:"CN",   logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1644542485597_download38.png" },
    { name:"TE",          region:"CN",   logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1736345448590_TE.png" },
    { name:"DRG",         region:"CN",   logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1707126143797_DRG.png" },
    { name:"WOL",         region:"CN",   logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1707126969882_WOL.png" },
    { name:"NOVA",        region:"CN",   logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1741178535000_NOVA.png" },
    { name:"TYL",         region:"CN",   logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1768990500116_TYLLOGO.png" },
    { name:"AG",          region:"CN",   logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1707126806655_AG.png" },
    { name:"TEC",         region:"CN",   logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1707127134615_TEC.png" },
    { name:"XLG",         region:"CN",   logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1735920774181_XLGA.PNG" },
    { name:"JDG",         region:"CN",   logo:"https://am-a.akamaihd.net/image?resize=3840:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1707126862498_JDG.png" }
];

// ── ELO ──────────────────────────────────────────────────────────────────────

/**
 * Calcula o ganho/perda de ELO usando a fórmula real.
 * @returns { gain, loss, chance, expected }
 */
function calcElo(winnerRating, loserRating, K) {
    const expected = 1 / (1 + Math.pow(10, (loserRating - winnerRating) / 400));
    const chance   = (expected * 100).toFixed(1);
    const gain     = Math.round(K * (1 - expected));
    const loss     = Math.round(K * expected);
    return { gain, loss, chance, expected };
}

/**
 * Simula um único mapa entre dois times usando ELO.
 * Retorna { winner, loser, sW, sL }
 */
function simMap(t1, t2) {
    const r1     = t1.rating || 0;
    const r2     = t2.rating || 0;
    const chance = Math.max(5, Math.min(95, 100 / (1 + Math.pow(10, (r2 - r1) / 400))));
    const winner = Math.random() * 100 <= chance ? t1 : t2;
    const loser  = winner === t1 ? t2 : t1;
    let sW, sL;
    if (Math.random() < (Math.abs(r1 - r2) > 150 ? 0.35 : 0.12)) {
        sW = 13; sL = Math.floor(Math.random() * 5);
        loser.status = 'tilt'; winner.status = 'fire';
    } else {
        sW = 13; sL = Math.floor(Math.random() * 6) + 6;
        loser.status = 'neutral'; winner.status = 'neutral';
    }
    if (Math.random() > 0.92) { sW = 15; sL = 13; }
    return { winner, loser, sW, sL };
}

/**
 * Simula uma série BO3/BO5 entre dois times.
 * Retorna { winner, loser, score, maps, w1, w2 }
 */
function simSeries(t1, t2, bestOf) {
    let maps = [], w1 = 0, w2 = 0;
    const wt = Math.ceil(bestOf / 2);
    while (w1 < wt && w2 < wt) {
        const r = simMap(t1, t2);
        if (r.winner === t1) w1++; else w2++;
        maps.push(r);
    }
    const winner = w1 > w2 ? t1 : t2;
    const loser  = w1 > w2 ? t2 : t1;
    return { winner, loser, score: `${Math.max(w1,w2)}-${Math.min(w1,w2)}`, maps, w1, w2 };
}

// ── Rank por ELO ──────────────────────────────────────────────────────────────
function getRankFromElo(elo) {
    if (elo >= 2000) return { icon:'👑', label:'LENDÁRIO', color:'#ffd700' };
    if (elo >= 1600) return { icon:'💎', label:'DIAMANTE', color:'#b9f2ff' };
    if (elo >= 1300) return { icon:'💜', label:'PLATINA',  color:'#4fc3f7' };
    if (elo >= 1000) return { icon:'🔵', label:'OURO',     color:'#ffd700' };
    if (elo >= 700)  return { icon:'🟢', label:'PRATA',    color:'#9e9e9e' };
    if (elo >= 400)  return { icon:'🟤', label:'BRONZE',   color:'#cd7f32' };
    return           { icon:'⚪', label:'FERRO',   color:'#888'    };
}

// ── Season History ────────────────────────────────────────────────────────────
/**
 * Salva snapshot da season atual antes de um wipe.
 * @param {string} label  ex: "CALIB Turno 3", "KO-EMEA", "MASTERS", "CHAMPIONS S2"
 */
function saveSeasonSnapshot(label) {
    const eloData  = DB.load(ELO_KEY)       || {};
    const career   = DB.load(TL_STATS_KEY)  || { matches:[], eloHistory:[], headToHead:{} };
    const trophies = DB.load(TROPHY_KEY)    || [];
    const tlElo    = eloData['Team Liquid']?.elo ?? 0;
    const matches  = career.matches;
    const wins     = matches.filter(m => m.result === 'W').length;
    const losses   = matches.filter(m => m.result === 'L').length;

    const seasons  = DB.load(SEASONS_KEY)   || [];
    seasons.push({
        id:        Date.now(),
        label,
        date:      new Date().toLocaleDateString('pt-BR'),
        eloFinal:  tlElo,
        wins,
        losses,
        trophies:  trophies.length,
        matchLog:  [...matches],        // cópia completa das partidas
        eloHistory:[...career.eloHistory],
    });
    DB.save(SEASONS_KEY, seasons);
    return seasons;
}

// ── Stats por fase ────────────────────────────────────────────────────────────
function getStatsByPhase(matches) {
    const phases = {};
    matches.forEach(m => {
        const phase = m.phase?.includes('CALIBR') ? 'Calibração'
                    : m.season?.startsWith('KO')  ? 'Kickoff'
                    : m.season === 'MASTERS'       ? 'Masters'
                    : 'Champion';
        if (!phases[phase]) phases[phase] = { wins:0, losses:0 };
        if (m.result === 'W') phases[phase].wins++;
        else                  phases[phase].losses++;
    });
    return phases;
}

// ── Rival tracking ────────────────────────────────────────────────────────────
function getWorstRivals(headToHead, topN = 3) {
    return Object.entries(headToHead)
        .map(([name, d]) => ({
            name, ...d,
            total: d.wins + d.losses,
            wr: d.wins + d.losses > 0 ? d.wins / (d.wins + d.losses) : 0.5
        }))
        .filter(e => e.total >= 2)
        .sort((a, b) => a.wr - b.wr)
        .slice(0, topN);
}

function getBestRivals(headToHead, topN = 3) {
    return Object.entries(headToHead)
        .map(([name, d]) => ({
            name, ...d,
            total: d.wins + d.losses,
            wr: d.wins + d.losses > 0 ? d.wins / (d.wins + d.losses) : 0.5
        }))
        .filter(e => e.total >= 2)
        .sort((a, b) => b.wr - a.wr)
        .slice(0, topN);
}

// ── Loading overlay helper ────────────────────────────────────────────────────
function hideLoadingOverlay() {
    const ov = document.getElementById('loadingOverlay');
    if (ov) { ov.style.opacity = '0'; setTimeout(() => ov.remove(), 400); }
}

// ── Init pattern — aguarda DB estar disponível ────────────────────────────────
function waitForDB(callback) {
    if (typeof DB !== 'undefined') { callback(); return; }
    document.addEventListener('db-ready', callback, { once: true });
}
