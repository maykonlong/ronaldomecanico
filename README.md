# Ronaldo Mecânico — Site Oficial & PWA

Site institucional moderno, ultra-rápido, responsivo, otimizado para **SEO, GEO e AEO**, e totalmente instalável como **PWA (Progressive Web App)** para a empresa **Ronaldo Mecânico — Mecânica Automotiva**.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**: Hierarquia rigorosa (`<h1>` único, `aria-labels`, `role`, `Speakable`).
- **CSS3 Vanilla**: Design System com CSS Variables, Glassmorphism, animações fluidas, Dark Mode automotivo premium e WCAG AA (contraste 4.5:1).
- **JavaScript ES Modules**: Arquitetura modular sem frameworks pesados.
- **PWA (Progressive Web App)**: Web App Manifest (`manifest.webmanifest`), Service Worker com estratégia *Stale-While-Revalidate* e suporte Offline.
- **SEO / GEO / AEO**: Schema.org completo (`AutoRepair`, `FAQPage`, `BreadcrumbList`, `WebSite`, `SpeakableSpecification`), meta tags Open Graph e Twitter Cards, tags GEO para Santana de Parnaíba.

---

## 📂 Estrutura de Arquivos

```
ronaldo_mecanico/
├── index.html                 # Página principal completa (SEO, GEO, AEO, Schema.org)
├── manifest.webmanifest       # Configuração do PWA para instalação no celular/desktop
├── sw.js                      # Service Worker para cache e funcionamento offline
├── sitemap.xml                # Sitemap XML com suporte a geo e imagens
├── robots.txt                 # Instruções para motores de busca
├── iniciar.bat                # Script para rodar servidor local no Windows com 1 clique
├── README.md                  # Documentação do projeto
├── public/
│   ├── icons/
│   │   ├── favicon.svg        # Ícone SVG da marca
│   │   ├── icon-192.png       # Ícone PWA 192x192
│   │   └── icon-512.png       # Ícone PWA 512x512
│   └── images/
│       ├── hero.jpg           # Imagem da seção principal
│       └── oficina.jpg        # Imagem sobre a oficina
└── src/
    ├── css/
    │   └── styles.css         # Estilos globais e componentes da interface
    └── js/
        ├── config.js          # Configuração centralizada (Dados, Horários, Mensagens)
        ├── main.js            # Orquestrador principal da aplicação
        ├── opening-hours.js   # Cálculo do status "Aberto agora / Fechado agora"
        ├── pwa.js             # Registro do Service Worker e aviso offline
        └── whatsapp.js        # Gerador de links contextualizados para o WhatsApp
```

---

## ⚡ Como Executar Localmente

### Método 1: No Windows (Mais simples)
Dê um duplo clique no arquivo `iniciar.bat`. Ele iniciará automaticamente um servidor local na porta `8080` e abrirá o site no seu navegador.

### Método 2: Com Node.js / npx
No terminal, na pasta raiz do projeto:
```bash
npx http-server . -p 8080 -c-1
```
Acesse `http://localhost:8080` no navegador.

---

## ⚙️ Como Personalizar Informações (Telefone, Horários, Endereço)

Todas as informações da oficina estão centralizadas em [src/js/config.js](file:///c:/Users/MaykonSilva/OneDrive%20-%20C&M%20SOFTWARE%20LICENCIAMENTO%20DE%20SISTEMAS%20LTDA/%C3%81rea%20de%20Trabalho/Arquivos%20Gerais/Automa%C3%A7%C3%B5es/ronaldo_mecanico/src/js/config.js).

Para alterar o WhatsApp, o endereço ou horários:
1. Abra o arquivo `src/js/config.js`.
2. Edite os valores desejados no objeto `CONFIG`.
3. Para publicar em produção, atualize também a propriedade `seo.dominio` com o seu domínio final (ex: `https://ronaldomecanico.com.br`) para atualizar as referências do `sitemap.xml` e do `index.html`.

---

## 🚀 Como Hospedar Gratuitamente

Este projeto é 100% estático e pode ser hospedado sem custo em:
- **GitHub Pages**
- **Cloudflare Pages**
- **Vercel**
- **Netlify**

Basta subir a pasta do projeto para o seu repositório ou provedor!
