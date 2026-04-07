# Runbook Operacional

## Rollback na Vercel

Projeto: `admadureira-atibaia`  
Painel de deployments: `https://vercel.com/amaro-juniors-projects/admadureira-atibaia/deployments`

Quando usar:
- erro em produção após merge na `main`
- regressão funcional confirmada
- metadata, sitemap, robots ou rotas críticas servindo incorretamente

Passos:
1. Abrir o painel de deployments do projeto na Vercel.
2. Localizar o último deployment estável anterior ao incidente.
3. Abrir esse deployment e promover novamente para produção.
4. Confirmar que o domínio oficial voltou a servir a versão correta.

## Verificação Pós-Rollback

Confirmar no domínio oficial:
- `https://www.admadureiraatibaia.com.br/healthz` retorna `200` e `status: "ok"`
- `https://www.admadureiraatibaia.com.br/` carrega normalmente
- `https://www.admadureiraatibaia.com.br/sitemap.xml` responde no host oficial

## Convenção de Tags

Formato:
- `v<major>.<minor>.<patch>`

Regra:
- criar uma tag ao final de cada sprint fechada ou release relevante de produção
- usar tag anotada

Baseline atual:
- `v1.0.0` = baseline pós-estabilização DevOps das Fases 1 a 4

Comandos:

```bash
git checkout main
git pull --ff-only
git tag -a vX.Y.Z -m "release vX.Y.Z"
git push origin vX.Y.Z
```

## Checklist Pós-Release

Antes de taguear:
1. `CI` verde no PR
2. `Vercel` preview verde
3. merge na `main`
4. `Vercel` produção verde
5. validar `/healthz`, `/` e `/sitemap.xml` no domínio oficial
6. criar e publicar a tag da release
