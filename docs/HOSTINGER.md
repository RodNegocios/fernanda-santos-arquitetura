# Publicar na Hostinger

O site é estático e funciona na hospedagem comum de sites da Hostinger, com Apache/LiteSpeed. A versão pronta está em `public_html/` na branch `main`.

## Usando os arquivos do GitHub

1. Na branch `main`, use **Code → Download ZIP** e extraia o repositório no computador.
2. Localize a pasta **`public_html`** dentro do repositório extraído.
3. No hPanel, abra **Sites → Gerenciar → Gerenciador de arquivos** do domínio desejado.
4. Faça backup do site existente, se houver.
5. Envie **o conteúdo** de `public_html` para a pasta `public_html` da Hostinger, incluindo `.htaccess`. Não crie `public_html/public_html`.
6. Se houver uma página padrão anterior (`index.php`, `default.php` ou similar), remova somente essa página após o backup para evitar conflito com `index.html`.
7. Confira o SSL do domínio no hPanel e acesse o endereço por HTTPS.

A estrutura no servidor deve ser:

```text
public_html/
├── .htaccess
├── index.html
├── 404.html
├── favicon.svg
├── robots.txt
├── assets/          # CSS, JavaScript e fontes
└── images/          # WebP e máscara SVG
```

Não envie a pasta completa do repositório, `app/`, `references/`, `docs/`, `node_modules/` ou arquivos `.env` para a área pública.

## Usando o ZIP de publicação

Se estiver no ambiente de desenvolvimento, execute na raiz:

```sh
npm --prefix app ci
npm --prefix app run build
```

O arquivo `artifacts/fernanda-santos-hostinger.zip` já contém os arquivos na estrutura correta. Envie e extraia o ZIP **dentro** de `public_html` na Hostinger; depois remova o ZIP do servidor. O pacote é gerado localmente e não é duplicado no Git.

## Atualizações e conferência

- Envie os arquivos da nova versão de `public_html/` juntos, incluindo `index.html`, `assets/` e `images/`.
- Após o upload, confira a página inicial, filtros, galeria, menu móvel, WhatsApp, Instagram e link do mapa.
- Confira a página 404 acessando um caminho inexistente. A configuração `.htaccess` foi preparada para Apache/LiteSpeed e para o site na raiz do domínio.
- As seções usam âncoras, como `#projetos` e `#contato`; não é necessário configurar rotas de aplicação.

A publicação no GitHub disponibiliza os arquivos. O envio à Hostinger e a ativação do domínio são etapas separadas; não foram executados por este projeto.
