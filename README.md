# Deu Lagoa Uruaú

Projeto conceitual para apresentação da experiência digital da Deu Lagoa Uruaú.

O repositório reúne uma vitrine institucional, um fluxo de consulta de hospedagem e uma área interna para operação de reservas e conteúdo.

## Importante

Este material é **um protótipo**.

Ele foi montado para apresentação, validação visual e demonstração de fluxo. A estrutura atual não substitui um ambiente de produção com backend, autenticação real e persistência fora do navegador.

## Site publicado

- [gustavofechinee.github.io/deu-lagoa-site](https://gustavofechinee.github.io/deu-lagoa-site/#/hotel)

## Escopo atual

- página pública da pousada em `#/hotel`
- área interna em `#/vendedor`
- abertura com vídeo
- formulário de consulta de hospedagem
- fila interna de solicitações
- edição de conteúdo, mídia e destaques

## Limites do protótipo

- persistência principal em `localStorage`
- autenticação interna por código único
- sem integração definitiva com calendário, CRM ou PMS
- sem backend transacional para reservas

## Acesso interno

- atalho: `Ctrl + Shift + V`
- código atual: `deulagoa2026`

## Rodar localmente

```bash
npm install
npm run dev
```

Abra:

```text
http://localhost:5173/#/hotel
```

## Build

```bash
npm run build
```

## Estrutura principal

- `src/app/deu-lagoa-app.js`: renderização, rotas e interações
- `src/data/deu-lagoa-content.js`: conteúdo base da apresentação
- `src/utils/availability.js`: disponibilidade e conflito de datas
- `src/utils/storage.js`: persistência local
- `src/styles/`: layout, tema e responsividade
- `.github/workflows/pages.yml`: publicação no GitHub Pages

## Evolução esperada

Para levar este projeto para produção, os próximos passos seriam:

1. substituir `localStorage` por backend real
2. trocar o código fixo por autenticação de usuários
3. integrar reservas e disponibilidade a uma base persistente
