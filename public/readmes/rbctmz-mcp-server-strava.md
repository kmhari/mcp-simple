# Интеграция Strava API с Model Context Protocol (MCP) SDK

![CI](https://github.com/rbctmz/mcp-server-strava/actions/workflows/ci.yml/badge.svg)
![Codecov](https://codecov.io/gh/rbctmz/mcp-server-strava/branch/main/graph/badge.svg)
![Python](https://img.shields.io/badge/python-3.10+-blue.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Ruff](https://img.shields.io/badge/code%20style-ruff-000000.svg)

Интеграция для анализа тренировок и получения рекомендаций на основе данных Strava с использованием Model Context Protocol SDK.

## 🚀 Возможности

- Анализ тренировок из Strava
- Рекомендации по тренировкам
- Автоматическое обновление токенов
- Rate limiting для API запросов

## 📋 Требования

- Python 3.10+
- [Claude Desktop](https://claude.ai/desktop)
- [Strava](https://www.strava.com) аккаунт
- [uv](https://github.com/astral-sh/uv) (рекомендуется)

## ⚙️ Установка

```bash
# Клонируем репозиторий
git clone https://github.com/rbctmz/mcp-server-strava.git
cd mcp-server-strava

# Установка через uv (рекомендуется)
curl -LsSf https://astral.sh/uv/install.sh | sh
uv pip install .

# Установка в режиме разработки
uv pip install -e ".[dev]"
```

### Установка MCP SDK

```bash
uv add "mcp[cli]"
```

## 🔧 Настройка

### Настройка Strava API

1. Перейдите на [страницу настроек API](https://www.strava.com/settings/api)
2. Создайте приложение:
   - Application Name: MCP Strava Integration
   - Category: Training Analysis
   - Website: <http://localhost>
   - Authorization Callback Domain: localhost

### Настройка окружения

1. Создайте файл с переменными окружения:

   ```bash
   cp .env-template .env
   ```

2. Получите токены доступа:

   ```bash
   python scripts/auth.py
   ```

3. Проверьте настройку:

   ```bash
   mcp dev src/server.py
   curl -X GET "http://localhost:8000/activities"
   ```

## 📚 API и примеры

### Ресурсы и инструменты

| Тип | Название | Описание |
|-----|----------|----------|
| Ресурс | `strava://activities` | Список активностей |
| Ресурс | `strava://activities/{id}` | Детали активности |
| Ресурс | `strava://athlete/zones` | Тренировочные зоны |
| Ресурс | `strava://athlete/clubs` | Клубы атлета |
| Ресурс | `strava://gear/{gear_id}` | Информация о снаряжении |
| Инструмент | `analyze_activity(activity_id)` | Анализ тренировки |
| Инструмент | `analyze_training_load(activities)` | Анализ нагрузки |
| Инструмент | `get_activity_recommendations()` | Рекомендации |

### Примеры использования

```python
from mcp import ClientSession

# Получение активностей
async with ClientSession() as session:
    activities = await session.read_resource("strava://activities")
    activity = await session.read_resource("strava://activities/12345678")

# Анализ тренировки
result = analyze_activity(activity_id="12345678")
"""
{
    "type": "Run",
    "distance": 5000,
    "moving_time": 1800,
    "analysis": {
        "pace": 5.5,  # мин/км
        "effort": "Средняя"
    }
}
"""

# Анализ нагрузки
summary = analyze_training_load(activities)
"""
{
    "activities_count": 10,
    "total_distance": 50.5,  # км
    "total_time": 5.2,      # часы
    "heart_rate_zones": {
        "easy": 4,    # ЧСС < 120
        "medium": 4,  # ЧСС 120-150
        "hard": 2     # ЧСС > 150
    }
}
"""

# Получение тренировочных зон
async with ClientSession() as session:
    zones = await session.read_resource("strava://athlete/zones")
    """
    {
        "heart_rate": {
            "custom_zones": true,
            "zones": [
                {"min": 0, "max": 120, "name": "Z1 - Recovery"},
                {"min": 120, "max": 150, "name": "Z2 - Endurance"},
                {"min": 150, "max": 170, "name": "Z3 - Tempo"},
                {"min": 170, "max": 185, "name": "Z4 - Threshold"},
                {"min": 185, "max": -1, "name": "Z5 - Anaerobic"}
            ]
        },
        "power": {
            "zones": [
                {"min": 0, "max": 180},
                {"min": 181, "max": 250},
                {"min": 251, "max": 300},
                {"min": 301, "max": 350},
                {"min": 351, "max": -1}
            ]
        }
    }
    """
```

## 🛠 Разработка

### CI/CD и безопасность

- ![Coverage](https://img.shields.io/badge/coverage-72%25-yellow.svg)
- ![Tests](https://img.shields.io/badge/tests-15%20passed-green.svg)
- ![Ruff](https://img.shields.io/badge/code%20style-ruff-000000.svg)

#### Проверки в GitHub Actions

| Тип | Инструмент | Описание |
|-----|------------|-----------|
| Линтинг | ruff | Форматирование и анализ кода |
| Тесты | pytest | Unit и интеграцио��ные тесты |
| Покрытие | pytest-cov | Отчет о покрытии кода |

#### Безопасность и секреты

1. Защита токенов:
   - `.env` в `.gitignore`
   - GitHub Secrets для CI/CD
   - Rate limiting: 100 запросов/15 мин

2. Настройка секретов:

   ```bash
   # В GitHub: Settings → Secrets → Actions
   STRAVA_CLIENT_ID=<client_id>
   STRAVA_CLIENT_SECRET=<client_secret>
   STRAVA_REFRESH_TOKEN=<refresh_token>
   ```

### Contributing

1. Форкните репозиторий
2. Установите зависимости: `uv pip install -e ".[dev]"`
3. Создайте ветку: `git checkout -b feature/name`
4. Проверьте изменения:

   ```bash
   ruff format .
   ruff check .
   pytest --cov=src
   ```

5. Создайте Pull Request

## 📫 Поддержка

- GitHub Issues: [создать issue](https://github.com/rbctmz/mcp-server-strava/issues)
- Telegram: [@greg_kisel](https://t.me/greg_kisel)

## 📄 Лицензия

[MIT](LICENSE)
