const ver = "V3.1.2";
let isDev = false;

const repoPath = `https://raw.githubusercontent.com/Niximkk/Khanware/refs/heads/${isDev ? "dev/" : "main/"}`;

let device = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
    apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
};

/* User */
let user = {
    username: "Username",
    nickname: "Nickname",
    UID: 0
}

let loadedPlugins = [];

/* Elements */
const unloader = document.createElement('unloader');
const dropdownMenu = document.createElement('dropDownMenu');
const watermark = document.createElement('watermark');
const statsPanel = document.createElement('statsPanel');
const splashScreen = document.createElement('splashScreen');

/* Globals */
window.features = {
    questionSpoof: true,
    videoSpoof: true,
    showAnswers: false,
    autoAnswer: false,
    customBanner: false,
    nextRecomendation: false,
    repeatQuestion: false,
    minuteFarmer: false,
    rgbLogo: false
};
window.featureConfigs = {
    autoAnswerDelay: 3,
    customUsername: "",
    customPfp: ""
};

/* Security */
document.addEventListener('contextmenu', (e) => !window.disableSecurity && e.preventDefault());
document.addEventListener('keydown', (e) => { if (!window.disableSecurity && (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(e.key)))) { e.preventDefault(); } });
console.log(Object.defineProperties(new Error, { toString: {value() {(new Error).stack.includes('toString@') && location.reload();}}, message: {get() {location.reload();}}, }));

/* Misc Styles */
document.head.appendChild(Object.assign(document.createElement("style"),{innerHTML:"@font-face{font-family:'MuseoSans';src:url('https://corsproxy.io/?url=https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf')format('truetype')}" }));
document.head.appendChild(Object.assign(document.createElement('style'),{innerHTML:"::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #555; }"}));

/* KhanTool Menu Styles */
document.head.appendChild(Object.assign(document.createElement('style'),{innerHTML:`.khantool-panel{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(10,14,20,.98);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:0;width:90%;max-width:800px;z-index:10000;display:none;box-shadow:0 20px 60px rgba(0,0,0,.5);font-family:MuseoSans,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;overflow:hidden}.khantool-panel.active{display:block;animation:panelSlideIn .3s ease-out}@keyframes panelSlideIn{from{opacity:0;transform:translate(-50%,-45%)}to{opacity:1;transform:translate(-50%,-50%)}}.khantool-header{background:linear-gradient(135deg,#0a0e14 0%,#131820 100%);padding:1.5rem 2rem;border-bottom:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:space-between}.khantool-logo{display:flex;align-items:center;gap:.75rem;font-size:1.5rem;font-weight:700;color:#fff}.khantool-logo::before{content:'🌿';font-size:1.8rem}.khantool-close{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:#9ca3af;width:32px;height:32px;border-radius:6px;cursor:pointer;font-size:1.2rem;display:flex;align-items:center;justify-content:center;transition:all .2s}.khantool-close:hover{background:rgba(255,255,255,.1);color:#fff}.khantool-content{display:grid;grid-template-columns:1fr 1fr;gap:0;max-height:60vh;overflow-y:auto}.khantool-left,.khantool-right{padding:2rem}.khantool-left{border-right:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.2)}.khantool-features{display:flex;flex-direction:column;gap:.75rem}.khantool-feature{display:flex;align-items:center;gap:.75rem;padding:.5rem 0;cursor:pointer;transition:all .2s;border-radius:6px;padding-left:.5rem}.khantool-feature:hover{background:rgba(255,255,255,.03)}.khantool-checkbox{width:18px;height:18px;border:2px solid rgba(255,255,255,.3);border-radius:4px;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}.khantool-checkbox.checked{background:linear-gradient(135deg,#0091C2,#1985ff);border-color:#1985ff}.khantool-checkbox.checked::after{content:'✓';color:white;font-size:12px;font-weight:bold}.khantool-feature-label{color:rgba(255,255,255,.9);font-size:.95rem;font-weight:500}.khantool-feature-desc{font-size:.75rem;color:#9ca3af;font-style:italic}.khantool-info{color:#9ca3af;font-size:.9rem;line-height:1.6}.khantool-info h3{color:#fff;font-size:1.1rem;margin-bottom:1rem;font-weight:600}.khantool-info p{margin-bottom:1rem}.khantool-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px);z-index:9999;display:none}.khantool-overlay.active{display:block}.khantool-trigger{position:fixed;bottom:20px;right:20px;background:linear-gradient(135deg,#0a0e14 0%,#131820 100%);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.9);padding:.75rem 1.5rem;border-radius:12px;font-size:.9rem;font-weight:600;cursor:pointer;z-index:9998;display:flex;align-items:center;gap:.5rem;transition:all .2s;box-shadow:0 4px 12px rgba(0,0,0,.3);font-family:MuseoSans,sans-serif}.khantool-trigger:hover{background:linear-gradient(135deg,#131820 0%,#1a202c 100%);transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.4)}.khantool-trigger::before{content:'🌿';font-size:1.2rem}@media (max-width:768px){.khantool-content{grid-template-columns:1fr}.khantool-left{border-right:none;border-bottom:1px solid rgba(255,255,255,.1)}}`}));

