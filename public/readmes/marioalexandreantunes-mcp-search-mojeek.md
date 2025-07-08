# MCP Search Mojeek

Um servidor MCP (Model Context Protocol) que integra o motor de busca Mojeek, oferecendo uma alternativa de pesquisa focada em privacidade e resultados imparciais.

## Descrição

Este projeto implementa um servidor MCP que utiliza o Mojeek como motor de busca. O Mojeek é conhecido por:
- Fornecer resultados de pesquisa imparciais
- Respeitar a privacidade do utilizador (sem rastreamento)
- Oferecer resultados rápidos e relevantes

## Requisitos

- Python 3.11 ou superior
- Gestor de pacotes UV (recomendado)

## Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositório]
cd mcp-search-mojeek
```

2. Instale as dependências utilizando UV:
```bash
uv venv
uv pip install -r requirements.txt
```

## Configuração

### VSCode
Adicione a seguinte configuração ao seu ficheiro de configuração do VSCode:

```json
{
  "mcpServers": {
    "mojeek-mcp": {
      "command": "[caminho-para-seu-ambiente-virtual]/.venv/bin/python3",
      "args": [
        "[caminho-para-seu-projeto]/mojeek.py"
      ]
    }
  }
}
```

### Trae
A configuração para o Trae é similar à do VSCode. Consulte o ficheiro [MCP.md](MCP.md) para mais detalhes sobre o protocolo MCP e sua implementação.

## Utilização

O servidor MCP disponibiliza a ferramenta `get_search` que aceita um termo de pesquisa e retorna os resultados do Mojeek. Os resultados são armazenados em cache para melhorar o desempenho em pesquisas repetidas.

## Funcionalidades

- Pesquisa web através do Mojeek
- Cache de resultados para pesquisas frequentes
- Integração com editores via protocolo MCP
- Tratamento de erros robusto

## Contribuição

Contribuições são bem-vindas! Por favor, sinta-se à vontade para submeter pull requests.

## Licença

[Adicionar informação sobre a licença]
