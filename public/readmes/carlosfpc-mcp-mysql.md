# MCP MySQL Server

Servidor MCP para conexión MySQL con túnel SSH.

## Requisitos Previos

- Node.js (versión 14 o superior)
- Acceso SSH al servidor remoto
- Cliente MySQL
- Cursor IDE

## Instalación

1. Clona este repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd [NOMBRE_DEL_DIRECTORIO]
```

2. Crea el archivo de configuración:
```bash
cp mcp-config.env.example mcp-config.env
```

3. Configura las variables en `mcp-config.env`:

### Variables de Configuración MySQL
```env
# Configuración de conexión MySQL
MYSQL_HOST=127.0.0.1     # Host de MySQL (por defecto localhost)
MYSQL_PORT=3306          # Puerto de MySQL (por defecto 3306)
MYSQL_USER=              # Tu usuario de MySQL
MYSQL_PASS=              # Tu contraseña de MySQL
MYSQL_DB=                # Nombre de la base de datos

# Permisos de operaciones
ALLOW_INSERT_OPERATION=false    # Permitir operaciones INSERT
ALLOW_UPDATE_OPERATION=false    # Permitir operaciones UPDATE
ALLOW_DELETE_OPERATION=false    # Permitir operaciones DELETE
ALLOW_SELECT_OPERATION=true     # Permitir operaciones SELECT (consultas)

# Configuración SSH para túnel
SSH_HOST=                # Hostname del servidor SSH
SSH_USER=                # Usuario SSH
SSH_PORT_MAPPING=3306:127.0.0.1:3306  # Mapeo de puertos para el túnel SSH
```

4. Instala las dependencias:
```bash
npm install
```

## Configuración en Cursor IDE

1. Localiza o crea el archivo `mcp.json` en la ruta `C:\Users\[TU_USUARIO]\.cursor\mcp.json`
2. Añade la siguiente configuración (ajusta la ruta a la ubicación donde clonaste el repositorio):

```json
{
  "mcpServers": {
    "MySQL": {
      "transportType": "stdio",
      "command": "npm",
      "args": ["--silent", "--prefix", "RUTA_A_TU_PROYECTO", "run", "start-mcp"]
    }
  }
}
```

Por ejemplo, si clonaste el proyecto en `C:\proyectos\mcp-mysql`, la configuración sería:
```json
{
  "mcpServers": {
    "MySQL": {
      "transportType": "stdio",
      "command": "npm",
      "args": ["--silent", "--prefix", "C:\\proyectos\\mcp-mysql", "run", "start-mcp"]
    }
  }
}
```

## Uso

Para iniciar el servidor:
```bash
npm run start-mcp
```

## Estructura del Proyecto

- `start-mcp.js`: Script principal que inicia el túnel SSH y el servidor MCP
- `mcp-config.env`: Archivo de configuración (no incluido en el repositorio)
- `package.json`: Definición de dependencias y scripts

## Notas Importantes

- No modifiques las versiones de las dependencias en package.json para mantener la compatibilidad
- Asegúrate de tener acceso SSH configurado correctamente
- No compartas tu archivo mcp-config.env
- Por defecto, solo las operaciones SELECT están habilitadas. Modifica los permisos según tus necesidades
- El túnel SSH es necesario para conexiones a bases de datos remotas. Si estás usando una base de datos local, puedes dejar la configuración SSH vacía 