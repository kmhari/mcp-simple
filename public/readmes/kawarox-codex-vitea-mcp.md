# Codex Vitea MCP

ViteaOS 个人信息管理系统的专用 MCP 服务器，用于连接 AI 助手与 MongoDB 数据库。

## 主要功能

- **物品查找**：轻松查询物品位置、容器和状态
- **出行时间估算**：基于历史行走速度数据计算路线时间
- **联系人管理**：查询联系人信息、笔记和关系
- **生物数据分析**：记录和分析各类生理指标和测量记录
- **任务跟踪**：管理待办事项、截止日期和优先级

## 安装

```bash
# 克隆仓库
git clone https://github.com/yourusername/codex-vitea-mcp.git
cd codex-vitea-mcp

# 安装依赖
npm install

# 构建项目
npm run build
```

## 使用方法

### 基本用法

```bash
# 使用MongoDB连接URL启动服务器
npm start mongodb+srv://username:password@cluster.mongodb.net/database

# 以只读模式连接
npm start mongodb+srv://username:password@cluster.mongodb.net/database --read-only
```

### 环境变量配置

```bash
# 设置MongoDB连接URI
export MCP_MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/database"

# 启用只读模式
export MCP_MONGODB_READONLY="true"

# 运行服务器
npm start
```

## 与 Claude Desktop 集成

在 Claude Desktop 的配置文件中添加服务器配置：

**MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "vitea": {
      "command": "npx",
      "args": [
        "-y",
        "codex-vitea-mcp",
      ],
      "env": [
        "MCP_MONGODB_URI": "mongodb+srv://username:password@cluster.mongodb.net/database",
        "AMAP_API_KEY": "YOU_API_KEY",
        "MCP_MONGODB_READONLY": false
      ]
    }
  }
}
```

## 特色工具

### 查找物品

```
find_item(itemName="眼药水")
```

### 估算出行时间

```
estimate_time(origin="宿舍", destination="主楼")
```

### 获取待办任务

```
get_pending_tasks()
```

### 查询联系人

```
query_contact(search="王")
```

### 获取最新生物数据

```
get_latest_biodata(measurementType="走路速度")
```

## 开发

```bash
# 观察模式，自动重新编译
npm run watch

# 使用MCP Inspector进行调试
npm run inspector
```

## 许可证

MIT
