
exports.applyPolyfills = function() { return Promise.resolve() };

exports.defineCustomElements = function(_, opts) {
  return new Promise(function(resolve, reject) {
    if (typeof document !== 'undefined') {
      opts = opts || {};
      var mod = document.createElement('script');
      mod.setAttribute('type', 'module');
      mod['data-opts'] = opts;
      mod.src = 'https://cdn.jsdelivr.net/npm/@ionic/core@5.3.5/dist/ionic/ionic.esm.js';

      var legacy = document.createElement('script');
      legacy.setAttribute('nomodule', '');
      legacy['data-opts'] = opts;
      legacy.src = 'https://cdn.jsdelivr.net/npm/@ionic/core@5.3.5/dist/ionic/ionic.js';

      mod.onload = resolve;
      mod.onerror = reject;

      legacy.onload = resolve;
      legacy.onerror = reject;

      document.head.appendChild(mod);
      document.head.appendChild(legacy);
    } else {
      resolve();
    }
  });
}
