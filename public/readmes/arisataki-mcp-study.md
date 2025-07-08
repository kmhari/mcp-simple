# MCP 计算器服务器

这是一个简单的 MCP (Model Context Protocol) 服务器示例，提供基本的数字加法功能。

## 功能

该服务器提供一个工具 `add_numbers`，可以将两个数字相加并返回结果。

## 安装

```bash
# 克隆仓库后，安装依赖
npm install

# 构建项目
npm run build
```

## 使用方法

### 本地直接运行

```bash
npm start
```

### MCP API 说明

本项目使用 MCP SDK 的高级 API 实现：

- 使用 `McpServer` 类创建 MCP 服务器
- 通过 `tool()` 方法注册工具
- 简洁易读的代码风格

### ResourceTemplate

`ResourceTemplate` 是 MCP SDK 提供的一个重要功能，用于定义动态资源。通过它，你可以：

1. **创建参数化资源**: 使用占位符定义资源 URI 模板
2. **处理动态路径**: 自动解析 URI 参数并传递给处理函数
3. **支持资源列表**: 可以配置资源是否支持列表操作

例如，你可以这样添加一个带有参数的资源：

```javascript
// 添加一个动态的问候资源
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [
      {
        uri: uri.href,
        text: `你好，${name}！`,
      },
    ],
  })
);
```

使用这个资源时，客户端可以请求 `greeting://张三`，服务器会返回 "你好，张三！"。

### 在 Claude 桌面版中配置

1. 打开 Claude 桌面客户端
2. 进入"开发者 > 编辑配置"
3. 在 `claude_desktop_config.json` 文件中添加：

```json
{
  "mcpServers": {
    "calculator-mcp": {
      "command": "node",
      "args": ["/完整路径/mcp-demo/build/index.js"]
    }
  }
}
```

注意：请将 `/完整路径/mcp-demo/build/index.js` 替换为实际的文件路径。

### 与 Claude 交互

启用 MCP 服务器后，可以在 Claude 中使用加法功能，例如：

> 请帮我计算 42 + 17 等于多少？

Claude 将使用 MCP 服务器提供的工具进行计算并提供结果。

## 调试

可以使用 MCP inspector 工具进行调试：

```bash
npm run inspect
```

# MCP (Model Context Protocol) 全面学习指南

本指南将帮助你系统地学习和掌握 Model Context Protocol (MCP)，一种为大型语言模型 (LLM) 提供上下文和功能的标准协议。

## 目录

