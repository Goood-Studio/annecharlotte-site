// Bandeau cookies + mesure d'audience d'annecharlotte.be (19/11/2026).
// Un seul fichier pour tout le site : chargé par Base.astro et par les pages
// statiques de public/ (bingo, novembre, lunchbox…).
//
// Principe (APD, Belgique) : rien n'est envoyé à Google tant que la personne
// n'a pas dit « D'accord ». Refuser est aussi simple qu'accepter (même taille,
// même nombre de clics). Le choix est gardé sur l'appareil (localStorage,
// strictement nécessaire) et redemandé après CHOIX_DUREE_JOURS. Le lien
// « Gérer les cookies » (pied de page) rouvre le bandeau à tout moment.
//
// Tant qu'aucun outil soumis au consentement n'est configuré ci-dessous, le
// bandeau ne s'affiche pas (rien à demander). ?cookies dans l'adresse force
// son affichage pour les tests.
(function () {
  'use strict';

  // ——— Réglages ———
  var GA4_ID = ''; // ID de mesure GA4 (G-XXXXXXXXXX), à coller une fois la propriété créée
  var DATAFAST_ID = 'dfid_m5WwsB60wnlIhsZZLbPXv'; // site DataFast « www.annecharlotte.be », créé en 07/2025 (historique Framer conservé)
  var DATAFAST_DOMAINE = 'www.annecharlotte.be'; // = domaine enregistré dans DataFast (comme Nutriciens)
  // DataFast en mode « sans cookie » (décision de Valentin, 19/11/2026) : chargé
  // dès l'arrivée pour compter tout le monde, sans cookie et sans transfert à
  // Google (identifiant haché côté serveur, sel renouvelé chaque jour ; seul un
  // identifiant de session temporaire est gardé en sessionStorage). Le réglage
  // « Cookieless » du site est activé dans DataFast : les deux doivent rester
  // alignés. Mettre false repasse DataFast (script.js, cookies 365 j) derrière
  // le bandeau, comme GA4.
  var DATAFAST_SANS_COOKIE = true;
  var CHOIX_DUREE_JOURS = 182; // APD : préférence gardée ~6 mois, puis on redemande (oui comme non)
  var COOKIE_GA_SECONDES = 60 * 60 * 24 * 180; // cookies _ga alignés sur la durée du choix
  var VERSION = 1; // à incrémenter si les outils ou les finalités changent : tout le monde est redemandé
  var HOTES_MESURES = ['www.annecharlotte.be', 'annecharlotte.be'];
  var CLE = 'ac-cookies';

  var script = document.currentScript;
  var politique = (script && script.getAttribute('data-politique')) || '/technique/politique-confidentialite/';
  var enProd = HOTES_MESURES.indexOf(location.hostname) !== -1;
  var aDemander = !!GA4_ID || (!!DATAFAST_ID && !DATAFAST_SANS_COOKIE);

  // ——— Choix mémorisé ———
  function lireChoix() {
    try {
      var c = JSON.parse(localStorage.getItem(CLE) || 'null');
      if (!c || (c.choix !== 'oui' && c.choix !== 'non') || c.v !== VERSION) return null;
      if (Date.now() - new Date(c.le).getTime() > CHOIX_DUREE_JOURS * 864e5) return null;
      return c.choix;
    } catch (e) { return null; }
  }
  function ecrireChoix(choix) {
    try { localStorage.setItem(CLE, JSON.stringify({ choix: choix, le: new Date().toISOString(), v: VERSION })); } catch (e) {}
  }

  // ——— Chargement des outils ———
  var charge = { ga: false, df: false };
  function chargerScript(src, attrs) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    for (var k in attrs) s.setAttribute(k, attrs[k]);
    document.head.appendChild(s);
  }
  function chargerGA() {
    if (!GA4_ID || !enProd || charge.ga) return;
    charge.ga = true;
    window['ga-disable-' + GA4_ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    // Consent Mode v2, mode de base : le tag n'existe qu'après « D'accord ».
    // Les signaux publicitaires restent refusés quoi qu'il arrive.
    gtag('consent', 'default', {
      ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied'
    });
    gtag('consent', 'update', { analytics_storage: 'granted' });
    gtag('js', new Date());
    gtag('config', GA4_ID, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_expires: COOKIE_GA_SECONDES
    });
    chargerScript('https://www.googletagmanager.com/gtag/js?id=' + GA4_ID, {});
  }
  function chargerDataFast() {
    if (!DATAFAST_ID || !enProd || charge.df) return;
    charge.df = true;
    window.datafast = window.datafast || function () { (window.datafast.q = window.datafast.q || []).push(arguments); };
    chargerScript('https://datafa.st/js/' + (DATAFAST_SANS_COOKIE ? 'script.cookieless.js' : 'script.js'), { 'data-website-id': DATAFAST_ID, 'data-domain': DATAFAST_DOMAINE });
  }
  function appliquer(choix) {
    if (DATAFAST_SANS_COOKIE) chargerDataFast();
    if (choix !== 'oui') return;
    chargerGA();
    chargerDataFast();
  }
  // Retrait du consentement : on coupe GA et on efface ses cookies.
  function retirer() {
    try { if (charge.ga && window.gtag) gtag('consent', 'update', { analytics_storage: 'denied' }); } catch (e) {}
    if (GA4_ID) window['ga-disable-' + GA4_ID] = true;
    // (datafast_* : anciens cookies de l'époque Framer, avant le mode sans cookie)
    var noms = document.cookie.split(';').map(function (c) { return c.split('=')[0].trim(); });
    noms.forEach(function (n) {
      if (/^_ga(_|$)|^datafast_/.test(n)) {
        [location.hostname, '.' + location.hostname.replace(/^www\./, '')].forEach(function (d) {
          document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + d;
        });
        document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      }
    });
  }

  // ——— Événements utiles (RDV, WhatsApp, guides) ———
  function suivre(nom, params) {
    try { if (charge.ga && window.gtag) gtag('event', nom, params || {}); } catch (e) {}
    try { if (charge.df && window.datafast) window.datafast(nom, params || {}); } catch (e) {}
  }
  function formuleDe(url) {
    try { return new URL(url, location.href).searchParams.get('formule') || 'visio'; } catch (e) { return 'visio'; }
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('a[href], button[data-lien]');
    if (!el) return;
    var h = el.getAttribute('href') || el.getAttribute('data-lien') || '';
    if (/cal\.com\//i.test(h)) suivre('rdv_agenda', { formule: el.getAttribute('data-lieu') || formuleDe(location.href) });
    else if (/\/bilan\/?($|[?#])/i.test(h)) suivre('rdv_clic', { formule: formuleDe(h) });
    else if (/wa\.me\//i.test(h)) suivre('whatsapp_clic', { type: 'message' });
    else if (/whatsapp\.com\/channel\//i.test(h)) suivre('whatsapp_clic', { type: 'chaine' });
    else if (/\.pdf($|[?#])/i.test(h)) suivre('guide_telechargement', { fichier: h.split('/').pop().split(/[?#]/)[0] });
  }, true);
  window.acSuivre = suivre;

  // ——— Bandeau ———
  var bandeau = null;
  var CSS =
    '.ac-cookies{position:fixed;z-index:70;left:12px;right:12px;bottom:calc(84px + env(safe-area-inset-bottom));' +
    'max-width:380px;box-sizing:border-box;background:#FAF5EE;color:#22312C;border:1px solid #E3D8C7;border-radius:18px;' +
    'padding:12px 14px;box-shadow:0 10px 30px rgba(22,53,44,.16);font-family:var(--police-texte,inherit);font-size:14px;line-height:1.4;' +
    'opacity:0;transform:translateY(8px);transition:opacity .25s ease,transform .25s ease}' +
    '.ac-cookies.ac-visible{opacity:1;transform:none}' +
    '.ac-cookies p{margin:0;max-width:none;color:#22312C;font-size:14px;line-height:1.4}' +
    '.ac-cookies strong{display:block;margin-bottom:2px;color:#16352C;font-size:15px}' +
    '.ac-cookies a{color:#16352C;text-decoration:underline;text-decoration-color:#C96C80;text-underline-offset:2px}' +
    '.ac-cookies-actions{display:flex;gap:8px;margin-top:10px}' +
    '.ac-cookies button{flex:1;min-height:42px;margin:0;padding:7px 14px;border-radius:999px;border:2px solid #16352C;' +
    'font:inherit;font-weight:700;font-size:15px;cursor:pointer;transition:background .15s ease,color .15s ease}' +
    '.ac-cookies .ac-non{background:transparent;color:#16352C}.ac-cookies .ac-non:hover{background:#16352C;color:#FAF5EE}' +
    '.ac-cookies .ac-oui{background:#16352C;color:#FAF5EE}.ac-cookies .ac-oui:hover{background:#0F261F}' +
    '.ac-cookies button:focus-visible{outline:2px solid #C96C80;outline-offset:2px}' +
    'html.barre-rdv-cachee .ac-cookies{bottom:calc(12px + env(safe-area-inset-bottom))}' +
    'html.ac-cookies-ouvert .wa-flottant{visibility:hidden}' +
    '@media (min-width:860px){.ac-cookies{left:22px;right:auto;bottom:22px}html.ac-cookies-ouvert .wa-flottant{visibility:visible}}' +
    '@media (prefers-reduced-motion:reduce){.ac-cookies{transition:none}}';

  function fermer() {
    if (!bandeau) return;
    var b = bandeau;
    bandeau = null;
    document.documentElement.classList.remove('ac-cookies-ouvert');
    b.classList.remove('ac-visible');
    setTimeout(function () { b.remove(); }, 260);
  }
  function choisir(choix) {
    var avant = lireChoix();
    ecrireChoix(choix);
    fermer();
    if (choix === 'oui') appliquer('oui');
    else if (avant === 'oui') { retirer(); }
  }
  function ouvrir() {
    if (bandeau) return;
    if (!document.getElementById('ac-cookies-css')) {
      var st = document.createElement('style');
      st.id = 'ac-cookies-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    bandeau = document.createElement('div');
    bandeau.className = 'ac-cookies';
    bandeau.setAttribute('role', 'region');
    bandeau.setAttribute('aria-label', 'Cookies');
    var outils = [GA4_ID && 'Google Analytics', DATAFAST_ID && !DATAFAST_SANS_COOKIE && 'DataFast'].filter(Boolean).join(' et ') || 'des outils de mesure';
    bandeau.innerHTML =
      '<p><strong>Des cookies sans sucre ajouté</strong>' +
      'Avec ton accord, ' + outils + ' comptent les visites, pour savoir ce qui t’aide vraiment. ' +
      'Pas de pub, promis, et tu peux changer d’avis en bas de page. ' +
      '<a href="' + politique + '#cookies">En savoir plus</a></p>' +
      '<div class="ac-cookies-actions">' +
      '<button type="button" class="ac-non">Non merci</button>' +
      '<button type="button" class="ac-oui">D’accord</button>' +
      '</div>';
    bandeau.querySelector('.ac-non').addEventListener('click', function () { choisir('non'); });
    bandeau.querySelector('.ac-oui').addEventListener('click', function () { choisir('oui'); });
    document.body.appendChild(bandeau);
    document.documentElement.classList.add('ac-cookies-ouvert');
    setTimeout(function () { if (bandeau) bandeau.classList.add('ac-visible'); }, 30);
  }
  window.acCookies = { ouvrir: ouvrir, choix: lireChoix };

  // « Gérer les cookies » (pied de page) : rouvre le bandeau au lieu de quitter la page.
  document.addEventListener('click', function (e) {
    var lien = e.target.closest && e.target.closest('[data-cookies-gerer]');
    if (!lien) return;
    e.preventDefault();
    ouvrir();
  });

  // ——— Démarrage ———
  var force = /[?&]cookies(=|&|$)/.test(location.search);
  var choix = lireChoix();
  appliquer(choix);
  function demarrer() { if (force || (aDemander && !choix)) ouvrir(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', demarrer);
  else demarrer();
})();
