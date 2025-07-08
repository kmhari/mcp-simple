# MCP Server Cybersecurity News

Implementazione di un server MCP integrabile con Claude Desktop che consente di accedere alle ultime notizie sulla cybersecurity da vari siti web. Il server espone uno strumento (`get_news`) che può essere utilizzato per recuperare contenuti da fonti di notizie specificate. Puoi consultare l'articolo relativo al seguente [link](https://www.forgeai.it/server-mcp-python-tutorial/).

## Caratteristiche

- Recupero delle ultime notizie da siti web supportati
- Integrazione semplice con Claude Desktop tramite MCP
- Architettura estendibile per aggiungere nuove fonti di notizie

## Requisiti

- Python 3.9+
- [uv](https://github.com/astral-sh/uv) package manager (consigliato)
- Claude Desktop (per testare l'integrazione)

## Installazione

### 1. Installare uv

Per MacOS e Linux:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Per Windows:
```bash
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 2. Clonare il repository

```bash
git clone https://github.com/forgeai-it/MCP-Server-Cybersecurity-News.git
cd MCP-Server-Cybersecurity-News
```

### 3. Creare un ambiente virtuale e installare le dipendenze

```bash
# Creazione ambiente virtuale
uv venv

# Attivazione per macOS/Linux
source .venv/bin/activate

# Attivazione per Windows
.venv\Scripts\activate

# Installazione librerie
uv add "mcp[cli]" httpx bs4
```

### Integrazione con Claude Desktop

1. Apri Claude Desktop
2. Vai su File > Settings e seleziona le impostazioni sviluppatore.
3. Clicca su "Edit Config"
4. Modifica il file `claude_desktop_config.json` aggiungendo:

```json
{
    "mcpServers": {
        "mcp-server-cybersecurity-news": {
            "command": "/percorso/al/tuo/uv",
            "args": [
                "--directory",
                "/percorso/completo/al/tuo/progetto/MCP-Server-Cybersecurity-News",
                "run",
                "main.py"
            ]
        }
    }
}
```

Sostituisci `/percorso/al/tuo/uv` con il percorso al tuo eseguibile uv (puoi trovarlo con `which uv` su macOS/Linux o `powershell Get-Command uv` su Windows) e `/percorso/completo/al/tuo/progetto/mcp-server-news` con il percorso completo della directory del progetto.

## Come Funziona

Il server MCP espone uno strumento (`get_news`) che, quando invocato, esegue le seguenti operazioni:

1. Verifica che la fonte richiesta sia supportata
2. Recupera il contenuto HTML dalla fonte specificata
3. Estrae il titolo, il link e la descrizione delle ultime 5 notizie utilizzando Beautiful Soup
4. Restituisce il testo estratto al modello AI

## Contribuire

Contributi sono benvenuti! Senti libero di aprire issues o pull requests per migliorare questo progetto.

Alcune idee per contribuire:
- Aggiungere supporto per altre fonti di notizie
- Migliorare la qualità del contenuto estratto
- Implementare funzionalità di caching per ridurre le richieste ripetute
- Aggiungere filtri per categorie di notizie

## Licenza

Questo progetto è rilasciato sotto licenza MIT. Consulta il file [LICENSE](LICENSE) per maggiori dettagli.