# FastMCP 웹훅 서버

FastMCP 프레임워크를 사용한 동적 웹훅 전송 MCP 서버입니다.

## 기능

- GET 방식 웹훅 전송
- POST 방식 웹훅 전송
- 커스텀 HTTP 메서드 지원 (PUT, DELETE, PATCH 등)
- 사용자 정의 헤더 및 페이로드 지원
- 헤더 인증 지원

## 설치 및 실행

1. 가상환경 설정 및 종속성 설치:

```bash
# 가상환경 활성화
source venv/bin/activate

# 종속성 설치
pip install -r requirements.txt
```

2. 서버 실행:

```bash
# 방법 1: 개발 모드 (웹 인터페이스 제공)
fastmcp dev main.py

# 방법 2: 직접 실행
python main.py

# 방법 3: Claude Desktop에 설치
fastmcp install main.py --name "Webhook Server"
```

## Claude Desktop에 MCP 서버 설정하기

### 전제 조건

- Claude Desktop 설치 (<https://claude.ai/desktop>)
- FastMCP 설치 (`pip install fastmcp`)
- uv 설치 (macOS에서는 `brew install uv`)

### 설치 과정

1. 터미널에서 다음 명령어를 실행하여 MCP 서버를 Claude Desktop에 설치합니다:

```bash
cd dante@webhook_trigger
fastmcp install main.py --name "Webhook Server"
```

2. 환경 변수가 필요한 경우 다음과 같이 설정할 수 있습니다:

```bash
# .env 파일에서 불러오기
fastmcp install main.py --name "Webhook Server" -f .env
```

3. 설치 성공 메시지가 표시되면, Claude Desktop을 실행합니다.

4. Claude Desktop 앱에서:
   - 좌측 하단의 설정 아이콘(⚙️)을 클릭합니다.
   - "Extension & Tools" 메뉴로 이동합니다.
   - "Installed Tools" 섹션에서 "Webhook Server"가 표시되는지 확인합니다.
   - 필요한 경우 토글 스위치로 활성화합니다.

### claude_desktop_config.json 수동 설정 방법

FastMCP의 설치 명령어는 자동으로 Claude Desktop의 설정 파일을 업데이트합니다. 하지만 수동으로 설정하거나 문제가 발생한 경우 다음 방법을 사용할 수 있습니다:

1. **claude_desktop_config.json 파일 위치**:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `C:\Users\YourUsername\AppData\Roaming\Claude\claude_desktop_config.json`
   - Linux: `~/.config/Claude/claude_desktop_config.json`

2. **웹훅 MCP 서버를 위한 설정 추가 (가상환경 사용)**:

```json
{
  "mcpServers": {
    "webhook-server": {
      "command": "/absolute/path/to/dante@webhook_trigger/venv/bin/python",
      "args": [
        "/absolute/path/to/dante@webhook_trigger/main.py"
      ],
      "env": {
        "DEBUG": "true"
      }
    }
  }
}
```

3. **쉘 스크립트를 통한 실행 방식 (권장)**:

```json
{
  "mcpServers": {
    "webhook-server": {
      "command": "/bin/bash",
      "args": [
        "/absolute/path/to/dante@webhook_trigger/mcp_run.sh"
      ],
      "env": {
        "DEBUG": "true"
      }
    }
  }
}
```

4. **uv를 사용한 실행 방식**:

```json
{
  "mcpServers": {
    "Webhook Server": {
      "command": "uv",
      "args": [
        "run",
        "python",
        "/absolute/path/to/dante@webhook_trigger/main.py"
      ],
      "env": {
        "DEBUG": "true"
      }
    }
  }
}
```

5. **uv와 가상환경을 사용한 실행 방식 (권장)**:

```json
{
  "mcpServers": {
    "Webhook Server": {
      "command": "/bin/bash",
      "args": [
        "-c",
        "cd /absolute/path/to/dante@webhook_trigger && uv run python main.py"
      ],
      "env": {
        "DEBUG": "true"
      }
    }
  }
}
```

6. **설정 파일 구성 요소**:
   - `mcpServers`: MCP 서버 목록이 포함된 객체
   - `webhook-server`: 서버의 식별자(이름)로, Claude에 표시됩니다
   - `command`: 서버를 실행할 명령어 (가상환경의 Python 경로 사용)
   - `args`: 명령어에 전달할 인수 배열
   - `env`: 환경 변수 설정 (선택 사항)

7. **macOS에서 경로 설정 주의사항**:
   - 절대 경로 사용을 권장합니다
   - 가상환경의 Python 경로를 정확히 지정해야 합니다
   - 홈 디렉토리(~)는 명시적으로 전체 경로로 변경해야 합니다
   - 경로에 공백이 있는 경우 적절하게 처리해야 합니다

8. **설정 적용**:
   - 설정 파일을 저장한 후 Claude Desktop을 재시작합니다
   - Tools 섹션에서 웹훅 서버가 표시되는지 확인합니다

### 설치 확인 및 테스트

1. Claude Desktop에서 새 대화를 시작합니다.

2. 다음과 같은 프롬프트를 입력하여 MCP 서버가 제대로 작동하는지 테스트합니다:

```
"Webhook Server"를 사용하여 https://httpbin.org/get에 GET 요청을 보내줄래?
```

3. Claude가 MCP 서버의 도구를 사용하여 요청을 처리하고 결과를 반환하는지 확인합니다.

### 문제 해결

- **서버가 보이지 않는 경우**:

  ```bash
  fastmcp list
  ```

  명령어로 설치된 서버 목록을 확인하고, 필요한 경우 재설치합니다.

- **Claude가 도구를 인식하지 못하는 경우**:
  Claude Desktop을 재시작하고, 설정에서 도구가 활성화되어 있는지 확인합니다.

- **macOS에서 uv 관련 오류**:

  ```bash
  brew install uv
  ```

  를 실행하여 uv가 시스템 경로에 올바르게 설치되었는지 확인합니다.

- **config.json 설정 문제**:
  - 경로가 올바른지 확인합니다
  - JSON 형식에 오류가 없는지 확인합니다
  - 명령어와 실행 파일의 권한이 적절한지 확인합니다

- **Python 가상환경 문제**:
  - 가상환경의 Python 경로가 올바른지 확인합니다
  - 필요한 패키지가 가상환경에 설치되어 있는지 확인합니다
  - 쉘 스크립트를 통한 실행 방식을 사용해보세요

## MCP 서버 사용 방법

### 1. MCP 개발 인터페이스 (Inspector) 사용

개발 모드에서는 웹 인터페이스를 통해 다음 작업을 수행할 수 있습니다:

- 도구 목록 확인
- 도구 테스트
- 로그 확인

### 2. Claude에서 사용

Claude Desktop에 설치한 후 다음과 같이 자연어로 요청할 수 있습니다:

#### GET 요청 예시

```
https://example.com/api에 GET 요청을 보내줘.
```

```
다음 정보로 GET 웹훅을 보내줘:
- URL: https://api.example.com/users
- 헤더: {"Accept": "application/json"}
- 인증 토큰: "Bearer token123"
```

#### POST 요청 예시

```
https://example.com/api에 {"name": "테스트"}라는 데이터를 POST로 보내줘.
```

```
다음 정보로 POST 웹훅을 보내줘:
- URL: https://api.example.com/webhook
- 헤더: {"Content-Type": "application/json", "X-API-Key": "key123"}
- 페이로드: {"name": "테스트", "value": 123}
- 인증 토큰: "Bearer token456"
```

#### 커스텀 HTTP 메서드 예시

```
https://example.com/api/user/1에 DELETE 요청을 보내줘.
```

```
다음 정보로 PUT 요청을 보내줘:
- URL: https://api.example.com/users/123
- 페이로드: {"name": "수정된 이름", "email": "new@example.com"}
- 인증: "Bearer my-token"
```

## 사용 가능한 MCP 도구

### 1. `send_get_webhook`

GET 방식으로 웹훅을 전송합니다.

매개변수:

- `url`: 호출할 웹훅 URL (필수)
- `auth_token`: 인증에 사용할 토큰 (선택 사항)
- `custom_headers`: 추가 요청 헤더 (선택 사항)

### 2. `send_post_webhook`

POST 방식으로 웹훅을 전송합니다.

매개변수:

- `url`: 호출할 웹훅 URL (필수)
- `payload`: 전송할 JSON 페이로드 (선택 사항)
- `headers`: 요청 헤더 (선택 사항)
- `auth_token`: 인증에 사용할 토큰 (선택 사항)

### 3. `send_custom_webhook`

사용자 지정 HTTP 메서드로 웹훅을 전송합니다.

매개변수:

- `method`: HTTP 메서드 (GET, POST, PUT, DELETE, PATCH 등) (필수)
- `url`: 호출할 웹훅 URL (필수)
- `payload`: 전송할 JSON 페이로드 (선택 사항)
- `headers`: 요청 헤더 (선택 사항)
- `auth_token`: 인증에 사용할 토큰 (선택 사항)

## 프로젝트 구조

```
dante@webhook_trigger/
├── main.py                # MCP 서버 및 도구 정의
├── requirements.txt       # 종속성
├── run.sh                 # 실행 스크립트
├── mcp_run.sh             # MCP 서버 실행 스크립트 
└── .env                   # 환경 변수
```
