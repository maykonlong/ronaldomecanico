/**
 * pwa.js — Registro e gerenciamento do Service Worker / PWA
 */

/**
 * Registra o service worker de forma transparente e em segundo plano.
 */
export function registrarServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', {
        scope: './',
      });

      /* Verificar atualizações em segundo plano silenciosamente */
      if (registration) {
        registration.update();
      }
    } catch (erro) {
      console.warn('Service Worker: falha no registro', erro);
    }
  });
}

/**
 * Verifica se o app pode ser instalado e exibe o prompt customizado.
 */
export function configurarInstalacao() {
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    /* Mostrar botão de instalação se existir no DOM */
    const btnInstalar = document.getElementById('btn-instalar');
    if (btnInstalar) {
      btnInstalar.hidden = false;
      btnInstalar.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const resultado = await deferredPrompt.userChoice;
        if (resultado.outcome === 'accepted') {
          btnInstalar.hidden = true;
        }
        deferredPrompt = null;
      });
    }
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    const btnInstalar = document.getElementById('btn-instalar');
    if (btnInstalar) btnInstalar.hidden = true;
  });
}

/**
 * Detecta se o usuário está offline e mostra indicador.
 */
export function monitorarConexao() {
  function atualizarStatusOnline() {
    const offline = !navigator.onLine;
    document.documentElement.classList.toggle('is-offline', offline);

    /* Desabilitar links de WhatsApp e Maps quando offline */
    const linksExternos = document.querySelectorAll('a[href^="https://wa.me"], a[href*="google.com/maps"]');
    linksExternos.forEach((link) => {
      if (offline) {
        link.setAttribute('data-href-original', link.href);
        link.setAttribute('aria-disabled', 'true');
        link.addEventListener('click', impedirCliqueOffline);
      } else {
        if (link.hasAttribute('data-href-original')) {
          link.removeAttribute('data-href-original');
          link.removeAttribute('aria-disabled');
          link.removeEventListener('click', impedirCliqueOffline);
        }
      }
    });
  }

  function impedirCliqueOffline(e) {
    if (!navigator.onLine) {
      e.preventDefault();
      const aviso = document.getElementById('offline-notice');
      if (aviso) {
        aviso.hidden = false;
        aviso.setAttribute('role', 'alert');
        setTimeout(() => { aviso.hidden = true; }, 4000);
      }
    }
  }

  window.addEventListener('online', atualizarStatusOnline);
  window.addEventListener('offline', atualizarStatusOnline);
  atualizarStatusOnline();
}
