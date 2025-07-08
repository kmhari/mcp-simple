# weather-server MCP Server

Weather MCP Server

This is a TypeScript-based MCP server that implements a simple notes system. It demonstrates core MCP concepts by providing:

### 사용 방법

1. `.env` 파일 생성 후 OPENWEATHER_API_KEY=API_KEY
2. `npm run build` 명령어 실행
3. `claude_desktop_config.json` 파일 수정 (빌드 후 생성되는 index.js 파일의 경로)

```json
{
  "mcpServers": {
    "weather-server": {
      "command": "node",
      "args": ["/Users/{UserName}/Desktop/{Project-path}/build/index.js"]
    }
  }
}
```
