# Desenvolvimento

React + Vite, GSAP, SVG e CSS. Requer Node.js 22.12+ e npm; validado com Node.js 24.22.1. Execute os comandos abaixo na raiz do repositório.

```sh
npm --prefix app ci
npm --prefix app run dev
```

O servidor de desenvolvimento usa a porta 5173. O checkout fica em `/workspace/fernanda-santos-arquitetura`. Use o checkout existente; não é necessário criar worktrees.

## Build e testes

```sh
npm --prefix app run build
npm --prefix app test
```

O build limpa e regenera **somente `public_html/`** e cria `artifacts/fernanda-santos-hostinger.zip`. Não edite `public_html/` manualmente: altere os arquivos em `app/` e execute o build. Inclua a versão atualizada de `public_html/` no mesmo commit das alterações de código antes de enviar para `main`.

Os testes de pacote verificam o conteúdo do ZIP, os arquivos de entrada e a configuração de publicação. Os oito testes Playwright verificam o site de produção, incluindo galeria, filtros, teclado, contatos, movimento reduzido, responsividade e auditoria automatizada WCAG A/AA. A prévia de produção inicia automaticamente na porta 4173 e usa `public_html/`.

O ambiente já possui `/usr/bin/chromium`. Em outra máquina, se necessário:

```sh
cd app
npx playwright install chromium
```

Para formatação, execute na raiz `npm --prefix app run format` ou `npm --prefix app run format:check`.

## Arquivos principais

```text
app/
├── package.json / package-lock.json
├── index.html                 # Entrada e metadados SEO
├── vite.config.js             # Build para ../public_html
├── playwright.config.js
├── public/                    # Arquivos estáticos de origem
│   ├── .htaccess
│   ├── 404.html / favicon.svg / robots.txt
│   └── images/
├── src/
│   ├── assets/portrait-mask.svg # Contorno integrado ao CSS no build
│   ├── main.jsx
│   ├── App.jsx                # Seções, contatos e interações
│   ├── styles/global.css
│   └── components/
│       ├── motion/            # BounceCards, TextLoop, TechText e CSS
│       └── visuals/           # Desenhos arquitetônicos SVG
├── scripts/package-hostinger.mjs
└── tests/
    ├── package.test.mjs
    └── site.spec.js
```

## Materiais e conteúdo

Os 17 arquivos originais estão em `references/`, renomeados com nomes descritivos. O manifesto registra o nome anterior e o SHA-256 de cada arquivo para conferir a preservação integral. Essa pasta não entra no build.

O site usa versões WebP em `app/public/images/`. A fotografia principal preserva aparência e proporções; a silhueta é composta por máscara SVG e o fade é aplicado em CSS. Os títulos da galeria são descrições editoriais; não são atribuídos clientes, áreas, datas ou resultados não fornecidos.

Fontes e imagens são locais. Não há rastreadores, cookies publicitários, formulários, banco de dados ou variáveis secretas necessárias. Links externos abrem WhatsApp, Instagram e Google Maps. A política de privacidade está no rodapé. As animações respeitam `prefers-reduced-motion` e podem ser pausadas.

Componentes BounceCards, TextLoop e TechText: código fornecido pelo usuário como React Bits (https://reactbits.dev/). Fontes Cormorant Garamond e DM Sans via Fontsource.
