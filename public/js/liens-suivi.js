// Arrivée par un lien de liens.annecharlotte.be (?via=page/id) : on compte ce
// que la personne fait ensuite sur la page, pour ce lien-là. Rien n'est gardé
// sur l'appareil (ni cookie, ni stockage) : seulement le premier clic sur un
// PDF, sur un bouton RDV ou sur WhatsApp, pendant cette visite de la page.
(function () {
  var p = new URLSearchParams(location.search), via = (p.get('via') || '').toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]{0,40}(\/[a-z0-9]{3,12})?$/.test(via)) return;
  // L'adresse redevient propre (les utm_ restent, ?via disparaît).
  p.delete('via');
  var q = p.toString();
  history.replaceState(history.state, '', location.pathname + (q ? '?' + q : '') + location.hash);

  var GO = 'https://bgenoxwpwhqvsqdupnub.supabase.co/functions/v1/go';
  var deja = {};
  function acte(lien) {
    var h = lien.getAttribute('href') || '';
    if (/\.pdf($|[?#])/i.test(h)) return 'telechargement';
    if (/wa\.me\/|whatsapp\.com\//i.test(h)) return 'whatsapp';
    if (/\/bilan\/?($|[?#])|cal\.com\//i.test(h)) return 'rdv';
    return '';
  }
  document.addEventListener('click', function (e) {
    var lien = e.target.closest && e.target.closest('a[href]');
    if (!lien) return;
    var quoi = acte(lien);
    if (!quoi || deja[quoi]) return;
    deja[quoi] = true;
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (err) {}
    try { navigator.sendBeacon(GO + '?' + new URLSearchParams({ l: via, e: quoi, tz: tz })); } catch (err) {}
  }, true);
})();
