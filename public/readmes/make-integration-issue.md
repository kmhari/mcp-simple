# Problem integracji Make z Claude poprzez MCP

## Opis problemu

Próbowałem stworzyć integrację między platformą automatyzacji Make (dawniej Integromat) a Claude Desktop za pomocą protokołu MCP (Model Context Protocol). Mimo wielu podejść i modyfikacji, nie udało się ustanowić poprawnego połączenia.

## Co zostało zrobione

1. Stworzenie od podstaw serwera MCP dla Make w Node.js, implementującego:
   - Komunikację z API Make
   - Protokół WebSocket dla komunikacji z Claude Desktop
   - Obsługę JSON-RPC 2.0 zgodną z formatem używanym przez MCP
   - Różne narzędzia do zarządzania scenariuszami Make

2. Wypróbowanie różnych konfiguracji:
   - Różne porty (3000, 3001, 3333, 5555)
   - Różne podejścia do komunikacji (REST API, WebSocket)
   - Różne opcje konfiguracji w `claude_desktop_config.json`
   - Zarówno automatyczne jak i ręczne uruchamianie serwera

## Napotkane problemy

1. **Problem z portem** - Claude Desktop próbował uruchomić własną instancję serwera, co powodowało konflikty na tym samym porcie:
   ```
   Error: listen EADDRINUSE: address already in use :::3001
   ```

2. **Problem z protokołem** - Mimo implementacji JSON-RPC 2.0 po stronie serwera, Claude pokazywał komunikat:
   ```
   Server disconnected. For troubleshooting guidance, please visit our debugging documentation
   ```
   i
   ```
   Could not attach to MCP server make
   ```

3. **Niekompatybilność protokołu** - Logi pokazywały, że Claude oczekuje określonego formatu komunikacji, który trudno odtworzyć bez dokładnej specyfikacji:
   ```
   Message from client: {"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"claude-ai","version":"0.1.0"}},"jsonrpc":"2.0","id":0}
   ```

## Zrzuty ekranu

### Błąd połączenia w Claude Desktop

![Błąd połączenia w Claude Desktop](https://raw.githubusercontent.com/3rzy/make-mcp-integration-issue/main/screenshots/screenshot1.png)

### Błędy w logach serwera

![Błędy w logach serwera](https://raw.githubusercontent.com/3rzy/make-mcp-integration-issue/main/screenshots/screenshot2.png) 

### Edycja konfiguracji env

![Edycja konfiguracji env](https://raw.githubusercontent.com/3rzy/make-mcp-integration-issue/main/screenshots/screenshot3.png)

## Kod serwera

Główna implementacja serwera MCP dla Make:

```javascript
const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const axios = require('axios');
const dotenv = require('dotenv');

// Załaduj zmienne środowiskowe
dotenv.config();

const PORT = process.env.PORT || 5555;
const MAKE_API_TOKEN = process.env.MAKE_API_TOKEN;

// Utworzenie serwera Express
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Obsługa połączeń WebSocket
wss.on('connection', (ws) => {
  console.log('Nowe połączenie WebSocket nawiązane');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Otrzymano wiadomość:', data);
      
      // Obsługa żądania inicjalizacji
      if (data.method === 'initialize') {
        console.log('Obsługa żądania initialize');
        ws.send(JSON.stringify({
          jsonrpc: "2.0",
          id: data.id,
          result: {
            serverInfo: {
              name: "simple-make-mcp-server",
              version: "1.0.0"
            },
            capabilities: {}
          }
        }));
      }
      // Obsługa listy narzędzi
      else if (data.method === 'tools/list') {
        console.log('Obsługa żądania tools/list');
        ws.send(JSON.stringify({
          jsonrpc: "2.0",
          id: data.id,
          result: {
            tools: [
              {
                name: "list_scenarios",
                description: "Pobiera listę wszystkich scenariuszy w Make"
              },
              {
                name: "run_scenario",
                description: "Uruchamia scenariusz w Make"
              }
            ]
          }
        }));
      }
      // Obsługa błędu nieobsługiwanej metody
      else {
        console.log(`Nieobsługiwana metoda: ${data.method}`);
        ws.send(JSON.stringify({
          jsonrpc: "2.0",
          id: data.id,
          error: {
            code: -32601,
            message: `Metoda '${data.method}' nie jest obsługiwana`
          }
        }));
      }
    } catch (error) {
      console.error('Błąd przetwarzania wiadomości:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('Połączenie WebSocket zamknięte');
  });
});

// Podstawowy endpoint HTTP
app.get('/', (req, res) => {
  res.send('Simple Make MCP Server is running');
});

// Uruchomienie serwera
server.listen(PORT, () => {
  console.log(`Serwer Make MCP nasłuchuje na porcie ${PORT}`);
});
```

## Konfiguracja Claude Desktop

Próbowałem różnych konfiguracji w pliku `claude_desktop_config.json`, w tym:

```json
"make": {
  "command": "node",
  "args": ["/Users/krzyk/google-workspace-mcp/make-mcp-server/make-mcp-server.js"],
  "env": {
    "MAKE_API_TOKEN": "[token]",
    "PORT": "3001"
  },
  "url": "ws://localhost:3001",
  "disabled": true
}
```

I prostszą wersję:

```json
"make": {
  "disabled": true,
  "url": "ws://localhost:5555"
}
```

## Pytania i prośby o pomoc

1. Czy istnieje dokładna dokumentacja protokołu MCP, która mogłaby pomóc w zrozumieniu oczekiwanego formatu komunikacji?

2. Czy ktokolwiek ma doświadczenie w tworzeniu niestandardowych serwerów MCP, które działają z Claude Desktop?

3. Czy są jakieś szczególne wymagania dotyczące protokołu WebSocket lub JSON-RPC 2.0, które nie są oczywiste?

4. Czy są jakieś oficjalne narzędzia lub biblioteki, które mogłyby ułatwić tworzenie zgodnych serwerów MCP?

Wszelkie wskazówki będą bardzo pomocne. Przełączyłem się tymczasowo na próbę użycia n8n, które ma już gotowe implementacje serwera MCP, ale nadal jestem zainteresowany rozwiązaniem tego problemu dla Make.
