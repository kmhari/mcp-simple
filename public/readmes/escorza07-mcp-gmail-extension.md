# Gmail AutoAuth MCP Server

Un servidor MCP (Model Context Protocol) para integración con Gmail en Claude Desktop con soporte de autenticación automática. Este servidor permite a los asistentes de IA gestionar Gmail a través de interacciones en lenguaje natural.

![](https://badge.mcpx.dev?type=server 'MCP Server')
[![smithery badge](https://smithery.ai/badge/@gongrzhe/server-gmail-autoauth-mcp)](https://smithery.ai/server/@gongrzhe/server-gmail-autoauth-mcp)


## Características

- Enviar correos con asunto, contenido, archivos adjuntos y destinatarios
- Soporte completo para caracteres internacionales
- Leer mensajes por ID con manejo avanzado de estructura MIME
- Ver información de archivos adjuntos
- Buscar correos con varios criterios
- Gestión completa de etiquetas
- Listar todas las etiquetas disponibles
- Listar correos en bandeja de entrada, enviados o etiquetas personalizadas
- Marcar correos como leídos/no leídos
- Mover correos entre etiquetas
- Eliminar correos
- Operaciones por lotes para procesar múltiples correos

## Instalación y Autenticación

### Opción 1: Usando npx (Recomendado para uso personal)

1. **Obtener credenciales de Google Cloud:**
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuevo proyecto o selecciona uno existente
   - Habilita la API de Gmail
   - Ve a "APIs & Services" > "Credentials"
   - Crea credenciales OAuth 2.0
   - Descarga el archivo JSON de credenciales
   - Renómbralo a `gcp-oauth.keys.json`

2. **Configurar autenticación:**
   ```bash
   # Crea el directorio de configuración
   mkdir -p ~/.gmail-mcp
   
   # Mueve las credenciales al directorio
   mv gcp-oauth.keys.json ~/.gmail-mcp/
   
   # Ejecuta la autenticación
   npx @gongrzhe/server-gmail-autoauth-mcp auth
   ```

3. **Configurar en Claude Desktop:**
   ```json
   {
     "mcpServers": {
       "gmail": {
         "command": "npx",
         "args": [
           "@gongrzhe/server-gmail-autoauth-mcp"
         ]
       }
     }
   }
   ```

### Opción 2: Usando Node.js (Recomendado para desarrollo o distribución)

1. **Clonar el repositorio:**
   ```bash
   git clone [url-del-repositorio]
   cd Gmail-MCP-Server
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   - Copia el archivo `.env.example` a `.env`
   - Edita `.env` con tus credenciales:
     ```
     GOOGLE_CLIENT_ID="tu-client-id"
     GOOGLE_CLIENT_SECRET="tu-client-secret"
     GOOGLE_REFRESH_TOKEN="tu-refresh-token"
     GOOGLE_REDIRECT_URI="http://localhost:3000/oauth2callback"
     ```

4. **Compilar el proyecto:**
   ```bash
   npm run build
   ```

5. **Configurar en Claude Desktop:**
   ```json
   {
     "mcpServers": {
       "gmail": {
         "command": "node",
         "args": [
           "ruta/al/dist/index.js"
         ],
         "env": {
           "GOOGLE_CLIENT_ID": "tu-client-id",
           "GOOGLE_CLIENT_SECRET": "tu-client-secret",
           "GOOGLE_REFRESH_TOKEN": "tu-refresh-token",
           "GOOGLE_REDIRECT_URI": "http://localhost:3000/oauth2callback"
         }
       }
     }
   }
   ```

## Comparación de Métodos

### Método npx
- ✅ Más fácil de usar
- ✅ Renovación automática de tokens
- ✅ Ideal para uso personal
- ❌ Requiere configuración manual inicial

### Método Node.js
- ✅ Más control sobre la configuración
- ✅ Ideal para desarrollo y distribución
- ✅ Fácil de versionar y compartir
- ❌ Requiere gestión manual de tokens

## Solución de Problemas

### Problemas de Autenticación
- Si recibes `invalid_grant`, necesitas renovar el token:
  - Con npx: `npx @gongrzhe/server-gmail-autoauth-mcp auth`
  - Con Node: `node dist/index.js auth`

### Problemas de Conexión
- Verifica que el puerto 3000 esté disponible
- Asegúrate de que las credenciales sean correctas
- Verifica que la API de Gmail esté habilitada

## Seguridad

- Nunca compartas tus credenciales
- Revoca el acceso en Google Cloud Console si ya no lo necesitas
- Usa diferentes credenciales para desarrollo y producción
- Mantén tus tokens seguros y actualizados

## Contribuir

Las contribuciones son bienvenidas. Por favor, envía un Pull Request.

## Licencia

MIT

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.