# MCP Playwright Test

基于 Model Context Protocol (MCP)的 Playwright 测试自动化服务器。

## 功能特点

- 自动获取项目代码(支持 Git 仓库或本地项目)
- 使用 Playwright 设置测试环境
- 基于需求生成测试用例
- 执行 UI 和 API 测试并生成详细报告
- 捕获并分析网络请求和控制台日志

## 快速开始

### 安装

```bash
# 使用npm
npm install mcp-playwright-test

# 或使用yarn
yarn add mcp-playwright-test

# 或使用pnpm
pnpm add mcp-playwright-test
```

### 配置环境变量

```bash
# 用于生成测试用例的Anthropic API密钥
export ANTHROPIC_API_KEY=your_api_key_here

# 可选：服务器端口(默认8931)
export MCP_PORT=8931
```

### 启动服务器

```bash
# 使用npm脚本启动
npm run start

# 或者直接运行
npx ts-node src/test-mcp.ts
```

## 配置文件说明

MCP Playwright Test 支持通过`.playwright-mcp.json`文件进行配置，特别适合在 Claude Desktop 和 Cursor 等 AI 工具环境中使用。

### 配置文件示例

```json
{
  "mcpServers": {
    "mcp-playwright-test": {
      "command": "npx",
      "args": ["-y", "mcp-playwright-test"],
      "env": {
        "CODE_PATH": ".",
        "SIMPLE_GIT_PATH": "git",
        "SIMPLE_GIT_BRANCH": "main",
        "SIMPLE_GIT_DEPTH": 1,
        "SIMPLE_GIT_USERNAME": "username",
        "SIMPLE_GIT_PASSWORD": "password",
        "API_URL": "http://localhost:3000",
        "API_KEY": "your-api-key"
      }
    }
  }
}
```

### Claude Desktop 和 Cursor 配置

1. **在 Claude Desktop 中使用**:

   - 在项目根目录创建`.playwright-mcp.json`文件
   - 在 Claude Desktop 设置中添加服务器配置指向该文件
   - 使用"自定义 MCP 服务器"选项，选择"mcp-server-alipay"

2. **在 Cursor 中使用**:
   - 确保项目中存在`.playwright-mcp.json`文件
   - 在 Cursor 的 MCP 配置中选择"使用本地 MCP 服务器"
   - 指定服务器名称为"mcp-server-alipay"

### 环境变量说明

> **注意**：Git 相关参数和 CODE_PATH 参数为二选一关系，要么使用 Git 相关参数从远程仓库克隆代码，要么使用 CODE_PATH 指定本地已有的代码路径。

> **提示**：API 相关配置（API_URL 和 API_KEY）是可选的，仅在需要进行 API 测试时才需要配置。如果您只使用 UI 测试功能，可以省略这些参数。

> **灵活使用**：MCP Playwright Test 支持三种使用模式：1) 仅进行 UI 测试；2) 仅进行 API 测试；3) 同时进行 UI 和 API 测试。您可以根据项目需求选择适合的测试模式，并只配置相应的环境变量。

| 变量名              | 说明               | 默认值                | 使用场景     |
| ------------------- | ------------------ | --------------------- | ------------ |
| CODE_PATH           | 本地代码路径       | .                     | 使用本地项目 |
| SIMPLE_GIT_PATH     | Git 可执行文件路径 | git                   | 克隆远程仓库 |
| SIMPLE_GIT_BRANCH   | 克隆时使用的分支   | -                     | 克隆远程仓库 |
| SIMPLE_GIT_DEPTH    | 克隆深度           | -                     | 克隆远程仓库 |
| SIMPLE_GIT_USERNAME | Git 用户名         | -                     | 克隆远程仓库 |
| SIMPLE_GIT_PASSWORD | Git 密码或令牌     | -                     | 克隆远程仓库 |
| API_URL             | API 基础 URL       | http://localhost:3000 | API 测试     |
| API_KEY             | API 密钥           | -                     | API 测试     |
| BROWSER_TYPE        | 浏览器类型         | chromium              | UI 测试      |
| BROWSER_HEADLESS    | 是否使用无头模式   | true                  | UI 测试      |
| TEST_STORAGE_DIR    | 测试结果存储目录   | ./test-results        | 通用         |

## 可用工具

MCP 服务器提供以下工具：

- `clone-repository`: 克隆 Git 仓库进行测试
- `use-local-project`: 使用本地项目进行测试
- `launch-browser`: 启动浏览器进行测试
- `generate-test-cases`: 从文本需求生成测试用例
- `generate-tests-from-spec`: 从 API 规范文档自动生成 API 测试用例，支持多种格式
- `execute-ui-tests`: 执行 UI 测试套件
- `execute-api-tests`: 执行 API 测试套件

## 支持的 API 规范格式

MCP Playwright Test 支持多种 API 规范文档格式，可自动检测并解析：

- **OpenAPI 3.0**: 最新的 OpenAPI 规范格式，广泛应用于 API 文档
- **Swagger 2.0**: 传统的 API 文档格式，兼容大量现有系统
- **Apifox**: 支持 Apifox 导出的 API 文档格式
- **自动检测**: 可以自动分析文档格式并使用最合适的解析器

生成测试用例时，可通过`format`参数指定格式，或使用`auto`让系统自动检测。

## 可用资源

MCP 服务器提供以下资源：

- `reports`: 获取测试执行报告
- `test-cases`: 检索测试用例

## 开发

### 安装依赖

```bash
pnpm install
```

### 构建项目

```bash
pnpm build
```

### 运行测试

```bash
pnpm test
```

## 许可证

MIT
