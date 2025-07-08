# MCP Knowledge Base Reader

Un servidor MCP (Model Context Protocol) que permite leer una base de conocimientos en formato JSON para brindar información a los usuarios a través de Claude u otros LLMs.

## Características

- Lectura de base de conocimientos JSON estructurada
- Búsqueda de información por palabra clave
- Recuperación de entradas por ID
- Filtrado por categorías y etiquetas
- Búsqueda de entradas relacionadas
- Estadísticas sobre la base de conocimientos
- **Modo de solo lectura**: No modifica el archivo JSON, solo recupera información

## Estructura de la Base de Conocimientos

La base de conocimientos utiliza el siguiente formato JSON:

```json
{
  "metadata": {
    "title": "Título de la Base de Conocimientos",
    "description": "Descripción de la base",
    "version": "1.0",
    "created": "2025-04-23",
    "updated": "2025-04-23"
  },
  "categories": [
    {
      "id": "categoria1",
      "name": "Nombre de Categoría",
      "description": "Descripción de la categoría"
    }
  ],
  "entries": [
    {
      "id": "entrada1",
      "title": "Título de la Entrada",
      "category": "categoria1",
      "tags": ["etiqueta1", "etiqueta2"],
      "content": "Contenido detallado de la entrada",
      "related": ["entrada2", "entrada3"]
    }
  ]
}
```

## Instalación y Configuración

### Requisitos Previos

- Node.js 18 o superior
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/mcp-read-json.git
cd mcp-read-json

# Instalar dependencias
npm install

# Compilar el código TypeScript
npm run build
```

### Configuración para Claude Desktop

Para usar este servidor con Claude Desktop, añade la siguiente configuración a tu archivo `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "knowledge-reader": {
      "command": "node",
      "args": [
        "/ruta/completa/a/mcp-read-json/dist/index.js"
      ],
      "env": {
        "KNOWLEDGE_BASE_PATH": "/ruta/completa/a/tu/knowledge_base.json"
      }
    }
  }
}
```

**Notas importantes sobre la configuración:**

1. Utiliza rutas absolutas tanto para el script como para el archivo JSON
2. Asegúrate de que el archivo JSON existe en la ruta especificada
3. El servidor debe compilarse antes de utilizarlo (`npm run build`)

#### Solución a problemas comunes

Si encuentras el error "Server disconnected", verifica:

1. Que las rutas sean absolutas y correctas
2. Que el archivo JavaScript compilado exista en la ruta especificada
3. Que tienes permisos para ejecutar el archivo

## Herramientas Disponibles

El servidor expone las siguientes herramientas MCP:

### 1. read_knowledge_base
Lee toda la base de conocimientos.

**Ejemplo de uso con Claude:**
```
Claude, usa la herramienta read_knowledge_base para mostrarme toda la información disponible en la base de conocimientos.
```

### 2. search_entries
Busca entradas por texto en título, contenido y etiquetas.

**Ejemplo de uso con Claude:**
```
Claude, utiliza search_entries para buscar información sobre "seguridad".
```

### 3. get_entry_by_id
Recupera una entrada específica por su ID.

**Ejemplo de uso con Claude:**
```
Claude, usa get_entry_by_id con el ID "mcp-definition" para mostrarme la definición de MCP.
```

### 4. get_entries_by_category
Recupera todas las entradas de una categoría específica.

**Ejemplo de uso con Claude:**
```
Claude, utiliza get_entries_by_category con la categoría "intro" para mostrarme las introducciones a MCP.
```

### 5. get_entries_by_tags
Recupera entradas que contengan ciertas etiquetas.

**Ejemplo de uso con Claude:**
```
Claude, usa get_entries_by_tags para encontrar entradas con las etiquetas ["implementación", "código"].
```

### 6. get_related_entries
Encuentra entradas relacionadas con una entrada específica.

**Ejemplo de uso con Claude:**
```
Claude, después de revisar la entrada "mcp-components", usa get_related_entries con el ID "mcp-components" para mostrarme temas relacionados.
```

### 7. get_knowledge_stats
Proporciona estadísticas sobre la base de conocimientos.

**Ejemplo de uso con Claude:**
```
Claude, utiliza get_knowledge_stats para darme un resumen estadístico de la base de conocimientos.
```

## Ejemplo de Prompt para Claude

Para aprovechar al máximo la base de conocimientos, puedes usar el siguiente prompt:

```
Eres un asistente especializado que tiene acceso a una base de conocimientos sobre MCP (Model Context Protocol). Utiliza las herramientas disponibles para proporcionar información precisa y relevante.

Al inicio de cada conversación, deberías:
1. Usar get_knowledge_stats para familiarizarte con la estructura y contenido de la base de conocimientos
2. Cuando te pregunten sobre un tema específico, usar search_entries o la herramienta más apropiada

Cuando respondas:
1. Basa tu respuesta solo en la información de la base de conocimientos
2. Si la información solicitada no está disponible, indícalo claramente
3. Utiliza un formato claro y estructurado en tus respuestas
4. Sugiere información relacionada cuando sea relevante
```

## Desarrollo

```bash
# Instalar dependencias de desarrollo
npm install

# Iniciar modo desarrollo (compilación en tiempo real)
npm run dev
```

## Licencia

MIT
