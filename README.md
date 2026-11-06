# Fernanda Santos — Arquitetura & Interiores

Site institucional em português, desenvolvido em React + Vite. Produção totalmente estática, compatível com os planos de hospedagem de sites da Hostinger (Apache/LiteSpeed). Não precisa de servidor Node.js em produção, banco de dados, variáveis de ambiente ou chaves de API.

## Desenvolvimento

Requisitos: Node.js 22.12+ e npm. Validado com Node.js 24.22.1.

```sh
npm ci
npm run dev
```

O servidor utiliza a porta 5173. O checkout existente fica em `/workspace/fernanda-santos-arquitetura`, na branch `main`.

## Build e publicação na Hostinger

```sh
npm run build
```

O comando gera:

- `dist/`: site completo de produção, com imagens, fontes locais, página 404 e `.htaccess`.
- `release/fernanda-santos-hostinger.zip`: pacote com os arquivos diretamente na raiz, pronto para extrair em `public_html`.

No hPanel da Hostinger:

1. Acesse **Sites → Gerenciar → Gerenciador de arquivos** do domínio de destino.
2. Faça backup de qualquer site existente em `public_html`.
3. Envie `release/fernanda-santos-hostinger.zip` e extraia **dentro de `public_html`**. `index.html`, `.htaccess`, `assets/` e `images/` devem ficar diretamente nessa pasta, sem uma pasta `dist` intermediária. Remova apenas a página padrão da hospedagem se ela disputar a página inicial.
4. Remova o ZIP do diretório público depois da extração. Confira o SSL do domínio no hPanel e acesse o site por HTTPS.

Nenhum ajuste de código é necessário. O domínio e o painel da Hostinger não foram fornecidos; a publicação externa não foi executada. Não envie `node_modules/`, `src/` ou `materials/` para a hospedagem.

As seções usam âncoras (`#projetos`, `#sobre`, `#servicos`, `#contato`), sem rotas de servidor. A configuração entregue serve o site na raiz do domínio. A página 404 é atendida pelo Apache/LiteSpeed. Build e funcionalidades foram testados localmente; a configuração do servidor Hostinger deve ser conferida após o upload.

## Validação

```sh
npm run build
npm test
```

Os testes Playwright iniciam automaticamente a prévia de produção na porta 4173. Usam `/usr/bin/chromium` quando disponível. Em outra máquina, instale o navegador uma vez:

```sh
npx playwright install chromium
```

A suíte verifica carregamento de imagens, ausência de erros de JavaScript e respostas HTTP com erro, filtros, galeria, navegação por teclado, menu móvel, larguras de 360/390/768/1440 px, movimento automático, pausa, `prefers-reduced-motion`, cartões interativos, privacidade, destinos dos contatos e auditoria automatizada WCAG A/AA com axe. Auditoria automática não substitui avaliação humana completa.

## Estrutura

- `src/App.jsx`: conteúdo, navegação, filtros, contatos e diálogos acessíveis.
- `src/components/Architecture.jsx`: desenhos arquitetônicos originais em SVG.
- `src/components/{BounceCards,TextLoop,TechText}.*`: componentes fornecidos na solicitação, integrados e adaptados à identidade visual.
- `src/styles.css`: composição visual, animações e responsividade.
- `public/images/`: imagens WebP de produção e máscara SVG da fotografia.
- `materials/originals/`: os 17 arquivos originais, preservados integralmente.
- `scripts/package.mjs`: empacotamento ZIP em JavaScript.
- `tests/`: testes de navegador da versão de produção.

## Conteúdo e acessibilidade

A fotografia principal mantém o rosto, a aparência e as proporções originais. Uma máscara SVG separa visualmente a silhueta do fundo; o fade e as camadas são aplicados por CSS. Os originais permanecem intactos. Imagens de projetos são apresentadas como imagens de apresentação, sem afirmar execução ou inventar clientes, áreas, datas, números ou depoimentos. Os títulos da galeria são descrições editoriais dos ambientes.

WhatsApp: **(92) 99219-2321**. Instagram: **@arq_fernandas**. Endereço: **Av. Lions Internacional, 1366, Sapezal – MT, CEP 78366-018**.

Fontes e imagens são locais. O site não utiliza rastreadores, cookies publicitários nem formulários. Os botões de contato abrem WhatsApp, Instagram ou Google Maps. Há política de privacidade acessível no rodapé. Animações podem ser pausadas e respeitam a preferência de movimento reduzido do sistema.

## Créditos técnicos

Componentes BounceCards, TextLoop e TechText: referências e código fornecidos pelo usuário como React Bits (https://reactbits.dev/). Animações complementares em GSAP, SVG e CSS. Fontes Cormorant Garamond e DM Sans distribuídas pelos respectivos pacotes Fontsource.
