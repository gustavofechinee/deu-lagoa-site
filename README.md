# Deu Lagoa | Site institucional + painel vendedor

Projeto Vite com vitrine publica da pousada e painel administrativo separado para suites, reservas, midia e configuracoes.

## Rodar local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Build para GitHub Pages pela raiz do repositorio

```bash
npm run build:site
```

## Rotas

- comprador: `#/comprador`
- vendedor: `#/vendedor`

## Acesso vendedor

- atalho: `Ctrl + Shift + V`
- codigo inicial: `deulagoa2026`

## Estrutura

- `src/app/deu-lagoa-app.js`: render, rotas e interacoes
- `src/data/deu-lagoa-content.js`: seed institucional, operacao e validacao
- `src/utils/availability.js`: conflito de datas, bloqueios e metricas
- `src/utils/storage.js`: persistencia local com merge de versao
- `database/postgres-schema.sql`: schema inicial de producao
- `docs/go-live-checklist.md`: checklist de entrega comercial
- `docs/public-source-audit.md`: auditoria das informacoes publicas validadas
- `.github/workflows/pages.yml`: deploy automatico para GitHub Pages
- `vite.config.js`: base relativa para build funcionar bem em Pages
