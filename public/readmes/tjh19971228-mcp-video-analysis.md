# 视频分析 MCP 服务 | Video Analysis MCP Service

[中文](#chinese) | [English](#english)

<a name="chinese"></a>
## 中文版本

这是一个基于Model Context Protocol (MCP)的服务，用于视频内容分析和思维导图生成。

### 更新日志

#### v1.0.0 (2025-04-17)
- 初始版本发布
- 支持视频分析功能
- 支持思维导图生成

#### v1.0.2 (2025-04-18)
- 优化生成总结的功能
- bugfix: 修复生成mindmap.json时，参数错误的问题
- refactor: 重构生成思维导图HTML的逻辑
- doc: 新增调用示例 task.md


### 正在开发

- 支持字幕文件导出
- AI改写
- 展示流 html页面

### 功能特点

- **视频分析**：从视频URL中提取关键词、摘要和关键时间点
- **思维导图生成**：基于视频分析结果生成结构化的思维导图
  - 生成JSON格式的思维导图数据（兼容jsMind库）
  - 生成静态PNG图片格式的思维导图
  - 生成交互式HTML格式的思维导图

### 环境要求

- Node.js >= 14.0.0
- 所需API密钥
  - BILIGPT_API_KEY：用于视频内容分析（支持多种平台）
    - 获取方式：https://bibigpt.co/r/jSeDX0
    - 支持的视频平台：
      - 国内平台：哔哩哔哩、抖音、快手、小红书、西瓜视频、今日头条、可灵、优酷
      - 海外平台：YouTube、TikTok、Instagram、Lemon8
    
  - DEEPSEEK_API_KEY：用于思维导图JSON生成

### 克隆项目

```bash
git clone https://github.com/tjh19971228/mcp_video_analysis.git
cd mcp_video_analysis
```

### 安装

```bash
# 安装依赖
npm install
 或者
pnpm install
```

### 配置

创建`.env`文件并设置必要的API密钥：

```
BILIGPT_API_KEY=your_biligpt_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
```

### 使用方法

#### 启动服务

```bash
# 启动MCP服务
node src/index.js
```

#### 与Claude集成

要在Claude桌面版中使用此MCP服务，编辑`claude_desktop_config.json`文件：

```json
{
  "mcpServers": {
    "video-analysis": {
      "command": "node",
      "args": ["your_project_path/src/index.js"],
      "env": {
        "BILIGPT_API_KEY": "your_biligpt_api_key",
        "DEEPSEEK_API_KEY": "your_deepseek_api_key"
      }
    }
  }
}
```

#### API使用示例

##### 视频分析

```javascript
// 调用视频分析服务
const result = await videoAnalysis.analyzeVideo({
  url: "https://www.bilibili.com/video/BVxxxxxx"
});

// 返回结果包含：
// - keywords: 关键词列表
// - summary: 视频摘要
// - keyTimepoints: 关键时间点列表
```

##### 生成思维导图

```javascript
// 生成思维导图JSON
const json = await mindmap.generateMindmapJson({
  keywords: result.keywords,
  summary: result.summary,
  keyTimepoints: result.keyTimepoints
});

// 生成思维导图图片
const imagePath = await mindmap.generateMindmapImage({
  json: json,
  outputPath: "./output/mindmap.png" // 可选，指定输出路径
});

// 生成思维导图HTML
const htmlPath = await mindmap.generateMindmapHtml({
  json: json,
  outputPath: "./output/mindmap.html", // 可选，指定输出路径
  title: "视频思维导图" // 可选，指定标题
});
```

### 开发者指南

服务使用官方的Model Context Protocol SDK实现，主要组件包括：

- `src/index.js`：服务入口，使用MCP SDK创建和启动服务
- `src/services/videoAnalysis.js`：视频分析服务实现
- `src/services/mindmap.js`：思维导图生成服务实现

### 许可证

MIT

---

<a name="english"></a>

## English Version

This is a service based on the Model Context Protocol (MCP) for video content analysis and mind map generation.

### Changelog

#### v1.0.0 (2025-04-17)
- Initial release
- Video analysis support
- Mind map generation

#### v1.0.1 (2025-04-18)
- Optimized summary generation
- bugfix: Fixed parameter error when generating mindmap.json
- refactor: Restructured the logic for generating mind map HTML
- doc: Added usage examples in task.md

### Under Development

- Support for exporting subtitle files
- AI Rewriting
- Demo flow HTML page

### Features

- **Video Analysis**: Extract keywords, summaries, and key timepoints from video URLs
- **Mind Map Generation**: Create structured mind maps based on video analysis results
  - Generate mind map data in JSON format (compatible with jsMind library)
  - Generate mind maps as static PNG images
  - Generate interactive HTML mind maps

### Requirements

- Node.js >= 14.0.0
- Required API Keys
  - BILIGPT_API_KEY: For video content analysis (supports multiple platforms)
    - Get it from: https://bibigpt.co/r/jSeDX0
    - Supported video platforms:
      - Domestic (China): Bilibili, Douyin, Kuaishou, Xiaohongshu, Xigua Video, Toutiao, Keling, Youku
      - International: YouTube, TikTok, Instagram, Lemon8
    
  - DEEPSEEK_API_KEY: For mind map JSON generation

### Clone Project

```bash
git clone https://github.com/tjh19971228/mcp_video_analysis.git
cd mcp_video_analysis
```

### Installation

```bash
# Install dependencies
npm install
 or
pnpm install
```

### Configuration

Create a `.env` file and set the necessary API keys:

```
BILIGPT_API_KEY=your_biligpt_api_key
DEEPSEEK_API_KEY=your_deepseek_api_key
```

### Usage

#### Start the Service

```bash
# Start the MCP service
node src/index.js
```

#### Claude Integration

To use this MCP service with Claude desktop, edit the `claude_desktop_config.json` file:

```json
{
  "mcpServers": {
    "video-analysis": {
      "command": "node",
      "args": ["your_project_path/src/index.js"],
      "env": {
        "BILIGPT_API_KEY": "your_biligpt_api_key",
        "DEEPSEEK_API_KEY": "your_deepseek_api_key"
      }
    }
  }
}
```

#### API Examples

##### Video Analysis

```javascript
// Call the video analysis service
const result = await videoAnalysis.analyzeVideo({
  url: "https://www.bilibili.com/video/BVxxxxxx"
});

// The result contains:
// - keywords: List of keywords
// - summary: Video summary
// - keyTimepoints: List of key timepoints
```

##### Generate Mind Maps

```javascript
// Generate mind map JSON
const json = await mindmap.generateMindmapJson({
  keywords: result.keywords,
  summary: result.summary,
  keyTimepoints: result.keyTimepoints
});

// Generate mind map image
const imagePath = await mindmap.generateMindmapImage({
  json: json,
  outputPath: "./output/mindmap.png" // Optional, specify output path
});

// Generate mind map HTML
const htmlPath = await mindmap.generateMindmapHtml({
  json: json,
  outputPath: "./output/mindmap.html", // Optional, specify output path
  title: "Video Mind Map" // Optional, specify title
});
```

### Developer Guide

The service is implemented using the official Model Context Protocol SDK, with the main components including:

- `src/index.js`: Service entry point, creates and starts the service using the MCP SDK
- `src/services/videoAnalysis.js`: Video analysis service implementation
- `src/services/mindmap.js`: Mind map generation service implementation

### License

MIT