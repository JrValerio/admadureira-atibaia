"""
Confere o isolamento de um subagente pelo registro real de ferramentas.

O Claude Code grava a conversa de cada subagente em
~/.claude/projects/<projeto>/<sessão>/subagents/agent-<id>.jsonl. Este script
lista todas as chamadas de ferramenta desse registro e diz se cada acesso a
arquivo ficou dentro da pasta isolada. A lista que o subagente declara na
resposta não é prova; o registro é.

Uso: python scripts/gate/auditar_subagente.py <agent-id> <pasta isolada>
Sai com código 1 se houver acesso fora da pasta ou ferramenta de rede/shell.
"""

import json
import sys
from pathlib import Path

SEM_ARQUIVO = {"SubagentHandback", "TodoWrite"}
PROIBIDAS = {"Bash", "PowerShell", "WebFetch", "WebSearch", "Agent", "Write", "Edit", "NotebookEdit"}


def registro(agente):
    achados = list((Path.home() / ".claude" / "projects").glob(f"*/*/subagents/agent-{agente}.jsonl"))
    if len(achados) != 1:
        raise SystemExit(f"registro do subagente {agente}: {len(achados)} arquivo(s) encontrado(s)")
    return achados[0]


def auditar(agente, pasta):
    pasta = str(Path(pasta).resolve()).lower().replace("/", "\\")
    chamadas, fora = [], []
    for linha in registro(agente).open(encoding="utf-8"):
        mensagem = json.loads(linha).get("message") or {}
        if mensagem.get("role") != "assistant":
            continue
        for bloco in mensagem.get("content") or []:
            if isinstance(bloco, dict) and bloco.get("type") == "tool_use":
                nome, entrada = bloco["name"], bloco["input"]
                if nome in SEM_ARQUIVO:
                    continue
                alvo = str(entrada.get("file_path") or entrada.get("path") or entrada.get("command") or "")
                dentro = nome not in PROIBIDAS and alvo.lower().replace("/", "\\").startswith(pasta)
                chamadas.append((nome, alvo or json.dumps(entrada, ensure_ascii=False)[:120], dentro))
                if not dentro:
                    fora.append((nome, alvo))
    return chamadas, fora


if __name__ == "__main__":
    chamadas, fora = auditar(sys.argv[1], sys.argv[2])
    for nome, alvo, dentro in chamadas:
        print(f"  {'OK  ' if dentro else 'FORA'} {nome:6} {alvo if not dentro else alvo[-80:]}")
    print(f"{len(chamadas)} acesso(s); fora da pasta ou ferramenta proibida: {len(fora)}")
    sys.exit(1 if fora else 0)
