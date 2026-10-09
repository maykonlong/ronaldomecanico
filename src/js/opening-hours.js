/**
 * opening-hours.js — Módulo de horário de funcionamento
 * 
 * Calcula o status "Aberto agora" / "Fechado agora" com base
 * no fuso horário America/Sao_Paulo e nos horários configurados.
 */

import { CONFIG } from './config.js';

/**
 * Obtém a hora atual no fuso horário configurado.
 * @returns {{ hora: number, minuto: number, diaSemana: number }}
 */
function getHoraAtual() {
  const agora = new Date();
  const opcoes = { timeZone: CONFIG.horario.fuso };
  const partes = new Intl.DateTimeFormat('pt-BR', {
    ...opcoes,
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    hour12: false,
  }).formatToParts(agora);

  const hora = parseInt(partes.find((p) => p.type === 'hour').value, 10);
  const minuto = parseInt(partes.find((p) => p.type === 'minute').value, 10);

  /* Obter o dia da semana no fuso configurado */
  const dataNoFuso = new Date(
    agora.toLocaleString('en-US', { timeZone: CONFIG.horario.fuso })
  );
  const diaSemana = dataNoFuso.getDay();

  return { hora, minuto, diaSemana };
}

/**
 * Converte string "HH:MM" em minutos desde meia-noite.
 * @param {string} horaStr - String no formato "HH:MM"
 * @returns {number}
 */
function horaParaMinutos(horaStr) {
  const [h, m] = horaStr.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Verifica se a oficina está aberta agora.
 * @returns {{ aberto: boolean, mensagem: string, proximoEvento: string }}
 */
export function verificarStatus() {
  const { hora, minuto, diaSemana } = getHoraAtual();
  const minutosAtuais = hora * 60 + minuto;
  const abertura = horaParaMinutos(CONFIG.horario.abertura);
  const fechamento = horaParaMinutos(CONFIG.horario.fechamento);
  const diaFuncionamento = CONFIG.horario.dias.includes(diaSemana);

  if (diaFuncionamento && minutosAtuais >= abertura && minutosAtuais < fechamento) {
    const minutosRestantes = fechamento - minutosAtuais;
    const horasRestantes = Math.floor(minutosRestantes / 60);
    const minsRestantes = minutosRestantes % 60;

    let proximoEvento = 'Fecha ';
    if (horasRestantes > 0) {
      proximoEvento += `em ${horasRestantes}h`;
      if (minsRestantes > 0) proximoEvento += `${minsRestantes}min`;
    } else {
      proximoEvento += `em ${minsRestantes}min`;
    }

    return {
      aberto: true,
      mensagem: 'Aberto agora',
      proximoEvento,
    };
  }

  /* Encontrar próximo horário de abertura */
  let proximoEvento = `Abre às ${CONFIG.horario.abertura.replace(':', 'h')}`;

  if (!diaFuncionamento) {
    /* Encontrar o próximo dia útil */
    for (let i = 1; i <= 7; i++) {
      const proximoDia = (diaSemana + i) % 7;
      if (CONFIG.horario.dias.includes(proximoDia)) {
        const nomeDia = CONFIG.horario.diasNomes[proximoDia];
        proximoEvento = `Abre ${nomeDia} às ${CONFIG.horario.abertura.replace(':', 'h')}`;
        break;
      }
    }
  } else if (minutosAtuais >= fechamento) {
    /* Já fechou hoje — encontrar próximo dia */
    for (let i = 1; i <= 7; i++) {
      const proximoDia = (diaSemana + i) % 7;
      if (CONFIG.horario.dias.includes(proximoDia)) {
        if (i === 1) {
          proximoEvento = `Abre amanhã às ${CONFIG.horario.abertura.replace(':', 'h')}`;
        } else {
          const nomeDia = CONFIG.horario.diasNomes[proximoDia];
          proximoEvento = `Abre ${nomeDia} às ${CONFIG.horario.abertura.replace(':', 'h')}`;
        }
        break;
      }
    }
  }

  return {
    aberto: false,
    mensagem: 'Fechado agora',
    proximoEvento,
  };
}

/**
 * Gera a lista de horários formatada para exibição.
 * @returns {Array<{ dia: string, horario: string, hoje: boolean }>}
 */
export function getHorariosFormatados() {
  const { diaSemana } = getHoraAtual();
  const aberturaFmt = CONFIG.horario.abertura.replace(':', 'h');
  const fechamentoFmt = CONFIG.horario.fechamento.replace(':', 'h');

  return CONFIG.horario.diasNomes.map((nome, index) => {
    const funciona = CONFIG.horario.dias.includes(index);
    return {
      dia: nome,
      horario: funciona ? `${aberturaFmt} às ${fechamentoFmt}` : 'Fechado',
      hoje: index === diaSemana,
      funciona,
    };
  });
}

/**
 * Atualiza o indicador de status no DOM.
 * Busca elementos com data-status="indicator" e data-status="text".
 */
export function atualizarIndicadorStatus() {
  const status = verificarStatus();
  const indicadores = document.querySelectorAll('[data-status="indicator"]');
  const textos = document.querySelectorAll('[data-status="text"]');
  const proximos = document.querySelectorAll('[data-status="next"]');

  indicadores.forEach((el) => {
    el.classList.toggle('status--aberto', status.aberto);
    el.classList.toggle('status--fechado', !status.aberto);
  });

  textos.forEach((el) => {
    el.textContent = status.mensagem;
  });

  proximos.forEach((el) => {
    el.textContent = status.proximoEvento;
  });
}
