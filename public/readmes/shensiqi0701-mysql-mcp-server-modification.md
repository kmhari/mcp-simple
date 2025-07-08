# MySQL MCP 服务器

此MCP服务器提供对MySQL数据库的只读访问。

## 功能
- 列出可用数据库
- 列出数据库中的表
- 描述表结构（包含字段备注）
- 执行只读SQL查询

## 安装

### 1. 从NPM安装

```bash
# 全局安装
npm install -g @valuprosys/mysql-mcp-server

# 或在项目中本地安装
npm install @valuprosys/mysql-mcp-server
```

### 2. 配置环境变量

服务器需要以下环境变量：
- `MYSQL_HOST`: 数据库服务器地址
- `MYSQL_PORT`: 数据库端口 (默认: 3306)
- `MYSQL_USER`: 数据库用户名
- `MYSQL_PASSWORD`: 数据库密码
- `MYSQL_DATABASE`: 默认数据库名 (可选)

### 3. 添加到MCP配置

在MCP配置文件中添加以下配置：

```json
{
  "mcpServers": {
    "mysql": {
      "command": "npx",
      "args": ["@valuprosys/mysql-mcp-server"],
      "env": {
        "MYSQL_HOST": "your-mysql-host",
        "MYSQL_PORT": "3306",
        "MYSQL_USER": "your-mysql-user",
        "MYSQL_PASSWORD": "your-mysql-password",
        "MYSQL_DATABASE": "your-default-database"
      },
      "disabled": false,
      "autoApprove": [
        "list_databases",
        "list_tables",
        "describe_table",
        "execute_query"
      ]
    }
  }
}
```
## 可用工具

### list_databases

列出MySQL服务器上所有可访问的数据库。

**参数**: 无

### list_tables

列出指定数据库中的所有表。

**参数**:
- `database` (可选): 数据库名称 (未指定时使用默认数据库)

### describe_table

显示指定表的详细结构。

**参数**:
- `database` (可选): 数据库名称 (未指定时使用默认数据库)
- `table` (必填): 表名称

### execute_query

执行只读SQL查询。

**参数**:
- `query` (必填): SQL查询语句 (仅允许SELECT、SHOW、DESCRIBE和EXPLAIN语句)
- `database` (可选): 数据库名称 (未指定时使用默认数据库)
