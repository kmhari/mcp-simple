# MCP Lab

Este repositorio es un laboratorio personal donde he estado trasteando con el SDK de [**Model Context Protocol**](https://modelcontextprotocol.io/introduction) ([@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)) usando TypeScript. La idea principal es entender bien cómo funciona el protocolo, hacer pruebas rápidas y montar casos de uso más reales según me iba sintiendo cómodo con la herramienta.

## Estructura del proyecto

```text
.
├── 📂 mcp-server-dummies/   # Primeros pasos usando el SDK de MCP.
├── 📂 mcp-lab-text2sql/     # Caso de uso avanzado: Text-to-SQL sobre una base de datos SQLite.
├── 📂 mcp-client/           # Integración con OpenAI API para su integración con un Server MCP.
```

## 🧪 mcp-server-dummies

Este proyecto contiene una implementación básica para familiarizarse con el SDK de MCP. Fue pensado como un primer acercamiento al protocolo, útil para pruebas simples y entender su funcionamiento (nada sofisticado).

### Instalación

> [!NOTE] 
> El proyecto requiere una versión de Node.js >= v20.

```bash
cd mcp-server-dummies
npm i
```

### Ejecución

```bash
npm run build     # Compila el proyecto con tsc
npm run dev       # Ejecuta el servidor con ts-node
```

Como herramienta de depuración, podemos utilizar el siguiente comando, que lanza el [**MCP Inspector**](https://github.com/modelcontextprotocol/inspector). Esta utilidad proporciona una interfaz visual para probar y depurar nuestro servidor MCP de forma más cómoda e interactiva.

```bash
npm run test
```

El comando nos expone el inspector en [http://localhost:6274](http://localhost:6274) asociado a nuestro servidor MCP.

## 💬 mcp-lab-text2sql

Este segundo proyecto implementa un sistema de Text-to-SQL: se puede chatear con una base de datos SQLite utilizando lenguaje natural. Este servidor MCP expone las herramientas y recursos necesarios para que nuestro LLM sea capaz de chatear con nuestros datos.

### Instalación

> [!NOTE] 
> El proyecto requiere una versión de Node.js >= v20.

```bash
cd mcp-server-dummies
npm i
```

### Ejecución

```bash
npm run build     # Compila el proyecto con tsc
npm run dev       # Ejecuta el servidor con ts-node
```

Como herramienta de depuración, podemos utilizar el siguiente comando, que lanza el [**MCP Inspector**](https://github.com/modelcontextprotocol/inspector). Esta utilidad proporciona una interfaz visual para probar y depurar nuestro servidor MCP de forma más cómoda e interactiva.

```bash
npm run test
```

El comando nos expone el inspector en [http://localhost:6274](http://localhost:6274) asociado a nuestro servidor MCP.

## Claude Desktop

Podemos probar nuestros servidores MCP desde [**Claude Desktop**](https://claude.ai/download). Para asociar nuestros servidores MCP debemos modificar el archivo `claude_desktop_config.json` de la siguiente manera:

```json
{
    "mcpServers": {
        "mcp-lab-dummies": {
            "command": "node",
            "args": [
                "C://PATH//mcp-lab//mcp-server-dummies//dist//index.js"
            ]
        },
        "mcp-lab-text2sql": {
            "command": "node",
            "args": [
                "C://PATH//mcp-lab//mcp-server-text2sql//dist//index.js"
            ]
        }
    }
}
```

> [!IMPORTANT] 
> Recuerda ejecutar `npm run build` dentro de cada proyecto previamente.

¿Dónde se encuentra `claude_desktop_config.json` en Windows? ➡️ `PATH//AppData//Roaming//Claude`.

Para conocer más sobre la sintaxis y ubicación de este archivo de configuración usa la [documentación oficial](https://modelcontextprotocol.io/quickstart/user).

## Compatibilidad con OpenAI

Usar servidores MCP con OpenAI funciona bien cuando se trata de Tools. Pero si lo que queremos es consumir Recursos, todo se vuelve más complejo.

> [!NOTE]
> Ojo: se pueden usar servidores MCP de forma nativa con el SDK de agentes de OpenAI, aunque por ahora ese SDK solo está disponible en Python. En mi caso, las pruebas las estoy haciendo con el SDK de OpenAI para TypeScript, usando la Responses API.

Vale... tengo mi servidor MCP que expone varias Tools usables desde Claude Desktop. Hasta ahí todo perfecto. Pero ahora me pregunto: ¿puedo usar ese mismo servidor MCP en un agente que funciona con la API de OpenAI?

En primera instancia usar modelos GPT y conectarlos a nuestro MCP Server no es compatible. La definción de Tool de **@modelcontextprotocol** y **OpenAI** son diferentes. ¿Quiere decir que no lo puedo utilizar? No exactamente. Vamos a construir un MCP Client que habilite esta integración.

> [!IMPORTANT]
> Esta especificación es compatible con la versión `4.95.0` del **SDK de OpenAI para TypeScript** y la versión `1.9.0` de **@modelcontextprotocol/sdk**.

Tipo devuelto por la función **getTools()** de nuestro Cliente MCP:

```ts
import type { Tool } from "@modelcontextprotocol/sdk/types.js";

const mcpTool: Tool = {
  name: "getUser",
  description: "Get a user by ID",
  inputSchema: z.object({
    type: z.literal("object"),
    properties: z.object({
      id: z.string()
    })
  })
}
```

Tipo que espera la **Responses API de OpenAI** para trabajar con tools:

[Documentación OpenAI](https://platform.openai.com/docs/guides/function-calling?api-mode=responses)

```ts
import OpenAI from "openai";

// El campo "parameters" es un JSON Schema

const openaiTool: OpenAI.Responses.Tool {
  "type": "function",
  "name": "getUser",
  "description": "Get a user by ID",
  "parameters": {
    "type": "object",
    "properties": {
      "id": { "type": "string" }
    },
    "required": ["id"],
    "additionalProperties": false
  },
  "strict": true
}
```

### Limitaciones

Cuando configuramos nuestra Tool en el servidor MCP debemos tener en cuenta algunas opciones **no compatibles con OpenAI**, a la hora de tipar nuestros argumentos usando Zod:

Todos los parámetros deben ser **requeridos**:
```text
Invalid schema for function 'update-user-goal': In context=(), 'required' is required to be supplied and to be an array including every key in properties.
```

No podemos usar **max()** o **min()** a la hora de definir un campo int():
```text
Invalid schema for function 'update-user-goal': In context=('properties', 'age', 'anyOf', '0'), 'minimum|maximun' is not permitted.
```

No podemos usar **default()** para establecer valores por defecto:
```text
BadRequestError: 400 Invalid schema for function 'update-user-goal': In context=('properties', 'hasPaid', 'anyOf', '0'), 'default' is not permitted.
```

### Demo *test*

> [!NOTE] 
> El proyecto requiere una versión de Node.js >= v20.

Ejecuta la demo con un Agente LLM usando OpenAI.

1. Ejecuta `npm run build` dentro del directorio **mcp-server-dummies** ya que ese es el MCP Server que vamos a utilizar.

2. Instala las dependencias con `npm i`, dentro del directorio **mcp-client**.

3. Ejecuta la demo, en el directorio **mcp-client**, usando el comando `npm run dev`.

- No olvides crear tu `.env`, dentro de **mcp-client**, con tu API Key válida de OpenAI:

  ```env
  OPENAI_API_KEY=<openai_key>
  ```


## 📄 Licencia

**MIT © [rperezll](https://github.com/rperezll)**