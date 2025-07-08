# MCP 安全扫描工具

## 项目简介
MCP安全扫描工具是一个用于检测和验证MCP(Model Context Protocol)配置文件中服务器、提示词(prompts)、资源(resources)和工具(tools)安全性的Rust应用程序。

## 核心功能
- ✅ 扫描MCP配置文件中的服务器配置
- ✅ 自动验证服务器中的实体(prompts/resources/tools)安全性
- ✅ 支持审查模式，将prompts/resources/tools描述装换成中文
- ✅ 支持多种MCP服务器类型(SSE/Stdio)
- ✅ 实时显示扫描进度和结果
- ✅ 支持白名单管理功能
- ✅ 记录扫描历史并检测配置变更


## 技术栈
- 语言: Rust
- 主要依赖:
  - `rmcp` - MCP协议实现
  - `serde` - 序列化/反序列化
  - `chrono` - 时间处理
  - `colored` - 终端彩色输出

## 安装与使用
### 安装
```bash
cargo install --path .
```

### 基本用法
```bash
mcp-security-scan [配置文件路径]
```

### 高级选项
- `--storage-path`: 指定存储扫描结果的路径
- `--base-url`: 设置验证API的基础URL
- `--reset-whitelist`: 重置白名单

## 工作原理
1. 解析MCP配置文件，提取服务器配置
2. 连接到每个服务器并获取所有实体(prompts/resources/tools)
3. 计算每个实体的MD5哈希值(基于描述信息)
4. 通过验证API检查实体安全性
5. 记录扫描结果并与历史记录比较
6. 支持白��单功能跳过已验证的安全实体

## 配置示例
```json
{
  "mcpServers": {
    "example_server": {
      "url": "http://example.com/sse",
      "type": "sse"
    },
    "local_mcp": {
      "command": "npx",
      "args": [
        "-y",
        "example-server"
      ]
    }
  }
}
```

## 贡献指南
欢迎提交Pull Request！请确保:
1. 代码符合Rust惯用写法
2. 包含适当的测试用例
3. 更新相关文档

## 许可证
MIT