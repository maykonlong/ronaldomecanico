/**
 * config.js — Configuração centralizada da empresa Ronaldo Mecânico
 * 
 * Todos os dados da empresa estão centralizados neste arquivo.
 * Altere aqui para atualizar informações em todo o site.
 */

export const CONFIG = {
  /* ── Dados da empresa ── */
  nome: 'Ronaldo Mecânico',
  nomeCompleto: 'Ronaldo Mecânico — Mecânica Automotiva',
  segmento: 'Mecânica Automotiva',
  descricao: 'Oficina de mecânica automotiva em Santana de Parnaíba, SP. Manutenção preventiva, revisão, diagnóstico, freios, suspensão, troca de óleo e mais. Atendimento direto pelo WhatsApp.',
  slogan: 'Seu carro em boas mãos.',

  /* ── Contato ── */
  whatsapp: {
    numero: '5511992527560',
    formatado: '+55 11 99252-7560',
    url: 'https://wa.me/5511992527560',
  },

  /* ── Endereço ── */
  endereco: {
    rua: 'R. do Gavião',
    numero: '320',
    bairro: 'Cidade São Pedro - Gleba A',
    cidade: 'Santana de Parnaíba',
    estado: 'SP',
    cep: '06535-165',
    get completo() {
      return `${this.rua}, ${this.numero} - ${this.bairro}, ${this.cidade} - ${this.estado}, ${this.cep}`;
    },
    get googleMapsQuery() {
      return encodeURIComponent(`${this.rua}, ${this.numero} - ${this.bairro}, ${this.cidade} - ${this.estado}, ${this.cep}`);
    },
    get googleMapsDir() {
      return `https://www.google.com/maps/dir/?api=1&destination=${this.googleMapsQuery}`;
    },
    get wazeUrl() {
      return `https://waze.com/ul?q=${this.googleMapsQuery}&navigate=yes`;
    },
    get googleMapsUrl() {
      return `https://www.google.com/maps/search/?api=1&query=${this.googleMapsQuery}`;
    },
    get googleMapsEmbed() {
      return `https://www.google.com/maps?q=${this.googleMapsQuery}&output=embed`;
    },
  },

  /* ── Horário de funcionamento ── */
  horario: {
    abertura: '09:00',
    fechamento: '17:00',
    fuso: 'America/Sao_Paulo',
    /**
     * Dias de funcionamento (0 = Domingo, 6 = Sábado)
     * Todos os dias por padrão.
     */
    dias: [0, 1, 2, 3, 4, 5, 6],
    /** Labels dos dias da semana em pt-BR */
    diasNomes: [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ],
    /** Aviso para exibir junto ao status de aberto/fechado */
    aviso: 'Horários sujeitos a confirmação com a oficina.',
  },

  /* ── SEO / Meta ── */
  seo: {
    titulo: 'Ronaldo Mecânico | Mecânica Automotiva em Santana de Parnaíba',
    descricao: 'Oficina mecânica em Santana de Parnaíba, SP. Manutenção preventiva, revisão automotiva, diagnóstico, freios, suspensão, troca de óleo. Atendimento pelo WhatsApp.',
    keywords: 'mecânico Santana de Parnaíba, oficina mecânica, mecânica automotiva, manutenção automotiva, revisão automotiva, troca de óleo, freios, suspensão, diagnóstico automotivo, mecânico Cidade São Pedro',
    /** Altere para o domínio de produção quando publicar */
    dominio: 'https://seudominio.com.br',
    idioma: 'pt-BR',
    ogImagem: 'public/images/hero.jpg',
  },

  /* ── Paleta de cores (referência para JS) ── */
  cores: {
    grafite: '#17191D',
    preto: '#0D0F12',
    vermelho: '#E53935',
    branco: '#FFFFFF',
    cinzaClaro: '#F2F3F5',
  },

  /* ── Serviços ── */
  servicos: [
    {
      id: 'manutencao-preventiva',
      nome: 'Manutenção Preventiva',
      descricao: 'Cuidados regulares para evitar problemas futuros e manter seu veículo em bom estado.',
      icone: 'shield-check',
      whatsappMsg: 'Manutenção Preventiva',
    },
    {
      id: 'revisao-automotiva',
      nome: 'Revisão Automotiva',
      descricao: 'Verificação completa dos principais sistemas do veículo para garantir segurança e desempenho.',
      icone: 'clipboard-check',
      whatsappMsg: 'Revisão Automotiva',
    },
    {
      id: 'diagnostico',
      nome: 'Diagnóstico de Problemas',
      descricao: 'Identificação de falhas mecânicas e eletrônicas com avaliação detalhada do veículo.',
      icone: 'search-engine',
      whatsappMsg: 'Diagnóstico de Problemas',
    },
    {
      id: 'freios',
      nome: 'Sistema de Freios',
      descricao: 'Inspeção, manutenção e reparo de pastilhas, discos, tambores e sistema hidráulico de freios.',
      icone: 'brake',
      whatsappMsg: 'Sistema de Freios',
    },
    {
      id: 'suspensao',
      nome: 'Suspensão e Direção',
      descricao: 'Verificação e reparo de amortecedores, molas, pivôs, terminais e componentes de direção.',
      icone: 'suspension',
      whatsappMsg: 'Suspensão e Direção',
    },
    {
      id: 'oleo-filtros',
      nome: 'Troca de Óleo e Filtros',
      descricao: 'Substituição de óleo lubrificante e filtros conforme as especificações do seu veículo.',
      icone: 'oil-drop',
      whatsappMsg: 'Troca de Óleo e Filtros',
    },
    {
      id: 'motor',
      nome: 'Motor e Componentes',
      descricao: 'Avaliação e reparo de componentes do motor, incluindo correia, bomba d\'água e arrefecimento.',
      icone: 'engine',
      whatsappMsg: 'Motor e Componentes',
    },
    {
      id: 'ruidos-falhas',
      nome: 'Avaliação de Ruídos e Falhas',
      descricao: 'Investigação de barulhos, vibrações e comportamentos anormais do veículo.',
      icone: 'waveform',
      whatsappMsg: 'Avaliação de Ruídos e Falhas',
    },
  ],

  /* ── Diferenciais ── */
  diferenciais: [
    {
      icone: 'user-check',
      titulo: 'Atendimento Direto',
      descricao: 'Você fala diretamente com o responsável pela oficina, sem intermediários.',
    },
    {
      icone: 'message-circle',
      titulo: 'Comunicação Transparente',
      descricao: 'Explicamos cada problema encontrado e orientamos sobre as melhores soluções.',
    },
    {
      icone: 'compass',
      titulo: 'Orientação Técnica',
      descricao: 'Receba orientação clara sobre os problemas identificados e os serviços necessários.',
    },
    {
      icone: 'whatsapp',
      titulo: 'Contato Facilitado',
      descricao: 'Tire dúvidas, solicite orçamentos e agende serviços rapidamente pelo WhatsApp.',
    },
    {
      icone: 'map-pin',
      titulo: 'Localização Acessível',
      descricao: 'Oficina localizada em Cidade São Pedro, Santana de Parnaíba, de fácil acesso para a região.',
    },
  ],

  /* ── FAQ (para SEO/AEO/GEO — Schema FAQPage) ── */
  faq: [
    {
      pergunta: 'Onde fica a oficina Ronaldo Mecânico?',
      resposta: 'A Ronaldo Mecânico está localizada na R. do Gavião, 320 - Cidade São Pedro - Gleba A, Santana de Parnaíba - SP, CEP 06535-165.',
    },
    {
      pergunta: 'Qual o horário de funcionamento da Ronaldo Mecânico?',
      resposta: 'O horário de funcionamento é de segunda a domingo, das 09h às 17h. Recomendamos confirmar a disponibilidade pelo WhatsApp antes de ir até a oficina.',
    },
    {
      pergunta: 'Como entro em contato com a Ronaldo Mecânico?',
      resposta: 'O principal canal de contato é o WhatsApp: +55 11 99252-7560. Você pode solicitar orçamentos, tirar dúvidas e agendar serviços diretamente por lá.',
    },
    {
      pergunta: 'Quais serviços a Ronaldo Mecânico oferece?',
      resposta: 'A oficina trabalha com manutenção preventiva, revisão automotiva, diagnóstico de problemas, sistema de freios, suspensão e direção, troca de óleo e filtros, motor e componentes, e avaliação de ruídos e falhas. Consulte a disponibilidade de cada serviço pelo WhatsApp.',
    },
    {
      pergunta: 'Preciso agendar antes de ir à oficina?',
      resposta: 'Recomendamos entrar em contato pelo WhatsApp para verificar a disponibilidade e combinar o melhor horário para atendimento.',
    },
    {
      pergunta: 'A Ronaldo Mecânico atende todos os tipos de veículo?',
      resposta: 'Para saber sobre os veículos atendidos, entre em contato pelo WhatsApp e informe o modelo do seu carro. O proprietário poderá orientar sobre a viabilidade do atendimento.',
    },
  ],

  /* ── Mensagens WhatsApp ── */
  mensagens: {
    geral: 'Olá, Ronaldo! Acessei o site da Ronaldo Mecânico e gostaria de mais informações sobre os serviços da oficina.',
    orcamento: 'Olá, Ronaldo! Gostaria de solicitar um orçamento para meu veículo. Poderia me orientar?',
    servico: (nomeServico) =>
      `Olá, Ronaldo! Gostaria de consultar a disponibilidade do serviço de ${nomeServico}.`,
  },
};
