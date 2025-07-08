
 # 📦 pr-creator-mcp
 
 GitHub Pull Request 생성을 자동화하는 Cursor, Claude 등과 연동 가능한 MCP 서버입니다.  
 PR 제목, 설명, 체크리스트, 영향 범위를 자동으로 생성하고 GitHub에 푸시합니다.
 
 ## 🚀 설치 방법
 
 ### 1. 저장소 클론 및 디렉토리 이동
 
 ```bash
 git clone https://github.com/urijan44/pr_creator_mcp.git
 cd pr_creator_mcp
 ```
 
 ### 2. 의존성 설치
 
 ```bash
 npm install
 ```
 
 ### 3. MCP 등록
 
 ```bash
 npm run setup
 ```
 
 > 이 스크립트는 `.cursor/mcp.json` 파일을 생성하여 MCP 서버를 등록하고, GitHub 환경변수를 포함한 실행 설정을 자동으로 구성합니다.
 
 ## ⚙️ 환경 변수 설정 (`.env`)
 
 ### 1. `.env` 파일 생성
 
 ```bash
 cp .env.example .env
 ```
 
 ### 2. 내용 작성
 
 ```dotenv
 GITHUB_TOKEN=ghp_your_token_here
 GITHUB_API_BASE=https://api.github.com
 GITHUB_WEB_BASE=https://github.com
 ```
 
 > GitHub Enterprise를 사용하는 경우 `API_BASE`와 `WEB_BASE`를 변경해 주세요.
 
 ## 🛠 제공하는 MCP Tools
 
 - `pr-creator`: Git diff, 커밋 로그를 기반으로 PR 제목과 설명 자동 생성
 - `pr-submitter`: PR을 GitHub에 생성하거나, 이미 존재하면 업데이트
 - `get-reviewers`: 현재 레포에서 리뷰어 가능한 사용자 목록 가져오기
 
 ## 🧪 테스트
 
 MCP가 정상적으로 등록되었는지 확인하려면 `.cursor/mcp.json` 파일에 다음과 같은 내용이 포함되어 있어야 합니다:
 
 ```json
 "mcpServers": {
   "pr-write": {
     "command": "node",
     "args": ["/your/path/to/build/index.js"],
     "env": {
       "GITHUB_TOKEN": "...",
       ...
     }
   }
 }
 ```
 
 ## 📂 로그 위치
 
 모든 로그는 다음 경로에 저장됩니다:
 
 ```bash
 ~/.mcp/logs/
 ```