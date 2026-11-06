# Fernanda Santos — Arquitetura & Interiores

**A pasta [`public_html/`](public_html/) contém o site completo, já compilado e pronto para a Hostinger.** Envie somente o conteúdo dessa pasta para `public_html` no seu domínio, incluindo o arquivo oculto `.htaccess`. Não é necessário instalar Node.js na hospedagem.

## Organização

| Pasta | Conteúdo | Enviar para a Hostinger? |
| --- | --- | --- |
| [`public_html/`](public_html/) | Site de produção: HTML, CSS, JavaScript, imagens e fontes | **Sim, o conteúdo inteiro** |
| [`app/`](app/) | Código React, configurações, dependências e testes | Não |
| [`docs/`](docs/) | Instruções de publicação e desenvolvimento | Não |
| [`references/`](references/) | Fotografias, logos e projetos originais, com nomes descritivos | Não |

[Como publicar na Hostinger](docs/HOSTINGER.md) · [Como desenvolver e atualizar](docs/DESENVOLVIMENTO.md)

## Atualizar o site

Na raiz do repositório:

```sh
npm --prefix app ci
npm --prefix app run build
npm --prefix app test
```

O build atualiza `public_html/` e gera `artifacts/fernanda-santos-hostinger.zip` para upload. `public_html/` é versionada na `main`; o ZIP, dependências e resultados de testes são gerados localmente e ficam fora do Git.

Para desenvolver: `npm --prefix app run dev`. Requer Node.js 22.12+; a versão recomendada está em `.nvmrc`.

O site usa fontes e imagens locais, navegação por âncoras, galeria de projetos e contatos via WhatsApp, Instagram e Google Maps. Não precisa de backend, banco de dados ou credenciais no código.
