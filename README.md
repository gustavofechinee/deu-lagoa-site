# Deu Lagoa Uruaú

Protótipo institucional com fluxo de reserva e área interna de operação.

## Aviso

Este repositório representa **um protótipo navegável** criado para apresentação visual, validação de fluxo e demonstração de produto.

Ele **não deve ser tratado como sistema final de produção**. Algumas partes ainda operam em armazenamento local do navegador e existem apenas para simular a experiência completa.

## Link publicado

- Site: [gustavofechinee.github.io/deu-lagoa-site](https://gustavofechinee.github.io/deu-lagoa-site/#/hotel)

## Objetivo do protótipo

O projeto foi montado para demonstrar:

- presença institucional da pousada em uma interface mais editorial
- abertura cinematográfica com vídeo
- consulta de hospedagem com bloqueio provisório de datas
- área interna para operação de reservas, mídia e conteúdo

## O que está incluído

- página pública da pousada em `#/hotel`
- área interna em `#/vendedor`
- formulário de consulta de hospedagem
- fila interna de reservas pendentes
- edição de conteúdo institucional, imagens e destaques
- deploy via GitHub Pages

## O que ainda é protótipo

- persistência principal em `localStorage`
- autenticação interna por código único
- fluxo comercial sem backend real
- sem integração definitiva com PMS, CRM, gateway ou calendário externo

## Rotas

- público: `#/hotel`
- vendedor: `#/vendedor`

## Acesso interno

- atalho rápido: `Ctrl + Shift + V`
- código atual: `deulagoa2026`

## Executar localmente

```bash
npm install
npm run dev
```

Abra no navegador:

```text
http://localhost:5173/#/hotel
```

## Build

```bash
npm run build
```

## Publicação

O projeto está configurado para publicação em GitHub Pages.

- workflow: `.github/workflows/pages.yml`
- build estático publicado: `site/`

## Estrutura principal

- `src/app/deu-lagoa-app.js`: render, rotas e interações
- `src/data/deu-lagoa-content.js`: conteúdo institucional e seed inicial
- `src/utils/availability.js`: cálculo de disponibilidade e conflito de datas
- `src/utils/storage.js`: persistência local
- `src/styles/`: tema, layout e responsividade
- `database/postgres-schema.sql`: base inicial pensada para evolução futura

## Observação de escopo

O foco deste repositório é **apresentação e validação de experiência**.

Para transformar este protótipo em operação real, o próximo passo técnico seria:

1. trocar `localStorage` por backend real
2. substituir o código fixo por autenticação de usuários
3. integrar reservas, disponibilidade e contatos com uma base persistente
