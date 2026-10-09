/**
 * main.js — Orquestrador principal do site Ronaldo Mecânico
 *
 * Inicializa todos os módulos: navegação, horários, WhatsApp,
 * PWA, scroll reveal e Google Maps lazy loading.
 */

import { CONFIG } from './config.js';
import { linkContatoGeral, linkOrcamento, linkServico } from './whatsapp.js';
import { verificarStatus, getHorariosFormatados, atualizarIndicadorStatus } from './opening-hours.js';
import { registrarServiceWorker, configurarInstalacao, monitorarConexao } from './pwa.js';

/* ══════════════════════════════════════
   Inicialização
   ══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNavegacao();
  initWhatsAppLinks();
  initAddressLinks();
  initHorarios();
  initScrollReveal();
  initLazyMap();
  initHeaderScroll();
  registrarServiceWorker();
  configurarInstalacao();
  monitorarConexao();
});

/* ══════════════════════════════════════
   Navegação Mobile
   ══════════════════════════════════════ */
function initNavegacao() {
  const toggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;

  let isOpen = false;

  function abrirMenu() {
    isOpen = true;
    toggle.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    /* Focus trap: focar primeiro link */
    const primeiroLink = mobileNav.querySelector('a');
    if (primeiroLink) primeiroLink.focus();
  }

  function fecharMenu() {
    isOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    toggle.focus();
  }

  toggle.addEventListener('click', () => {
    if (isOpen) fecharMenu();
    else abrirMenu();
  });

  /* Fechar ao clicar em um link */
  const links = mobileNav.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('click', fecharMenu);
  });

  /* Fechar com Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) fecharMenu();
  });

  /* Fechar ao redimensionar para desktop */
  const mq = window.matchMedia('(min-width: 1024px)');
  mq.addEventListener('change', (e) => {
    if (e.matches && isOpen) fecharMenu();
  });
}

/* ══════════════════════════════════════
   Header scroll effect
   ══════════════════════════════════════ */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('header--scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ══════════════════════════════════════
   WhatsApp Links
   ══════════════════════════════════════ */
function initWhatsAppLinks() {
  /* Links gerais */
  document.querySelectorAll('[data-whatsapp="geral"]').forEach((el) => {
    el.href = linkContatoGeral();
  });

  /* Links de orçamento */
  document.querySelectorAll('[data-whatsapp="orcamento"]').forEach((el) => {
    el.href = linkOrcamento();
  });

  /* Links de serviço */
  document.querySelectorAll('[data-whatsapp="servico"]').forEach((el) => {
    const servico = el.dataset.servico;
    if (servico) {
      el.href = linkServico(servico);
    }
  });

  /* WhatsApp FAB */
  const fab = document.getElementById('whatsapp-fab');
  if (fab) {
    fab.href = linkContatoGeral();
  }
}

/* ══════════════════════════════════════
   Horários de Funcionamento
   ══════════════════════════════════════ */
function initHorarios() {
  /* Atualizar indicadores de status */
  atualizarIndicadorStatus();

  /* Renderizar tabela de horários */
  const listaContainer = document.getElementById('hours-list');
  if (listaContainer) {
    const horarios = getHorariosFormatados();
    listaContainer.innerHTML = horarios
      .map(
        (h) => `
      <li class="hours-card__item${h.hoje ? ' hours-card__item--today' : ''}" ${h.hoje ? 'aria-current="date"' : ''}>
        <span class="hours-card__day">${h.dia}</span>
        <span class="hours-card__time">${h.horario}</span>
      </li>
    `
      )
      .join('');
  }

  /* Atualizar status a cada minuto */
  setInterval(atualizarIndicadorStatus, 60000);
}

/* ══════════════════════════════════════
   Scroll Reveal (IntersectionObserver)
   ══════════════════════════════════════ */
function initScrollReveal() {
  /* Respeitar prefers-reduced-motion */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('reveal--visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/* ══════════════════════════════════════
   Lazy Load Google Maps
   ══════════════════════════════════════ */
function initLazyMap() {
  const mapWrapper = document.getElementById('map-wrapper');
  if (!mapWrapper) return;

  const placeholder = mapWrapper.querySelector('.location__map-placeholder');
  const btnCarregar = document.getElementById('btn-carregar-mapa');

  function carregarMapa() {
    const iframe = document.createElement('iframe');
    iframe.src = CONFIG.endereco.googleMapsEmbed;
    iframe.title = `Localização da ${CONFIG.nome} no Google Maps`;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;
    iframe.setAttribute('aria-label', `Mapa mostrando a localização da ${CONFIG.nome}`);

    if (placeholder) placeholder.remove();
    mapWrapper.appendChild(iframe);
  }

  /* Carregar via botão */
  if (btnCarregar) {
    btnCarregar.addEventListener('click', carregarMapa);
  }

  /* Ou carregar via IntersectionObserver quando próximo */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /* Delay para não competir com outros recursos */
          setTimeout(carregarMapa, 500);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '200px',
    }
  );

  observer.observe(mapWrapper);
}

/* ══════════════════════════════════════
   Atalhos de Endereço / Navegação
   ══════════════════════════════════════ */
function initAddressLinks() {
  /* Links para Google Maps */
  document.querySelectorAll('[data-nav="maps"]').forEach((el) => {
    el.href = CONFIG.endereco.googleMapsDir;
  });

  /* Links para Waze */
  document.querySelectorAll('[data-nav="waze"]').forEach((el) => {
    el.href = CONFIG.endereco.wazeUrl;
  });

  /* Botão de copiar endereço */
  document.querySelectorAll('[data-action="copy-address"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(CONFIG.endereco.completo);
        const htmlOriginal = btn.innerHTML;
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copiado!`;
        btn.style.color = '#43A047';
        setTimeout(() => {
          btn.innerHTML = htmlOriginal;
          btn.style.color = '';
        }, 2500);
      } catch (err) {
        alert(`Endereço da oficina:\n${CONFIG.endereco.completo}`);
      }
    });
  });
}

