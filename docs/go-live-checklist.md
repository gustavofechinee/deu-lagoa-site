# Deu Lagoa | Go-Live Checklist

## O que ja existe no projeto

- vitrine publica da pousada
- painel vendedor separado
- pre-reserva com bloqueio local de datas
- midia local e curadoria visual
- conteudo administrativo editavel
- esquema SQL inicial em `database/postgres-schema.sql`

## O que precisa existir antes de vender para uma empresa

1. Backend real
- API autenticada para suites, reservas, midia e configuracoes
- persistencia em PostgreSQL ou Supabase Postgres
- ambiente de homologacao e producao separados

2. Autenticacao
- login real por usuario e senha
- recuperacao de senha
- controle de permissao por perfil
- expiracao de sessao

3. Reservas
- criacao de reserva em transacao
- bloqueio de conflito por suite e intervalo
- status `pending`, `confirmed`, `cancelled`, `completed`
- historico de alteracoes e usuario responsavel

4. Financeiro e operacao
- politica de sinal/pagamento
- politica de cancelamento
- notificacao por e-mail e WhatsApp
- exportacao de reservas

5. Conteudo e midia
- upload real de imagem/video
- compressao e fallback de assets
- validacao de links externos
- controle de publicacao

6. Compliance e confiabilidade
- LGPD e politica de privacidade
- logs de auditoria
- backup automatico
- monitoramento de erros

7. SEO e comercial
- title, description e Open Graph
- dominio proprio
- pixel/analytics
- formulario rastreado por origem

## Observacao importante

Nesta versao, a interface ja demonstra o fluxo e a operacao. A persistencia continua em `localStorage`, portanto serve como demo funcional. Para entrega comercial real, o projeto deve ser ligado ao schema SQL e a uma API autenticada.
