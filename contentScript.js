'use strict';

getcaps();

async function getcaps() {
  fetch(
    window.ytplayer.config.args.raw_player_response.captions
      .playerCaptionsTracklistRenderer.captionTracks[0].baseUrl
  )
    .then(function (response) {
      return response.text();
    })
    .then(function (xmltext) {
      xmltext = xmltext.substring(39);
      const full = xmltext.replace(
        /<transcript><text start="[+-]?([0-9]*[.])?[0-9]+" dur="[+-]?([0-9]*[.])?[0-9]+">/gm,
        ' '
      );
      const full2 = full.replace(
        /<\/text><text start="[+-]?([0-9]*[.])?[0-9]+" dur="[+-]?([0-9]*[.])?[0-9]+">/gm,
        ' '
      );
      const full3 = full2.replace(/<\/text><\/transcript>/gm, ' ');
      const full4 = full3.replace(/&amp;#39;/gm, '\'');
      window.postMessage({ type: 'CAPTIONS', text: full4 }, '*');
    });
}
