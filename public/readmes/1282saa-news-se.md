# 서울경제신문 스타일북 MCP 서버

서울경제신문 스타일북 데이터를 AI 모델에 제공하는 Model Context Protocol (MCP) 서버입니다.

## 특징

- 스타일북 섹션 및 문서 검색 기능
- 파일 경로 기반 문서 접근
- 키워드 기반 검색 (페이지네이션 지원)
- 스마트 폴백 메커니즘 (유사한 문서/키워드 추천)
- API 키 인증 (선택적으로 비활성화 가능 - MVP 모드)

## 설치 방법

### 소스코드에서 설치

```bash
git clone https://github.com/1282saa/news_se.git
cd news_se
pip install -e .
```

### pip를 통한 설치 (향후 지원 예정)

```bash
pip install stylebook-mcp-server
```

## 사용 방법

### 서버 실행

#### MVP 모드 (API 키 인증 없음)

```bash
# 명령행 옵션으로 인증 비활성화
python -m stylebook_mcp_server.server --no-auth

# 또는 환경 변수로 빈 API 키 설정
API_KEY="" python -m stylebook_mcp_server.server
```

#### API 키 인증 사용

```bash
# 환경 변수로 API 키 설정
API_KEY="your-api-key" python -m stylebook_mcp_server.server
```

### 명령행 옵션

```
--host HOST           서버 호스트 (기본값: 0.0.0.0)
--port PORT           서버 포트 (기본값: 8000)
--tools TOOLS         활성화할 도구 목록 (쉼표로 구분)
--list-tools          사용 가능한 도구 목록 표시
--metadata METADATA   메타데이터 파일 경로 (기본값: stylebook_metadata.json)
--stylebook-dir DIR   스타일북 디렉토리 경로 (기본값: 스타일북)
--no-auth             API 키 인증을 비활성화 (MVP 모드)
```

## Claude Desktop에서 설정

### 로컬 실행 (모듈 방식 - 권장)

```json
{
  "mcpServers": {
    "stylebook-server": {
      "command": "/절대/경로/python3", // 예: "/usr/bin/python3" 또는 "/Users/username/anaconda3/bin/python3"
      "args": ["-m", "stylebook_mcp_server.server", "--no-auth"]
    }
  }
}
```

### 로컬 실행 (상대 경로)

```json
{
  "mcpServers": {
    "stylebook-server": {
      "command": "python3",
      "args": ["-m", "stylebook_mcp_server.server", "--no-auth"]
    }
  }
}
```

### Docker 실행

```json
{
  "mcpServers": {
    "stylebook-server": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-p",
        "8000:8000",
        "stylebook-mcp-server",
        "--no-auth"
      ]
    }
  }
}
```

### URL 기반 접근 (인증 사용 시)

```json
{
  "mcpServers": {
    "stylebook-server": {
      "url": "https://your-server-url/rpc",
      "headers": {
        "Authorization": "Bearer your-api-key"
      }
    }
  }
}
```

### URL 기반 접근 (MVP 모드 - 인증 없음)

```json
{
  "mcpServers": {
    "stylebook-server": {
      "url": "https://your-server-url/rpc"
    }
  }
}
```

### 문제 해결

Claude Desktop에서 MCP 서버 연결 시 문제가 발생하는 경우:

1. Python 경로가 올바른지 확인하세요:

   ```bash
   which python3  # 실제 Python 경로 확인
   ```

2. 패키지가 설치되어 있는지 확인하세요:

   ```bash
   pip list | grep stylebook-mcp-server
   ```

3. 경로에 공백이나 한글이 포함된 경우 모듈 방식으로 실행하세요:

   ```json
   {
     "command": "/절대/경로/python3",
     "args": ["-m", "stylebook_mcp_server.server", "--no-auth"]
   }
   ```

4. **PATH 환경 변수 설정 (권장):**

   ```json
   {
     "mcpServers": {
       "stylebook-server": {
         "command": "/Users/username/anaconda3/bin/python3",
         "args": ["-m", "stylebook_mcp_server.server", "--no-auth"],
         "env": {
           "PATH": "/Users/username/anaconda3/bin:/usr/local/bin:/usr/bin:/bin"
         }
       }
     }
   }
   ```

5. **`ENOENT` 오류 해결:**
   MCP 서버가 "spawn python ENOENT" 오류를 발생시키는 경우, Python 실행 파일의 절대 경로가 올바른지 확인하고 환경 변수를 명시적으로 설정하세요. Claude Desktop은 상대 경로를 처리하는 데 문제가 있을 수 있으므로 항상 절대 경로를 사용하는 것이 좋습니다.

6. **`ModuleNotFoundError` ��결:**
   'stylebook_mcp_server' 모듈을 찾을 수 없는 오류가 발생하는 경우, 다음 두 가지 방법 중 하나를 선택하세요:

   a) 패키지 설치하기 (권장):

   ```bash
   cd "프로젝트_디렉토리"
   pip install -e .
   ```

   b) 직접 파일 경로 사용하기:

   ```json
   {
     "mcpServers": {
       "stylebook-server": {
         "command": "/절대/경로/python3",
         "args": [
           "/절대/경로/MCP서버개발/stylebook_mcp_server/server.py",
           "--no-auth"
         ]
       }
     }
   }
   ```

## API 엔드포인트

### 메인 JSON-RPC 엔드포인트

- `/rpc` - JSON-RPC 2.0 엔드포인트

### 기타 엔드포인트

- `/` - 서버 정보
- `/docs` - API 문서 (Swagger UI)

## 사용 가능한 도구

- `get_sections` - 스타일북 섹션 목록 제공
- `get_document` - 특정 문서 조회
- `search_documents` - 키워드 기반 검색
- `get_file_by_path` - 파일 경로로 문서 조회

## 개발 정보

### 개발 환경 설정

```bash
# 개발 의존성 설치
pip install -e ".[dev]"

# 테스트 실행
pytest
```

### 도커 이미지 빌드

```bash
docker build -t stylebook-mcp-server .
```

## 라이선스

MIT License
