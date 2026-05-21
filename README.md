# Deu Lagoa Uruaú

Site desenvolvido para a Deu Lagoa Uruaú, pensado para apresentar a pousada, organizar consultas de hospedagem e apoiar a operação interna.

O repositório reúne a experiência pública do site e uma área interna para gestão de reservas, mídia e conteúdo.

## Importante

Esta versão do repositório funciona como **demonstração navegável da proposta entregue**.

O projeto foi feito para uma empresa real, mas a implementação publicada aqui ainda não substitui um ambiente de produção com backend, autenticação completa e persistência fora do navegador.

## Site publicado

- [gustavofechinee.github.io/deu-lagoa-site](https://gustavofechinee.github.io/deu-lagoa-site/#/hotel)

## Escopo atual

- página pública da pousada em `#/hotel`
- área interna em `#/vendedor`
- abertura com vídeo
- formulário de consulta de hospedagem
- fila interna de solicitações de reserva
- edição de conteúdo, mídia e destaques

## Limites da versão publicada

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
