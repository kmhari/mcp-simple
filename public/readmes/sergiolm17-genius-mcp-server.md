# genius-mcp-server

Un servidor [Model Context Protocol (MCP)](https://modelcontextprotocol.io) para interactuar con la [API de Genius](https://docs.genius.com/). Permite a las aplicaciones cliente MCP (como [Claude for Desktop](https://claude.ai/download) o [VS Code GitHub Copilot](https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode)) buscar letras, artistas y obtener detalles de canciones/artistas desde Genius.com.

## Características

Este servidor MCP expone las siguientes funcionalidades de la API de Genius:

- **Herramientas (Tools):** Permiten a los LLMs ejecutar acciones o buscar información.
  - `genius-search`: Busca canciones, artistas o páginas web por un término dado.
  - `genius-list-artist-songs`: Lista canciones de un artista específico por su ID.
- **Recursos (Resources):** Permiten a los clientes o LLMs acceder a datos específicos.
  - `genius-song`: Obtiene detalles de una canción por su ID (URI template `genius://songs/{id}`).
  - `genius-artist`: Obtiene detalles de un artista por su ID (URI template `genius://artists/{id}`).
- **Prompts (Prompts):** Plantillas reutilizables para iniciar interacciones comunes.
  - `genius-search-prompt`: Un prompt básico para iniciar una búsqueda en Genius.

## Requisitos

- **Node.js** (versión 16 o superior) instalado.
- **npm** (viene con Node.js) o **uv** instalado.
- Una **API Key de Genius** (Client Access Token) para acceder a la API.

### Obtener una API Key de Genius

1.  Visita la página de [Genius API Client management](https://genius.com/api-clients).
2.  Crea un nuevo API client si no tienes uno.
3.  Haz clic en "Generate Access Token" para obtener tu **Client Access Token**. Este token solo permite acceso de lectura a endpoints públicos, que es suficiente para las herramientas y recursos implementados en este servidor básico.
4.  **Guarda este token de forma segura.** No lo compartas públicamente.

## Instalación y Ejecución con `npx`

La forma más fácil de ejecutar este servidor es usando `npx`. `npx` descargará y ejecutará el servidor directamente desde npm sin necesidad de instalación global.

1.  Abre tu terminal o línea de comandos.
2.  Establece tu API Key de Genius como una variable de entorno. Reemplaza `TU_CLIENT_ACCESS_TOKEN_AQUI` con tu clave real.

    ```bash
    # En MacOS / Linux (bash, zsh, etc.)
    export GENIUS_CLIENT_ACCESS_TOKEN=TU_CLIENT_ACCESS_TOKEN_AQUI

    # En Windows (Command Prompt)
    set GENIUS_CLIENT_ACCESS_TOKEN=TU_CLIENT_ACCESS_TOKEN_AQUI

    # En Windows (PowerShell)
    $env:GENIUS_CLIENT_ACCESS_TOKEN="TU_CLIENT_ACCESS_TOKEN_AQUI"
    ```

3.  Ejecuta el servidor usando `npx` y tu nombre de paquete (asegúrate de que sea el nombre correcto que usaste en `package.json` al publicar):

    ```bash
    npx -y genius-mcp-server # Usando el nombre de paquete 'genius-mcp-server' como ejemplo
    ```

    El servidor se iniciará y esperará conexiones de clientes MCP a través de stdio. Verás mensajes de inicialización en tu terminal (en stderr).

    Para detener el servidor, presiona `Ctrl+C`.

## Configuración con Clientes MCP

Para usar este servidor con una aplicación cliente MCP como Claude for Desktop, necesitas configurar el cliente para que lance tu servidor usando `npx` y pase la API Key de Genius como variable de entorno.

Aquí tienes un ejemplo para **Claude for Desktop**:

1.  Abre el archivo de configuración de Claude Desktop:

    - macOS/Linux: `~/Library/Application Support/Claude/claude_desktop_config.json`
    - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
      Si no existe, créalo.

2.  Añade una entrada para tu servidor en la sección `mcpServers`. **¡Reemplaza `TU_CLIENT_ACCESS_TOKEN_AQUI` con tu clave real!**

    ```json
    {
      "mcpServers": {
        "genius-api": {
          // Nombre que aparecerá en la interfaz de Claude
          "command": "npx",
          "args": [
            "-y",
            "genius-mcp-server" // <-- El nombre de tu paquete publicado en npm
          ],
          "env": {
            "GENIUS_ACCESS_TOKEN": "TU_CLIENT_ACCESS_TOKEN_AQUI" // Pasa la clave como variable de entorno
          }
        }
      }
    }
    ```

    **Nota de seguridad:** Pasar secretos como variables de entorno en archivos de configuración puede no ser la opción más segura si otras aplicaciones tienen acceso a esos archivos o procesos. Algunos clientes MCP (como VS Code Copilot) pueden ofrecer mecanismos de gestión de secretos más seguros. Para Claude Desktop con `claude_desktop_config.json`, esta es la forma común.

3.  Guarda el archivo `claude_desktop_config.json` y **reinicia completamente Claude for Desktop**.

4.  Una vez reiniciado, busca los iconos de MCP, en la interfaz de Claude. Tu servidor "Genius API" debería aparecer, listando las herramientas y recursos disponibles. Los prompts pueden aparecer como comandos de barra diagonal (`/`).

## Cómo Usar el Servidor con un LLM (Ejemplo con Claude)

Una vez que el servidor esté conectado a tu cliente MCP (ej. Claude), el LLM podrá usar las herramientas y acceder a los recursos.

- **Buscar:** Pregunta a Claude algo como:
  - "Find songs by Taylor Swift on Genius."
  - "Search Genius for the song 'Lose Yourself'."
  - "Look up the artist Kendrick Lamar on Genius."
    Claude debería reconocer la intención de búsqueda y pedirte aprobación para usar la herramienta `genius-search`.
- **Obtener detalles de Canción/Artista:** Para usar los recursos `genius-song` o `genius-artist`, el LLM o el cliente necesitarán saber el ID numérico (obtenido previamente con una búsqueda, por ejemplo). La forma en que un LLM solicita leer un recurso depende de la implementación del cliente. Podrías necesitar una herramienta adicional que tome un ID y genere un prompt para el LLM incluyendo el contenido del recurso, o un cliente que tenga una UI para explorar recursos.
- **Usar el Prompt de Búsqueda:** Si tu cliente soporta prompts como comandos de barra diagonal, puedes intentar escribir `/genius-search-prompt` para generar el prompt predefinido.

## Desarrollo Local

Si quieres modificar o contribuir al servidor:

1.  Clona el repositorio.
2.  Instala dependencias: `npm install`
3.  Crea un archivo `.env` en la raíz con tu Client Access Token: `GENIUS_ACCESS_TOKEN=TU_CLAVE`.
4.  Compila el código TypeScript: `npm run build`
5.  Ejecuta localmente (con la variable de entorno configurada en tu terminal): `npm start` o `npm run dev` (para compilar y ejecutar).

## Contribución

¡Las contribuciones son bienvenidas! Siéntete libre de abrir issues o pull requests en el repositorio para mejorar este servidor (añadir más endpoints, manejar User Access Tokens/OAuth, etc.).

## Licencia

Este proyecto está licenciado bajo la licencia ISC.
