# mcp-mysql-server

一个基于Model Context Protocol的MySQL数据库操作服务器。该服务器使AI模型能够通过标准化接口与MySQL数据库进行交互。

## 安装

```bash
npx @malove86/mcp-mysql-server
```

## 配置

服务器支持两种部署模式：

### 1. 本地运行模式

在MCP设置配置文件中使用命令行运行：

```json
{
  "mcpServers": {
    "mysql": {
      "command": "npx",
      "args": ["-y", "@malove86/mcp-mysql-server"],
      "env": {
        "MYSQL_HOST": "your_host",
        "MYSQL_USER": "your_user",
        "MYSQL_PASSWORD": "your_password",
        "MYSQL_DATABASE": "your_database",
        "MYSQL_PORT": "3306"
      }
    }
  }
}
```

### 2. 远程URL模式 (v0.2.2+)

指向远程运行的MCP服务器：

```json
{
  "mcpServers": {
    "mcp-mysql-server": {
      "url": "http://your-server-address:port/mcp-mysql-server"
    }
  }
}
```

在远程服务器上，您需要设置环境变量后启动MCP服务器：

```bash
# 设置环境变量
export MYSQL_HOST=your_host
export MYSQL_USER=your_user
export MYSQL_PASSWORD=your_password
export MYSQL_DATABASE=your_database
export MYSQL_PORT=3306  # 可选，默认为3306

# 启动服务器
npx @malove86/mcp-mysql-server
```

> 注意：MYSQL_PORT是可选的，默认值为3306。

## 版本功能

### v0.2.4+ 新特性
- **多用户并发支持**：服务器现在可同时处理多个用户的请求
- **高效连接池管理**：使用改进的连接池，支持最多50个并发连接
- **请求级别隔离**：每个请求都有唯一标识符，便于跟踪和调试
- **详细日志记录**：记录每个请求的执行过程和资源使用情况
- **改进的错误处理**：更精确地捕获和报告数据库错误
- **性能优化**：连接池复用和优化的连接管理提高处理速度

### v0.2.2+ 特性
- **自动数据库连接**：在服务器启动时，如果设置了环境变量，会自动尝试连接数据库
- **无需客户端参数**：当使用URL模式时，客户端不需要提供数据库连接信息
- **无感知数据库操作**：可以直接使用`list_tables`、`query`等工具，无需先调用`connect_db`
- **更安全**：敏感的数据库凭据只在服务器端存在，不会暴露在客户端对话中
- **优雅的容错**：即使初始连接失败，后续操作会自动重试连接

## 可用工具

### 1. connect_db
使用提供的凭据建立与MySQL数据库的连接。如果已通过环境变量设置了连接，此工具是可选的。

```json
{
  "host": "localhost",
  "user": "root",
  "password": "your_password",
  "database": "your_database",
  "port": 3306  // 可选，默认为3306
}
```

### 2. query
执行SELECT查询，支持可选的预处理语句参数。

```json
{
  "sql": "SELECT * FROM users WHERE id = ?",
  "params": [1]  // 可选参数
}
```

### 3. list_tables
列出已连接数据库中的所有表。

```json
{}  // 从v0.2.4开始不再需要任何参数
```

### 4. describe_table
获取特定表的结构。

```json
{
  "table": "users"
}
```

## 功能特点

- 安全的连接处理，自动清理
- 支持预处理语句参数
- 全面的错误处理和验证
- TypeScript支持
- 自动连接管理
- 服务器环境变量配置
- 支持URL远程连接模式
- 多用户并发支持
- 高性能连接池

## 性能

- 支持最多50个并发连接（可配置）
- 连接池自动管理，提高资源利用率
- 详细的请求跟踪和性能监控

## 安全性

- 使用预处理语句防止SQL注入
- 通过环境变量支持安全密码处理
- 执行前验证查询
- 完成后自动关闭连接
- URL模式下敏感凭据不暴露在客户端
- 连接隔离，防止用户间数据泄露

## 贡献

欢迎贡献！请随时提交Pull Request到 https://github.com/Malove86/mcp-mysql-server.git

## 许可证

MIT 