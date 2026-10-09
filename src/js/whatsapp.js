/**
 * whatsapp.js — Módulo de integração com WhatsApp
 * 
 * Gera links formatados para o WhatsApp com mensagens contextualizadas.
 * Usa o número e mensagens definidos em config.js.
 */

import { CONFIG } from './config.js';

/**
 * Gera um link do WhatsApp com mensagem codificada.
 * @param {string} mensagem - Texto da mensagem
 * @returns {string} URL completa do WhatsApp
 */
export function gerarLinkWhatsApp(mensagem) {
  const msgCodificada = encodeURIComponent(mensagem);
  return `https://wa.me/${CONFIG.whatsapp.numero}?text=${msgCodificada}`;
}

/**
 * Gera link de contato geral.
 * @returns {string}
 */
export function linkContatoGeral() {
  return gerarLinkWhatsApp(CONFIG.mensagens.geral);
}

/**
 * Gera link de solicitação de orçamento.
 * @returns {string}
 */
export function linkOrcamento() {
  return gerarLinkWhatsApp(CONFIG.mensagens.orcamento);
}

/**
 * Gera link de consulta sobre um serviço específico.
 * @param {string} nomeServico - Nome do serviço
 * @returns {string}
 */
export function linkServico(nomeServico) {
  return gerarLinkWhatsApp(CONFIG.mensagens.servico(nomeServico));
}

/**
 * Abre o WhatsApp em nova aba com a mensagem especificada.
 * @param {string} mensagem - Texto da mensagem
 */
export function abrirWhatsApp(mensagem) {
  const url = gerarLinkWhatsApp(mensagem);
  window.open(url, '_blank', 'noopener,noreferrer');
}