1. [MCP 基础概念](#mcp-基础概念)
2. [环境准备](#环境准备)
3. [基本架构组件](#基本架构组件)
   - [Server (服务器)](#server-服务器)
   - [Tools (工具)](#tools-工具)
   - [Resources (资源)](#resources-资源)
   - [Prompts (提示)](#prompts-提示)
4. [实践学习路径](#实践学习路径)
5. [进阶开发技巧](#进阶开发技巧)
6. [调试和测试](#调试和测试)
7. [常见��题解答](#常见问题解答)

## MCP 基础概念

MCP (Model Context Protocol) 是一种开放标准，用于连接大型语言模型 (如 Claude) 与各种数据源和功能。它使 LLM 能够：

- 访问本地文件和数据
- 连接数据库
- 执行计算任务
- 调用外部 API
- 使用特定领域的工具

MCP 服务器充当桥梁，为 LLM 提供受控的数据访问和功能执行能力。

## 环境准备

开始学习 MCP 前，确保已准备好以下环境：

```bash
# 已安装 Node.js 和 npm

# 项目初始化
npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node ts-node

# 安装 MCP Inspector（调试工具）
npm install -g @modelcontextprotocol/inspector
```

## 基本架构组件

### Server (服务器)

MCP 服务器是整个架构的中心，负责处理请求并提供功能：

```typescript
// 创建 MCP 服务器
const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
  description: "我的 MCP 服务器",
});

// 连接到传输层
const transport = new StdioServerTransport();
await server.connect(transport);
```

### Tools (工具)

工具允许 LLM 执行操作，如计算、API 调用等：

```typescript
// 注册一个简单计算工具
server.tool(
  "add",
  {
    a: z.number().describe("第一个数字"),
    b: z.number().describe("第二个数字"),
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: `${a} + ${b} = ${a + b}` }],
  })
);
```

**学习要点**：

- 工具名称应该简洁明了
- 使用 Zod 验证输入参数
- 正确处理错误情况
- 返回格式化的结果

### Resources (资源)

资源为 LLM 提供数据和信息：

```typescript
// 静态资源
server.resource("welcome-message", "message://welcome", async (uri) => ({
  contents: [
    {
      uri: uri.href,
      mimeType: "text/plain",
      text: "欢迎使用我的 MCP 服务器！",
    },
  ],
}));

// 参数化动态资源
server.resource(
  "user-profile",
  new ResourceTemplate("user://{userId}", { list: undefined }),
  async (uri, { userId }) => ({
    contents: [
      {
        uri: uri.href,
        mimeType: "application/json",
        text: JSON.stringify(await getUserProfile(userId)),
      },
    ],
  })
);
```

**学习要点**：

- 静态 vs 动态资源
- 资源 URI 设计
- 支持 list 操作的资源
- 不同 MIME 类型的资源

### Prompts (提示)

提示是预定义的消息模板，帮助 LLM 生成特定格式的响应：

```typescript
// 创建简单提示
server.prompt(
  "greet-user",
  {
    name: z.string().describe("用户名称"),
  },
  ({ name }) => ({
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `你好，${name}！请简要��我介绍。`,
        },
      },
    ],
  })
);
```

**学习要点**：

- 提示的结构和参数
- 用户消息的设计
- 提示模板的重用

## 实践学习路径

我们准备了两个实例供你学习：

### 基础示例 (index.ts)

一个简单的计算器服务器，实现基本的加法功能。

运行方式：

```bash
npm start
```

调试方式：

```bash
npm run inspect
```

### 全功能示例 (comprehensive-mcp-server.ts)

一个包含多种工具、资源和提示的全面 MCP 服务器。

运行方式：

```bash
npm run start:comprehensive
```

调试方式：

```bash
npm run inspect:comprehensive
```

### 学习步骤

1. **基础阶段**：运行并理解基础示例

   - 分析代码结构
   - 通过 MCP Inspector 测试加法功能
   - 尝试修改参数和返回值

2. **进阶阶段**：探索全功能示例

   - 研究不同类型的工具实现
   - 了解各种资源定义方式
   - 测试提示模板的效果

3. **实践阶段**：
   - 添加自己的工具和资源
   - 修改现有功能的行为
   - 在 Claude 中测试你的服务器

## 进阶开发技巧

### 数据类型和验证

使用 TypeScript 接口和 Zod 模式确保类型安全：

```typescript
interface UserData {
  id: string;
  name: string;
  email: string;
}

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});
```

### 错误处理

优雅地处理错误情况：

```typescript
try {
  // 操作代码
} catch (error) {
  return {
    isError: true,
    content: [
      {
        type: "text",
        text: `操作失败: ${
          error instanceof Error ? error.message : "未知错误"
        }`,
      },
    ],
  };
}
```

### 动态资源列表

创建支持列表操作的资源：

```typescript
server.resource(
  "documents",
  new ResourceTemplate("docs://{category}", {
    list: async () => ({
      resources: [
        { uri: "docs://tech", name: "技术文档" },
        { uri: "docs://user", name: "用户手册" },
      ],
    }),
  }),
  async (uri, { category }) => ({
    /* 处理特定资源 */
  })
);
```

## 调试和测试

### 使用 MCP Inspector

MCP Inspector 是一个强大的调试工具：

- 查看所有注册的工具、资源和提示
- 测试工具的执行
- 查看资源的内容
- 测试提示模板

使用方法：

```bash
npx @modelcontextprotocol/inspector node ./path/to/server.js
```

### 集成到 Claude

1. 编辑 Claude 桌面客户端配置：

   ```json
   {
     "mcpServers": {
       "my-server": {
         "command": "node",
         "args": ["/完整路径/到你的/build/文件.js"]
       }
     }
   }
   ```

2. 重启 Claude 客户端
3. 启用 MCP 插件
4. 开始与 Claude 交互，��用你的 MCP 功能

## 常见问题解答

### Q: MCP 与普通 API 有什么区别？

A: MCP 专为 LLM 交互设计，提供了标准化的资源、工具和提示抽象，更容易集成到 AI 对话流程中。

### Q: 如何处理大型数据？

A: 考虑分页或流式传输大型数据，或提供摘要信息让 LLM 决定是否需要完整数据。

### Q: 如何保证 MCP 服务器的安全？

A: 限制敏感操作，验证所有输入，实现适当的认证和授权机制。

### Q: 最新版本的 SDK 有哪些变化？

A: SDK 不断发展，从 `Server` API 向更简洁的 `McpServer` API 迁移。参考官方文档获取最新信息。

---

通过遵循本指南并探索提供的示例，你将能够全面理解 MCP 架构并开发自己的 MCP 服务器。祝你学习愉快！
