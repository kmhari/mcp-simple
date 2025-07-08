# MCP-NAV v0.3.0

Servidor MCP para navegar modelcontextprotocol.io con características avanzadas.

## Características

- Navegación y búsqueda en modelcontextprotocol.io
- Caché de contenido con Redis
- Búsqueda semántica con Elasticsearch
- Gestión de usuarios y autenticación
- Métricas con Prometheus
- Trazabilidad con OpenTelemetry
- Logging estructurado con structlog

## Requisitos

- Python 3.11+
- Redis 5.0+
- Elasticsearch 8.12+
- Docker 20.10+ (opcional)
- Docker Compose 2.0+ (opcional)

## Instalación

### Usando Poetry

```bash
# Instalar dependencias
poetry install

# Activar entorno virtual
poetry shell
```

### Usando Docker

```bash
# Construir imagen
docker build -t mcp-nav .

# Ejecutar contenedor
docker run -p 9090:9090 mcp-nav
```

### Usando Docker Compose

```bash
# Levantar servicios
docker-compose up -d
```

## Configuración

La configuración se realiza mediante variables de entorno:

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| MCP_NAV_PORT | Puerto del servidor | 9090 |
| MCP_NAV_HOST | Host del servidor | 0.0.0.0 |
| MCP_NAV_REDIS_HOST | Host de Redis | localhost |
| MCP_NAV_REDIS_PORT | Puerto de Redis | 6379 |
| MCP_NAV_ES_HOST | Host de Elasticsearch | localhost |
| MCP_NAV_ES_PORT | Puerto de Elasticsearch | 9200 |
| MCP_NAV_CACHE_TTL | TTL del caché (segundos) | 3600 |
| MCP_NAV_JWT_SECRET | Clave secreta para JWT | your-secret-key |

## API REST

### Usuarios

#### Crear usuario
```http
POST /users/
Content-Type: application/json

{
    "email": "user@example.com",
    "name": "John Doe",
    "password": "secret"
}
```

#### Obtener usuario
```http
GET /users/{user_id}
```

#### Actualizar usuario
```http
PUT /users/{user_id}
Content-Type: application/json

{
    "name": "Jane Doe"
}
```

#### Eliminar usuario
```http
DELETE /users/{user_id}
```

#### Actualizar foto de perfil
```http
PUT /users/{user_id}/profile-picture?picture_url=https://example.com/photo.jpg
```

## Desarrollo

### Pruebas

```bash
# Ejecutar pruebas
poetry run pytest

# Con cobertura
poetry run pytest --cov=app
```

### Linting y Formateo

```bash
# Formatear código
poetry run black app tests

# Ordenar imports
poetry run isort app tests

# Verificar tipos
poetry run mypy app

# Linting
poetry run pylint app
```

### Pre-commit

El proyecto usa pre-commit para verificar el código antes de cada commit:

```bash
# Instalar hooks
poetry run pre-commit install

# Ejecutar manualmente
poetry run pre-commit run --all-files
```

## Métricas y Monitoreo

- Métricas expuestas en `/metrics` (Prometheus)
- Trazas con OpenTelemetry
- Logs estructurados con structlog

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT. 