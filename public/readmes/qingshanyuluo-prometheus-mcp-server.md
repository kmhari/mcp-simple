# Prometheus MCP 服务器

这是一个简化版的Prometheus MCP服务器，用于查询指标提供 ai 分析。

## 快速开始

### 启动

1. 设置Prometheus地址环境变量：
```bash
export PROMETHEUS_URL=your_Prometheus_endpoint
```

2. 启动服务器：
```bash
go run cmd/server/main.go sse
```

服务器将在`:8081`端口启动，可以通过以下URL访问：
- http://localhost:8081/sse

3. (可选) 设置日志文件路径：
```bash
export APP_LOG_FILE=/path/to/logfile.log
```

### 测试
```bash
npx @modelcontextprotocol/inspector node build/index.js
```

## 功能特性

### AI友好化分析指标

1. **JSON格式输出**：所有查询结果均以JSON格式返回，便于AI系统解析处理

### MCP工具

1. **search_metrics** - 按正则表达式搜索指标
   - 参数: `pattern` (指标名称模式，支持正则表达式)
   - 示例: `http_.*` 匹配所有以`http_`开头的指标
   - 返回: 匹配的指标名称列表(JSON格式)

2. **get_metric_labels** - 获取指标的所有标签
   - 参数: `name` (指标名称)
   - 示例: `http_requests_total`
   - 返回: 该指标的所有标签列表(JSON格式，不包括`__name__`标签)

3. **get_metric_label_values** - 获取指标标签的所有值
   - 参数: 
     - `name` (指标名称)
     - `label` (标签名称)
   - 示例: 获取`http_requests_total`指标的`method`标签的所有值
   - 返回: 指定标签的所有值列表(JSON格式)

4. **query** - 执行PromQL即时查询
   - 参数:
     - `query` (PromQL查询语句)
     - `time` (查询时间戳，格式为RFC3339或Unix时间戳，可选)
   - 示例: 查询当前CPU使用率
   - 返回: 查询结果(JSON格式)

5. **query_range** - 执行PromQL范围查询
   - 参数:
     - `query` (PromQL查询语句)
     - `start` (开始时间，格式为RFC3339或Unix时间戳(毫秒))
     - `end` (结束时间，格式为RFC3339或Unix时间戳(毫秒))
     - `step` (查询步长，例如'15s'、'1m')
   - 示例: 查询过去1小时CPU使用率变化，每15秒一个数据点
   - 返回: 范围查询结果(JSON格式)

6. **query_chart** - 执行PromQL范围查询并生成图表
   - 参数:
     - `query` (PromQL查询语句)
     - `start` (开始时间，格式为RFC3339或Unix时间戳(毫秒))
     - `end` (结束时间，格式为RFC3339或Unix时间戳(毫秒))
     - `step` (查询步长，例如'15s'、'1m')
     - `title` (图表标题，可选)
   - 示例: 查询过去1小时CPU使用率变化并生成图表
   - 返回: 图表图片(base64编码的PNG格式)

### 服务器端

1. 设置Prometheus地址：
```bash
export PROMETHEUS_URL=your_Prometheus_endpoint
```
2. 启动服务器：
```bash
go run cmd/server/main.go sse
```

服务器默认将在`:8081`端口暴露Prometheus指标。

### mcp 客户端配置

配置示例：
```json
{
  "mcpServers": {
    "products-sse": {
      "url": "http://localhost:8081/sse"
    }
  }
}
```
## 项目结构

```
.
├── cmd/           # 命令行程序入口
│   └── server/   # 服务器代码
├── internal/      # 内部实现
├── pkg/           # 可复用包
│   └── prometheus # Prometheus相关实现
└── go.mod         # Go模块定义
```