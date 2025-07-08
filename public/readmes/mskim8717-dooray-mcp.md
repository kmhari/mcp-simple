# Dooray MCP Server
[![smithery badge](https://smithery.ai/badge/@mskim8717/dooray-mcp)](https://smithery.ai/server/@mskim8717/dooray-mcp)

Dooray API를 활용한 일정 관리 MCP 서버입니다.

## 기능

- Dooray API를 통한 일정 추가
- 시작/종료 시간 자동 설정
- 위치 및 설명 정보 지원

## 설치 방법

### Installing via Smithery

To install Dooray Schedule Manager for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@mskim8717/dooray-mcp):

```bash
npx -y @smithery/cli install @mskim8717/dooray-mcp --client claude
```

### Manual Installation
1. 저장소 클론
```bash
git clone https://github.com/mskim8717/dooray-mcp.git
cd dooray-mcp
```

2. 가상환경 생성 및 활성화
```bash
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# 또는
.\.venv\Scripts\activate  # Windows
```

3. 의존성 설치
```bash
pip install -e .
```

## MCP 클라이언트 연동을 위한 준비

Claude, Cursor와 같은 MCP 클라이언트 애플리케이션에서 로컬 MCP 서버를 연동하려면,
서버 실행에 필요한 Python 실행 파일 경로와 MCP 서버 스크립트 경로를 JSON 설정에 입력해야 합니다.

내 경로에 알맞게 mcp.json을 수정해둡니다.

✅ macOS / Linux 예시
```json
{
  "mcpServers": {
    "dooray-mcp": {
      "command": "/Users/yourname/project/.venv/bin/python",
      "args": [
        "/Users/yourname/project/src/dooray-mcp-server.py"
      ]
    }
  }
}
```

## 환경변수 설정

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```
DOORAY_API_KEY=your_api_key
DOORAY_MEMBER_ID=your_member_id
DOORAY_CALENDAR_ID=your_calendar_id
```

## 사용 방법

서버 실행:
```bash
python src/dooray-mcp-server.py
```

## 프로젝트 구조

```
dooray-mcp/
├── src/
│   └── dooray-mcp-server.py
├── pyproject.toml
├── README.md
└── LICENSE
```

## 라이선스

MIT License
