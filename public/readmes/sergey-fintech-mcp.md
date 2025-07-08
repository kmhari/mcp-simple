# MCP Серверы

Этот репозиторий содержит два MCP (Model Context Protocol) сервера:
1. File Finder MCP - для поиска файлов
2. Whisper STT MCP - для преобразования речи в текст

## File Finder MCP Server

Это сервер Model Context Protocol (MCP), который предоставляет функциональность поиска файлов. Он позволяет искать файлы, содержащие указанный текстовый фрагмент в их именах.

### Предварительные требования

- Node.js (версия 14 или выше)
- npm (версия 6 или выше)
- Python 3.6 или выше (для HTTP сервера)

### Установка

1. Клонируйте или скачайте этот репозиторий
2. Перейдите в директорию проекта
3. Установите зависимости:
   ```
   npm install
   ```
4. Соберите проект:
   ```
   npm run build
   ```

### Запуск сервера

Проект предоставляет несколько вариантов запуска MCP сервера:

#### Вариант 1: Прямой запуск MCP сервера

Вы можете запустить MCP сервер напрямую с помощью Node.js:

```
npm start
```

или

```
node build/index.js
```

Это запустит сервер, и он будет ожидать JSON-RPC запросы на stdin/stdout.

#### Вариант 2: Запуск HTTP сервера и MCP прокси

Этот вариант использует Python HTTP сервер и MCP прокси, который перенаправляет запросы к HTTP серверу:

1. Сначала запустите HTTP сервер:
   ```
   npm run start:python
   ```
   или
   ```
   python main.py
   ```

2. Затем в другом терминале запустите MCP прокси:
   ```
   npm run start:http
   ```
   или
   ```
   node build/index-http.js
   ```

#### Вариант 3: Интеграция с VS Code (расширение Cline)

Для интеграции сервера с VS Code и расширением Cline:

