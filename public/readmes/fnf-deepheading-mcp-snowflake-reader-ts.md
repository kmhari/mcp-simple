# MCP Snowflake Reader

[English](#english) | [한국어](#korean)

## English

A read-only MCP server for Snowflake databases. This server provides secure, read-only access to Snowflake databases through the MCP protocol.

### Features

- **Read-only Access**: Secure read-only access to Snowflake databases
- **Cross-platform Support**: Works on Windows, macOS, and Linux
- **Query Caching**: Reduces Snowflake compute costs by caching query results
- **Connection Testing**: Optimized connection testing without executing queries

### Installation

```bash
npm install -g mcp-snowflake-reader
```

### Usage

```bash
mcp-snowflake-reader --connection '{"account":"your-account","username":"your-user","password":"your-password","warehouse":"your-warehouse","database":"your-database","schema":"your-schema","role":"your-role"}'
```

### MCP Client Configuration

Add the following configuration to your MCP client settings file (Cursor AI or Claude):

```json
{
  "mcpServers": {
    "mcp-snowflake-reader": {
      "command": "mcp-snowflake-reader",
      "args": [
        "--connection",
        "{\"account\":\"your-account\",\"username\":\"your-user\",\"password\":\"your-password\",\"warehouse\":\"your-warehouse\",\"database\":\"your-database\",\"schema\":\"your-schema\",\"role\":\"your-role\"}"
      ]
    }
  }
}
```

### Logging

Logs are saved in the following locations:
- **Windows**: `%TEMP%\mcp-snowflake-reader\app.log`
- **macOS/Linux**: `/tmp/mcp-snowflake-reader/app.log`

### Limitations

- Only read-only operations are allowed
- Table names can only contain alphanumeric characters, underscores, and dots
- The following SQL keywords are prohibited:
  - INSERT
  - UPDATE
  - DELETE
  - DROP
  - TRUNCATE
  - ALTER
  - CREATE
  - GRANT
  - REVOKE
  - COMMIT
  - ROLLBACK

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Korean

Snowflake 데이터베이스의 테이블을 읽어오는 MCP(Microservice Control Protocol) 서버입니다.

### 주요 기능

- **읽기 전용 접근**: Snowflake 데이터베이스에 대한 안전한 읽기 전용 접근
- **크로스 플랫폼 지원**: Windows, macOS, Linux에서 모두 작동
- **쿼리 캐싱**: 쿼리 결과를 캐싱하여 Snowflake 컴퓨팅 비용 절감
- **연결 테스트 최적화**: 실제 쿼리 실행 없이 연결 상태 확인

### 설치

```bash
npm install -g mcp-snowflake-reader
```

### 사용 방법

```bash
mcp-snowflake-reader --connection '{"account":"your-account","username":"your-user","password":"your-password","warehouse":"your-warehouse","database":"your-database","schema":"your-schema","role":"your-role"}'
```

### MCP 클라이언트 설정

Cursor AI나 Claude와 같은 MCP 클라이언트의 설정 파일에 다음 설정을 추가하세요:

```json
{
  "mcpServers": {
    "mcp-snowflake-reader": {
      "command": "mcp-snowflake-reader",
      "args": [
        "--connection",
        "{\"account\":\"your-account\",\"username\":\"your-user\",\"password\":\"your-password\",\"warehouse\":\"your-warehouse\",\"database\":\"your-database\",\"schema\":\"your-schema\",\"role\":\"your-role\"}"
      ]
    }
  }
}
```

### 로깅

로그는 다음 위치에 저장됩니다:
- **Windows**: `%TEMP%\mcp-snowflake-reader\app.log`
- **macOS/Linux**: `/tmp/mcp-snowflake-reader/app.log`

### 제한사항

- 읽기 전용 작업만 허용됩니다
- 테이블 이름은 영숫자, 언더스코어, 점만 허용됩니다
- 다음 SQL 키워드는 금지됩니다:
  - INSERT
  - UPDATE
  - DELETE
  - DROP
  - TRUNCATE
  - ALTER
  - CREATE
  - GRANT
  - REVOKE
  - COMMIT
  - ROLLBACK

### 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요. 