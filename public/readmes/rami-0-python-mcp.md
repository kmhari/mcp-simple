Для запуска этого проекта локально:

**На macOS:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**На Windows:**
```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**Создание виртуального окружения и установка зависимостей (опционально, но рекомендуется):**

Вам может потребоваться создать виртуальное окружение и установить зависимости для проекта. Выполните следующие шаги:

1. **Перейдите в директорию проекта:**
   ```bash
   cd /Users/rami/Desktop/file-search
   ```

2. **Создайте виртуальное окружение (если необходимо):**
   Вы можете использовать `venv` или `uv venv`:
   ```bash
   python3 -m venv .venv
   ```
   или
   ```bash
   uv venv .venv
   ```

3. **Активируйте виртуальное окружение:**
   **macOS/Linux:**
   ```bash
   source .venv/bin/activate
   ```
   **Windows:**
   ```bash
   .venv\Scripts\activate
   ```

4. **Установите зависимости проекта с помощью uv:**
   ```bash
   uv pip install -r pyproject.toml
   ```

Затем добавьте сервер в файл конфигурации расширения:

```json
"file-search": {
  "command": "uv",
  "args": [
    "--directory",
    "/Users/rami/Desktop/file-search", // Путь к файлу, где он расположен.
    "run",
    "main.py"
  ]
}
```

После этого сервер должен быть запущен. Попросите вашего клиента использовать инструмент по его имени - `file-search` - и передать параметр. Пример:

```xml
<use_mcp_tool>
  <server_name>file-search</server_name>
  <tool_name>file_search</tool_name>
  <arguments>
    {
      "query": "your_search_term"
    }
  </arguments>
</use_mcp_tool>

![Screenshot](Screenshot 2025-02-27 at 18.11.06.png)