1. Найдите файл настроек MCP:
   - Windows: `%APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`
   - macOS: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
   - Linux: `~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

2. Добавьте следующую конфигур��цию в объект `mcpServers` в файле настроек:

```json
"file-finder-mcp": {
  "command": "node",
  "args": ["<ПОЛНЫЙ_ПУТЬ_К_ПРОЕКТУ>/build/index.js"],
  "disabled": false,
  "autoApprove": []
}
```

Для использования HTTP прокси:

```json
"file-finder-mcp-http": {
  "command": "node",
  "args": ["<ПОЛНЫЙ_ПУТЬ_К_ПРОЕКТУ>/build/index-http.js"],
  "disabled": false,
  "autoApprove": []
}
```

Замените `<ПОЛНЫЙ_ПУТЬ_К_ПРОЕКТУ>` на фактический путь к директории вашего проекта.

3. Перезапустите VS Code для загрузки обновленных настроек.

### Доступные инструменты

MCP сервер предоставляет один инструмент:

- `search_files`: Ищет файлы, содержащие указанный фрагмент в их именах
  - Параметры:
    - `fragment` (строка, обязательный): Текстовый фрагмент для поиска в именах файлов

### Пример использования

```
<use_mcp_tool>
<server_name>file-finder-mcp</server_name>
<tool_name>search_files</tool_name>
<arguments>
{
  "fragment": ".py"
}
</arguments>
</use_mcp_tool>
```

Этот пример ищет все файлы, содержащие ".py" в их именах.

### HTTP сервер (main.py)

В корневой директории проекта находится файл `main.py`, который реализует HTTP сервер для поиска файлов. Этот сервер предоставляет REST API для поиска файлов, содержащих указанный фрагмент в их именах.

#### Запуск HTTP сервера

1. Перейдите в корневую директорию проекта
2. Запустите сервер с помощью Python:
   ```
   python main.py
   ```
3. Сервер будет запущен на http://localhost:8080

#### Использование API

Для поиска файлов отправьте GET запрос на `/search` с параметром запроса `q`:

```
http://localhost:8080/search?q=.json
```

Этот запрос вернет JSON-массив с информацией о всех файлах, содержащих ".json" в их именах. Каждый элемент массива содержит следующие поля:
- `name`: имя файла
- `path`: абсолютный путь к файлу
- `size`: размер файла в байтах
- `created`: дата и время создан��я файла

Пример ответа:
```json
[
    {
        "name": "package.json",
        "path": "/absolute/path/to/package.json",
        "size": 1234,
        "created": "Wed Feb 26 17:00:00 2025"
    }
]
```

## Whisper STT MCP Server

Это сервер Model Context Protocol (MCP), который предоставляет функциональность преобразования речи в текст с использованием библиотеки faster-whisper. Он позволяет транскрибировать аудиоданные в текст с автоматическим определением языка.

### Предварительные требования

- Node.js (версия 14 или выше)
- npm (версия 6 или выше)
- Python 3.6 или выше
- faster-whisper (установите с помощью `pip install faster-whisper`)

### Установка

1. Клонируйте или скачайте этот репозиторий
2. Перейдите в директорию проекта
3. Установите зависимости:
   ```
   npm install
   pip install faster-whisper
   ```
4. Соберите проект:
   ```
   npm run build
   ```

### Запуск сервера

Проект предоставляет несколько вариантов запуск�� Whisper MCP сервера:

#### Вариант 1: Прямой запуск MCP сервера

Вы можете запустить MCP сервер напрямую с помощью Node.js:

```
npm run start:whisper
```

или

```
node build/whisper-index.js
```

Это запустит сервер, и он будет ожидать JSON-RPC запросы на stdin/stdout.

#### Вариант 2: Запуск HTTP сервера и MCP прокси

Этот вариант использует Python HTTP сервер и MCP прокси, который перенаправляет запросы к HTTP серверу:

1. Сначала запустите HTTP сервер:
   ```
   npm run start:whisper:python
   ```
   или
   ```
   python whisper_server.py
   ```

2. Затем в другом терминале запустите MCP прокси:
   ```
   npm run start:whisper:http
   ```
   или
   ```
   node build/whisper-index-http.js
   ```

#### Вариант 3: Интеграция с VS Code (расширение Cline)

Для интеграции сервера с VS Code и расширением Cline:

1. Найдите файл настроек MCP:
   - Windows: `%APPDATA%\Code\User\globalStorage\saoudrizwan.claude-dev\settings\cline_mcp_settings.json`
   - macOS: `~/Library/Application Support/Code/User/globalStorage/saoudrizwan.claude-dev/settings\cline_mcp_settings.json`
   - Linux: `~/.config/Code/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`

2. Добавьте следующую конфигурацию в объект `mcpServers` в файле настроек:

```json
"whisper-stt-mcp": {
  "command": "node",
  "args": ["<ПОЛНЫЙ_ПУТЬ_К_ПРОЕКТУ>/build/whisper-index.js"],
  "disabled": false,
  "autoApprove": []
}
```

Для использования HTTP прокси:

```json
"whisper-stt-mcp-http": {
  "command": "node",
  "args": ["<ПОЛНЫЙ_ПУТЬ_К_ПРОЕКТУ>/build/whisper-index-http.js"],
  "disabled": false,
  "autoApprove": []
}
```

Замените `<ПОЛНЫЙ_ПУТЬ_К_ПРОЕКТУ>` на фактический путь к директории вашего проекта.

3. Перезапустите VS Code для загрузки обновленных настроек.

### Доступные инструменты

MCP сервер предоставляет один инструмент:

- `transcribe_audio`: Преобразует аудиоданные в текст с использованием faster-whisper
  - Параметры:
    - `audio_base64` (строка, обязательный): Аудиоданные в формате base64
    - `language` (с��рока, необязательный): Код языка (например, "en", "ru"). Если не указан, язык будет определен автоматически.

### Пример использования

```
<use_mcp_tool>
<server_name>whisper-stt-mcp</server_name>
<tool_name>transcribe_audio</tool_name>
<arguments>
{
  "audio_base64": "BASE64_ENCODED_AUDIO_DATA",
  "language": "ru"
}
</arguments>
</use_mcp_tool>
```

Этот пример преобразует аудиоданные в текст, предполагая, что аудио на русском языке.

### HTTP сервер (whisper_server.py)

В корневой директории проекта находится файл `whisper_server.py`, который реализует HTTP сервер для преобразования речи в текст. Этот сервер предоставляет REST API для транскрибирования аудиоданных в текст.

#### Запуск HTTP сервера

1. Перейдите в корневую директорию проекта
2. Запустите сервер с помощью Python:
   ```
   python whisper_server.py
   ```
3. Сервер будет запущен на http://localhost:8081

#### Использование API

Для транскрибирования ��удио отправьте POST запрос на `/transcribe` с JSON-телом, содержащим:
- `audio`: строка в формате base64, содержащая аудиоданные
- `language` (необязательно): код языка (например, "en", "ru")

Пример запроса:
```json
{
  "audio": "BASE64_ENCODED_AUDIO_DATA",
  "language": "ru"
}
```

Ответ будет содержать:
- `text`: полный транскрибированный текст
- `segments`: массив сегментов с временными метками
- `language`: определенный язык
- `language_probability`: вероятность определения языка

Пример ответа:
```json
{
  "text": "Это пример транскрибированного текста.",
  "segments": [
    {
      "start": 0.0,
      "end": 2.5,
      "text": "Это пример"
    },
    {
      "start": 2.5,
      "end": 4.0,
      "text": "транскрибированного текста."
    }
  ],
  "language": "ru",
  "language_probability": 0.98
}
```

## Устранение неполадок

- Если вы получаете ошибку "No connection found for server", убедитесь, что вы перезапустили VS Code после обновления настрое�� MCP.
- Если сервер не отвечает, проверьте, что путь в настройках MCP правильный и указывает на собранный JavaScript файл.
- Убедитесь, что сервер правильно собран, выполнив `npm run build` перед попыткой его использования.
- Для использования HTTP прокси убедитесь, что соответствующий HTTP сервер запущен (на порту 8080 для file-finder или 8081 для whisper-stt).
- Если возникают проблемы с faster-whisper, убедитесь, что библиотека правильно установлена и у вас есть необходимые зависимости для работы с GPU (если вы используете GPU).

## Структура проекта

Ниже приведен список основных файлов проекта и их назначение:

### Корневая директория
- `src/index.ts` - Исходный код TypeScript MCP сервера для поиска файлов (прямая реализация)
- `src/index-http.ts` - Исходный код TypeScript MCP прокси для HTTP сервера поиска файлов
- `src/whisper-index.ts` - Исходный код TypeScript MCP сервера для преобразования речи в текст (прямая реализация)
- `src/whisper-index-http.ts` - Исходный код TypeScript MCP прокси для HTTP сервера преобразования речи в текст
- `build/index.js` - Скомпилированный JavaScript код MCP сервера для поиска файлов
- `build/index-http.js` - Скомпилированный JavaScript код MCP прокси для поиска файлов
- `build/whisper-index.js` - Скомпилированный JavaScript код MCP сервера для преобразования речи в текст
- `build/whisper-index-http.js` - Скомпилированный JavaScript код MCP прокси для преобразования речи в текст
- `tsconfig.json` - Конфигурация TypeScript
- `package.json` - Описание пакета и зависимости
- `main.py` - HTTP сервер на Python для поиска файлов
- `whisper_server.py` - HTTP сервер на Python для преобразования речи в текст
- `README.md` - Документация проекта (этот файл)