# Serper Productos

Un servidor MCP (Model Context Protocol) para buscar productos en línea utilizando la API de Google Serper.

## Descripción

Este paquete proporciona una herramienta para buscar productos en línea a través de la API de Google Serper. Está diseñado para ser utilizado como un servidor MCP, lo que permite integrarlo fácilmente con asistentes de IA compatibles con MCP.

## Instalación

```bash
npm install serper-productos
```

## Requisitos

Para utilizar este paquete, necesitarás:

1. Una clave API de [Google Serper](https://serper.dev/)
2. Node.js (versión 16 o superior)

## Configuración

1. Crea un archivo `.env` en la raíz de tu proyecto con la siguiente variable:

```
# Obligatorio
SERPER_API_KEY=tu_clave_api_aquí

# Valores predeterminados para parámetros obligatorios
SERPER_GL=pe           # Código de país (ej: pe para Perú)
SERPER_HL=es-419       # Código de idioma (ej: es-419 para español latinoamericano)
```

2. Asegúrate de añadir `.env` a tu archivo `.gitignore` para no exponer tu clave API.

## Uso

### Como herramienta de línea de comandos

Después de instalar el paquete globalmente:

```bash
npm install -g serper-productos
serper-productos
```

### Como servidor MCP independiente

Para usar este paquete como un servidor MCP independiente, puedes configurarlo en tu archivo de configuración MCP. Por ejemplo, para usarlo con Codeium:

```json
{
  "mcpServers": {
    "serper-productos": {
      "command": "npx",
      "args": ["-y", "serper-productos"],
      "env": {
        "SERPER_API_KEY": "tu_clave_api_aqui",
        "SERPER_GL": "pe",
        "SERPER_HL": "es-419",
        "SERPER_TBS": "qdr:m",
        "SERPER_NUM": "10"
      }
    }
  }
}
```

Donde:
- `SERPER_API_KEY`: Tu clave API de Google Serper (obligatorio)
- `SERPER_GL`: Código de país (predeterminado: "pe")
- `SERPER_HL`: Código de idioma (predeterminado: "es-419")
- `SERPER_TBS`: Filtro de tiempo (opcional)
- `SERPER_NUM`: Número de resultados (opcional)

## Uso con MCP

Cuando se usa como servidor MCP, este paquete proporciona la siguiente herramienta:

### Herramienta `search`

Busca productos basados en la consulta proporcionada.

#### Parámetros

- `query` (string): El término de búsqueda para encontrar productos.

#### Configuración mediante variables de entorno

- `SERPER_API_KEY` (obligatorio): Tu clave API de Google Serper.
- `SERPER_GL` (opcional): Código de país (ej: 'pe' para Perú). Predeterminado: 'pe'.
- `SERPER_HL` (opcional): Código de idioma (ej: 'es-419' para español latinoamericano). Predeterminado: 'es-419'.
- `SERPER_TBS` (opcional): Filtro de tiempo (ej: 'qdr:m' para el último mes).
- `SERPER_NUM` (opcional): Número de resultados (máximo 100).

#### Retorno

- Promise<string>: Una cadena formateada con los resultados de la búsqueda.

## Ejemplo de respuesta

```
Productos encontrados para "laptop":

title: Laptop HP 15.6" HD, Intel Core i5-1135G7, 8GB RAM, 256GB SSD, Windows 11
price: S/1,799.00
source: Falabella
link: https://www.falabella.com.pe/...
---
title: Laptop Lenovo IdeaPad 3, AMD Ryzen 5, 8GB RAM, 512GB SSD
price: S/1,599.00
source: Ripley
link: https://simple.ripley.com.pe/...
---
```

## Licencia

MIT

## Contribuciones

Las contribuciones son bienvenidas. Por favor, siente libre de abrir un issue o enviar un pull request.

## Autor

David Almeyda