document.querySelector("link[rel~='icon']").href = 'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ukh0rq22.png';

/* Emmiter */
class EventEmitter{constructor(){this.events={}}on(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]||(this.events[t]=[]),this.events[t].push(e)})}off(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]&&(this.events[t]=this.events[t].filter(t=>t!==e))})}emit(t,...e){this.events[t]&&this.events[t].forEach(t=>{t(...e)})}once(t,e){"string"==typeof t&&(t=[t]);let s=(...i)=>{e(...i),this.off(t,s)};this.on(t,s)}};
const plppdo = new EventEmitter();

new MutationObserver((mutationsList) => { for (let mutation of mutationsList) if (mutation.type === 'childList') plppdo.emit('domChanged'); }).observe(document.body, { childList: true, subtree: true });

/* Misc Functions */
window.debug = function(text) { /* QuickFix */}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => { const audio = new Audio(url); audio.play(); debug(`🔊 Playing audio from ${url}`); };
const findAndClickBySelector = selector => { const element = document.querySelector(selector); if (element) { element.click(); sendToast(`⭕ Pressionando ${selector}...`, 1000); } };

function sendToast(text, duration=5000, gravity='bottom') { Toastify({ text: text, duration: duration, gravity: gravity, position: "center", stopOnFocus: true, style: { background: "#000000" } }).showToast(); debug(text); };

async function showSplashScreen() { splashScreen.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background-color:#000;display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity 0.5s ease;user-select:none;color:white;font-family:MuseoSans,sans-serif;font-size:30px;text-align:center;"; splashScreen.innerHTML = '<span style="color:white;">KHANWARE</span><span style="color:#72ff72;">.SPACE</span>'; document.body.appendChild(splashScreen); setTimeout(() => splashScreen.style.opacity = '1', 10);};
async function hideSplashScreen() { splashScreen.style.opacity = '0'; setTimeout(() => splashScreen.remove(), 1000); };

async function loadScript(url, label) { return fetch(url).then(response => response.text()).then(script => { loadedPlugins.push(label); eval(script); }); }
async function loadCss(url) { return new Promise((resolve) => { const link = document.createElement('link'); link.rel = 'stylesheet'; link.type = 'text/css'; link.href = url; link.onload = () => resolve(); document.head.appendChild(link); }); }

/* Visual Functions */
function setupMenu() {
    loadScript(repoPath+'visuals/mainMenu.js', 'mainMenu');
    loadScript(repoPath+'visuals/statusPanel.js', 'statusPanel');
    loadScript(repoPath+'visuals/widgetBot.js', 'widgetBot');
    loadScript(repoPath+'visuals/khanToolMenu.js', 'khanToolMenu');
    if(isDev) loadScript(repoPath+'visuals/devTab.js', 'devTab');
}

/* Main Functions */ 
function setupMain(){
    loadScript(repoPath+'functions/questionSpoof.js', 'questionSpoof');
    loadScript(repoPath+'functions/videoSpoof.js', 'videoSpoof');
    loadScript(repoPath+'functions/minuteFarm.js', 'minuteFarm');
    loadScript(repoPath+'functions/spoofUser.js', 'spoofUser');
    loadScript(repoPath+'functions/answerRevealer.js', 'answerRevealer');
    loadScript(repoPath+'functions/rgbLogo.js', 'rgbLogo');
    loadScript(repoPath+'functions/customBanner.js', 'customBanner');
    loadScript(repoPath+'functions/autoAnswer.js', 'autoAnswer');
}

/* Inject */
if (!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)) { alert("❌ Khanware Failed to Injected!\n\nVocê precisa executar o Khanware no site do Khan Academy! (https://pt.khanacademy.org/)"); window.location.href = "https://pt.khanacademy.org/"; }

showSplashScreen();

