# CRIC物业AI MCP Server

--------------
[![NPM Version](https://img.shields.io/npm/v/%40wuye-ai%2Fmcp-server-wuye-ai)](https://www.npmjs.com/package/@wuye-ai/mcp-server-wuye-ai)
[![zh-CN](https://img.shields.io/badge/lang-zh--CN-red.svg)](https://github.com/wuye-ai/mcp-server-wuye-ai/blob/master/README.md)
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/wuye-ai/mcp-server-wuye-ai/blob/master/README.en.md)
[![Apply For Access Token](https://img.shields.io/badge/%E7%94%B3%E8%AF%B7%E5%BC%80%E9%80%9A-gray?label=%F0%9F%91%8B)](https://wuye-ai.cricbigdata.com/mcp)
[![Practical Guide](https://img.shields.io/badge/%E5%AE%9E%E8%B7%B5%E6%8C%87%E5%8D%97-gray?label=%F0%9F%A7%AD)](https://wuye-ai.cricbigdata.com/mcp)

已上架 | 
[<img src="https://static-production.npmjs.com/b0f1a8318363185cc2ea6a40ac23eeb2.png" width="12" height="12" alt="NPM Logo"> **NPM**](https://www.npmjs.com/package/@wuye-ai/mcp-server-wuye-ai) | 
[<img src="https://mcp.so/favicon.ico" width="12" height="12" alt="MCP.so Logo"> **MCP.so**](https://mcp.so/server/CRIC%E7%89%A9%E4%B8%9AAI/CRIC) |
[<img src="https://mcpservers.org/icon.png" width="12" height="12" alt="MCPServers.org Logo"> **MCPServers.org**](https://mcpservers.org/servers/wuye-ai/mcp-server-wuye-ai) |
[<img src="https://tcb.cloud.tencent.com/favicon.ico" width="12" height="12" alt="腾讯云开发 Logo"> **腾讯云开发**](https://tcb.cloud.tencent.com/mcp-server/mcp-server-wuye-ai) |
[<img src="https://g.alicdn.com/sail-web/maas/2.8.5/favicon/128.ico" width="12" height="12" alt="ModelScope Logo"> **ModelScope**](https://modelscope.cn/mcp/servers/@wuye-ai/mcp-server-wuye-ai) |
[<img src="https://gw.alicdn.com/imgextra/i4/O1CN01vVn7g32134zNZEeAR_!!6000000006928-55-tps-24-24.svg" width="12" height="12" alt="阿里云百炼 Logo"> **阿里云百炼**](https://bailian.console.aliyun.com/?tab=mcp#/mcp-market/detail/cric-wuye-ai) |
[<img src="https://agi-dev-platform-web.cdn.bcebos.com/ai_apaas/favicon.ico" width="12" height="12" alt="百度智能云 Logo"> **百度智能云千帆**](https://console.bce.baidu.com/ai_apaas/mcpServerCenter/mcp_t_cric_ai/detail) |
[<img src="https://gips3.baidu.com/it/u=1551671786,626435656&fm=3028&app=3028&f=PNG&fmt=auto&q=100&size=f300_315" width="12" height="12" alt="百度搜索开放平台 Logo"> **百度搜索开放平台**](https://sai.baidu.com/server/CRIC?id=DZy6eHdoKx2v3gfThymJXf)

（更多MCP平台陆续上架中……）

--------------

## 简介

**CRIC物业AI** 是 [克而瑞](http://www.cricchina.com/) 专为物业行业打造的智能 AI 助理，于2025年4月25日 [正式发布](https://mp.weixin.qq.com/s/GC4V1M6N199Ay2f3kZan_Q)。

**CRIC物业AI** 通过行业知识库建设，结合多模态大模型 + RAG 技术，集成五大核心能力模块：**行业研究**、**法律法规**、**社区治理**、**项目经营**、**文案写作**，并在行业垂类知识基础上，拓展了 **资讯舆情** 和 **人才培训** 两大智能体。

## 核心能力

克而瑞通过三个能力来构建其自身在物业AI合作领域优势：

- **数据资产转化能力：** 将10亿字行业语料、TB级多模态数据转化为物业行业的高质量数据集，并构建了一套行业数据质量评估体系，保障准确率和可信度；
- **场景穿透能力：** 聚焦20+物业行业垂直业务场景，定向选用对应领域知识库，精准匹配；
- **生态进化能力：** 通过每日实时监测超过500+可信资讯和数据来源，处理10万+实时数据的自更新系统，在政策预警、商机挖掘和招投标分析等环节实现准确率突破90%，形成行业AI知识中枢的持续升级。

## MCP Server 功能

**CRIC物业AI MCP Server** 是一个基于 [Model Context Protocol](https://modelcontextprotocol.io/) 的服务端实现，基于 **CRIC物业AI** 平台的部分原子能力，目前版本提供了以下三大功能模块：

- **资讯日报：** 获取物业行业资讯日报。
- **知识库：** 搜索物业行业专属知识库。
- **智能问答：** 向 CRIC物业AI 提问获得答案，或者让 CRIC物业AI 帮助分析物业行业问题的场景。

具体工具（Tool）定义，请参考 [工具定义配置](./TOOLS.md) 文档。更多能力即将推出，敬请期待。

## CRIC物业AI 知识库

使用 CRIC 物业 AI MCP Server，可以查询克而瑞建设的物业行业垂类高质量知识库，获取用户问题相关的知识文本供 AI 参考。

目前可供开通的知识库包括：**法律法规、物业企业信息、克而瑞榜单、优秀物业项目服务案例、物业行业研究、物业项目应急响应、物业项目综合管理、物业项目客诉处理、物业行业法律判例、非住宅类物业研究、物业项目管理案例** 等。

## 获取 Access Token

您需要先获取 **CRIC物业AI Access Token** 才能使用 CRIC物业AI MCP Server 的功能。请访问我们的网站申请：[申请开通体验 CRIC物业AI MCP Server](https://wuye-ai.cricbigdata.com/mcp)。

## 快速开始

### 1. SSE 方式（http）

#### 1.1 运行

您可以自行运行一个 MCP Server 并启用 HTTP 模式，或者直接使用我们提供的 URL。

##### A. 自行运行：

```bash
MODE=http PORT=3011 npx -y @wuye-ai/mcp-server-wuye-ai
```

运行成功后，MCP Server URL 为 `http://localhost:3011/sse/mcp` 。

##### B. 使用官方：

或者您也可以直接使用我们的官方的 MCP Server URL：

- 测试环境：`https://mcp.wuye-ai-staging.cricbigdata.com/sse/mcp`
- 生产环境：`https://mcp.wuye-ai.cricbigdata.com/sse/mcp`

#### 1.2 测试

您可以使用 MCP Inspector 或第三方工具连接 SSE 方式的 MCP Server。

##### MCP Inspector：

服务运行成功后，您可以运行 [MCP Inspector](https://github.com/modelcontextprotocol/inspector) 来查看并测试服务是否正常运行。

```bash
npx @modelcontextprotocol/inspector
```

MCP Inspector 启动后，用浏览器打开其 Web UI（默认为：http://127.0.0.1:6274/ ）。并按照如下步骤配置连接：

1. 在界面左侧设置 Transport Type 为 `SSE`，URL 为上一步获得的 MCP Server URL。
2. 展开 Authentication 面板，设置 Header Name 为 `Authorization` ，Bearer Token 为您的 **CRIC物业AI Access Token**。
3. 点击 Connect 按钮，连接成功后，左侧会显示当前连接的状态。

此时您就可以操作 MCP Inspector 测试 CRIC物业AI 的 MCP Server 了。具体使用方法您可以参考 [MCP Inspector 中文文档](https://mcp-docs.cn/docs/tools/inspector) 。

##### 第三方工具：

通过第三方工具使用 SSE 方式接入时，您需要通过 `Authorization` **HTTP 头** 指定 Access Token。例如，[Cline](https://cline.bot/) 设置文件：

```json
{
  "mcpServers": {
    "CRIC物业AI": {
      "transportType": "sse",
      "url": "https://mcp.wuye-ai.cricbigdata.com/sse/mcp",
      "headers": {
        "Authorization": "Bearer {{您的 CRIC物业AI Access Token}}"
      }
    }
  }
}
```

请注意，当前部分使用 [@modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) 的工具 [其 ***HTTP 头*** 设置可能无法正确生效](https://github.com/modelcontextprotocol/typescript-sdk/issues/317)，因此建议使用 MCP Inspector 来测试。或者，作为一种临时措施，我们也支持在 URL 中使用 Query 方式指定 Access Token，例如：

```json
{
  "mcpServers": {
    "CRIC物业AI": {
      "transportType": "sse",
      "url": "https://mcp.wuye-ai.cricbigdata.com/sse/mcp?token={{您的 CRIC物业AI Access Token}}"
    }
  }
}
```

### 2. Stdio 方式

#### 2.1 运行

我们也支持 stdio 方式运行 MCP Server。命令如下：

```bash
CRIC_WUYE_AI_ACCESS_TOKEN={{您的 CRIC物业AI Access Token}} npx -y @wuye-ai/mcp-server-wuye-ai
```

#### 2.2 测试

您可以使用第三方工具或者 MCP Inspector 来连接 Stdio 方式的 MCP Server。请注意，Stdio 方式下一般无需用户手动运行 MCP Server，通常是由第三方工具自动运行。

##### MCP Inspector

在 MCP Inspector 中，您也可以选择 Stdio 方式接入。具体步骤如下：

1. 在界面左侧设置 Transport Type 为 `Stdio`，Command 为 `npx`，Arguments 为 `-y @wuye-ai/mcp-server-wuye-ai`。
2. 展开 Environment Variables 面板，添加或设置 `CRIC_WUYE_AI_ACCESS_TOKEN` 为您的 **CRIC物业AI Access Token**。
3. 点击 Connect 按钮，MCP Inspector 会自动运行命令启动 MCP Server 并连接。连接成功后，左侧会显示当前连接的状态。

此时您就可以操作 MCP Inspector 测试 CRIC物业AI 的 MCP Server 了。

##### 第三方工具

通过第三方工具使用 Stdio 方式接入时，如果您需要指定 Access Token，请通过环境变量 `CRIC_WUYE_AI_ACCESS_TOKEN` 指定。例如，Cline 设置文件：

```json
{
  "mcpServers": {
    "CRIC物业AI": {
      "transportType": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@wuye-ai/mcp-server-wuye-ai"
      ],
      "env": {
        "CRIC_WUYE_AI_ACCESS_TOKEN": "{{您的 CRIC物业AI Access Token}}"
      }
    }
  }
}
```

## 实践指南

CRIC物业AI MCP Server 支持各类智能体平台接入，如钉钉AI助理等。您可以参考 [实践指南](https://alidocs.dingtalk.com/i/p/nb9XJDP07QqPDGyA/docs/mweZ92PV6My4ebxdHdb9oQBYWxEKBD6p) 进行操作体验。

## 可选配置

您可以通过环境变量或 URL Query（SSE方式下） 来配置 CRIC物业AI MCP Server 的运行方式。以下是可用的配置项：

| 环境变量参数名                          | URL Query 参数名 | 默认值                                      | 描述                                                                                                                                                                            |
|----------------------------------|---------------|------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `MODE`                           | *不支持*         | `stdio`                                  | 运行模式，支持 `stdio` 和 `http` 两种模式。                                                                                                                                                |
| `HOSTNAME`                       | *不支持*         | `0.0.0.0`                                | HTTP 绑定主机名，仅在 `http` 模式下有效。`0.0.0.0`即为绑定到本机所有IP地址。                                                                                                                            |
| `PORT`                           | *不支持*         | `3011`                                   | HTTP 绑定端口，仅在 `http` 模式下有效。                                                                                                                                                    |
| `CRIC_WUYE_AI_ACCESS_TOKEN`      | `token`       | *无*                                      | CRIC物业AI Access Token。如果不提供，则使用实际请求 HTTP Authorization Header 中的值。                                                                                                            |
| `CRIC_WUYE_AI_PROVIDER_API_BASE` | *不支持*         | `https://export.wuye-ai.cricbigdata.com` | CRIC物业AI 后端接入 API，请注意 ***此 URL 不是 CRIC物业AI MCP Server 的 URL*** 。可选值为 `https://export.wuye-ai-staging.cricbigdata.com` （测试环境）、 `https://export.wuye-ai.cricbigdata.com` （生产环境） |
| `CRIC_WUYE_AI_NAME_EN`           | `name_en`     | 由 CRIC物业AI 工作人员为您默认配置                    | 是否使用工具英文名称，支持 `true` 和 `false` 两个取值。启用时，Tool 名称将改为使用英文版本，以提高对部分海外模型的兼容性。对于支持中文工具名称的模型，建议不启用，以获得更好的效果。如果配置该选项，将覆盖默认配置。                                                         |
| `CRIC_WUYE_AI_FEATURE_SET`       | `feature_set` | 由 CRIC物业AI 工作人员为您默认配置                    | 预配置的工具功能集，支持 `base`、`detail` 等取值。该参数决定了您可用的 Tool 集合，`base` 功能集中提供了“获取可用知识库列表”和通用的“搜索知识库”工具，而 `detail` 功能集中不提供“获取可用知识库列表”工具，但为每个可用的知识库提供了单独的“搜索知识库”工具。如果配置该选项，将覆盖默认配置。         |
| `CRIC_WUYE_AI_OUTPUT_FORMAT`     | `output`      | `raw`                                    | 工具调用输出格式，支持 `raw`（不转化）、`text`（转化为 Markdown 文本）等取值。                                                                                                                            |

*注：* URL Query 配置时，只需要在 SSE 调用的 URL 后面拼接参数即可，例如：

```json
{
  "mcpServers": {
    "CRIC物业AI": {
      "transportType": "sse",
      "url": "https://mcp.wuye-ai.cricbigdata.com/sse/mcp?token={{您的 CRIC物业AI Access Token}}&name_en=true"
    }
  }
}
```

关于 `CRIC_WUYE_AI_NAME_EN` 和 `CRIC_WUYE_AI_FEATURE_SET` 的更多信息，请参考 [工具定义配置](./TOOLS.md) 文档。