loadScript('https://raw.githubusercontent.com/adryd325/oneko.js/refs/heads/main/oneko.js', 'onekoJs').then(() => { onekoEl = document.getElementById('oneko'); onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')"; onekoEl.style.display = "none"; });
loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin').then(()=>{ DarkReader.setFetchMethod(window.fetch); DarkReader.enable(); })
loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastifyCss');
loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin')
.then(async () => {
    fetch("https://pt.khanacademy.org/api/internal/graphql/getFullUserProfile",{referrer:"https://pt.khanacademy.org/profile/me",body:'{"operationName":"getFullUserProfile","query":"query getFullUserProfile($kaid: String, $username: String) {\\n  user(kaid: $kaid, username: $username) {\\n    id\\n    kaid\\n    key\\n    userId\\n    email\\n    username\\n    profileRoot\\n    gaUserId\\n    isPhantom\\n    isDeveloper: hasPermission(name: \\"can_do_what_only_admins_can_do\\")\\n    isPublisher: hasPermission(name: \\"can_publish\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isModerator: hasPermission(name: \\"can_moderate_users\\", scope: GLOBAL)\\n    isParent\\n    isTeacher\\n    isFormalTeacher\\n    isK4dStudent\\n    isKmapStudent\\n    isDataCollectible\\n    isChild\\n    isOrphan\\n    isCoachingLoggedInUser\\n    canModifyCoaches\\n    nickname\\n    hideVisual\\n    joined\\n    points\\n    countVideosCompleted\\n    bio\\n    profile {\\n      accessLevel\\n      __typename\\n    }\\n    soundOn\\n    muteVideos\\n    showCaptions\\n    prefersReducedMotion\\n    noColorInVideos\\n    newNotificationCount\\n    canHellban: hasPermission(name: \\"can_ban_users\\", scope: GLOBAL)\\n    canMessageUsers: hasPermission(\\n      name: \\"can_send_moderator_messages\\"\\n      scope: GLOBAL\\n    )\\n    isSelf: isActor\\n    hasStudents: hasCoachees\\n    hasClasses\\n    hasChildren\\n    hasCoach\\n    badgeCounts\\n    homepageUrl\\n    isMidsignupPhantom\\n    includesDistrictOwnedData\\n    includesKmapDistrictOwnedData\\n    includesK4dDistrictOwnedData\\n    canAccessDistrictsHomepage\\n    isInKhanClassroomDistrict\\n    underAgeGate {\\n      parentEmail\\n      daysUntilCutoff\\n      approvalGivenAt\\n      __typename\\n    }\\n    authEmails\\n    signupDataIfUnverified {\\n      email\\n      emailBounced\\n      __typename\\n    }\\n    pendingEmailVerifications {\\n      email\\n      __typename\\n    }\\n    hasAccessToAIGuideCompanionMode\\n    hasAccessToAIGuideLearner\\n    hasAccessToAIGuideDistrictAdmin\\n    hasAccessToAIGuideParent\\n    hasAccessToAIGuideTeacher\\n    tosAccepted\\n    shouldShowAgeCheck\\n    birthMonthYear\\n    lastLoginCountry\\n    region\\n    userDistrictInfos {\\n      id\\n      isKAD\\n      district {\\n        id\\n        region\\n        __typename\\n      }\\n      __typename\\n    }\\n    schoolAffiliation {\\n      id\\n      location\\n      __typename\\n    }\\n    __typename\\n  }\\n  actorIsImpersonatingUser\\n  isAIGuideEnabled\\n  hasAccessToAIGuideDev\\n}"}',method:"POST",mode:"cors",credentials:"include"})
    .then(async response => { let data = await response.json(); user = { nickname: data.data.user.nickname, username: data.data.user.username, UID: data.data.user.id.slice(-5) }; })
    
    sendToast("🌿 Khanware injetado com sucesso!");
    
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');
    
    await delay(500);
    
    sendToast(`⭐ Bem vindo(a) de volta: ${user.nickname}`);
    if(device.apple) { await delay(500); sendToast(`🪽 Que tal comprar um Samsung?`); }
    
    loadedPlugins.forEach(plugin => sendToast(`🪀 ${plugin} Loaded!`, 2000, 'top') );
    
    hideSplashScreen();
    setupMenu();
    setupMain();
    
    console.clear();
});

/* Thank you to everyone who has purchased access to my cheat as of 10/28/24.
@Thomaz015
@grazynabazio
@melyssaxavier
@WESLEY.SPREDEMANN
@carine.rech.alves
@nazare.de.maria
@jowsanth
@bielzy
@rafaeldeagostino
@AMFDS
@Jv010107
@Mattheusfreitas01
@Guilhermeoliveira2623
@Matt010101
@voncallis
@Thamiris0001
@Holmes1212
@Martinss0000
@zRoque
@LaryCouto.com.br
@IanyckFerreira
@sales7
@AleSobral
@wbzz2121
@Umunizzz
@ViniciusMancini
@ricardaosantista
@marcos10pc
@bzinxxx
@ryanmzmartins
@Kaleb1577
@brunopereirabarros
@RodrigoMartins1236751
@guixzf
@Leandrohenrq
@damnntiago
@WhoisMe777
@Gustavopc21
@matheus.hx2
@WSZL
@LeozinB2
@Davas123
@joaoviturino
@orickmaxx
@l55nar5
@nextbyhawk
@Bruninda019
@GabrielRibeiroP
@Shinjoia
@hy7pee
@arthurmondequedutra
@PedrooVsp
@zBlucker
@vitiintavares
@Holmes1212
@Anthony06927
@refinado
@ErickMarinelli
@pedroomelhor
@gabrielmonteiro0053
@Felipealexandre10
@saantzx7
@alvarosouzaribeiro
@gabrielejte
@Kevinzada
@antonio77xs
@marcus.floriano.oliveira
*/
