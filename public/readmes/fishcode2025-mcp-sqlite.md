# SQLite MCP服务器
[![Crates.io](https://img.shields.io/crates/v/mcp-sqlite)](https://crates.io/crates/mcp-sqlite)
[![Rust CI/CD](https://github.com/fishcode2025/mcp-sqlite/actions/workflows/rust.yml/badge.svg)](https://github.com/fishcode2025/mcp-sqlite/actions/workflows/rust.yml)
[![文档部署](https://github.com/fishcode2025/mcp-sqlite/actions/workflows/docs.yml/badge.svg)](https://github.com/fishcode2025/mcp-sqlite/actions/workflows/docs.yml)
[![许可证](https://img.shields.io/badge/许可证-MIT-green)](https://github.com/fishcode2025/mcp-sqlite/blob/main/LICENSE)

这是一个使用Rust实现的SQLite MCP服务器，提供通过Model Context Protocol访问SQLite数据库的能力。由[fishcode2025](https://github.com/fishcode2025)组织维护。

## 关于fishcode2025

fishcode2025是一个致力于开发高质量、开源软件的组织，专注于数据库、API和开发工具等领域。查看[ORGANIZATION.md](ORGANIZATION.md)了解更多信息。

## 安装

### 预编译二进制文件

您可以从[GitHub Releases](https://github.com/fishcode2025/mcp-sqlite/releases)页面下载预编译的二进制文件。

### 从Crates.io安装

```bash
cargo install fishcode2025-mcp-sqlite
```

### 从源代码构建

```bash
git clone https://github.com/fishcode2025/mcp-sqlite.git
cd mcp-sqlite
cargo build --release
```

## 功能

服务器提供以下MCP方法：

### `query`

执行SQL查询并返回结果。

#### 查询参数

- `query`：要执行的SQL查询。
- `params`：（可选）绑定到查询的参数。

#### 查询返回值

- `columns`：列名。
- `rows`：查询返回的行。

### `execute`

执行SQL语句。

#### 执行参数

- `statement`：要执行的SQL语句。
- `params`：（可选）绑定到语句的参数。

#### 执行返回值

- `rowcount`：受影响的行数。
- `lastrowid`：最后插入行的ID（如适用）。

### `executemany`

使用不同参数多次执行SQL语句。

#### 批量执行参数

- `statement`：要执行的SQL语句。
- `params_list`：绑定到语句的参数列表。

#### 批量执行返回值

- `rowcount`：受影响的行数。

### `executescript`

执行SQL脚本。

#### 脚本参数

- `script`：要执行的SQL脚本。

#### 脚本返回值

- `rowcount`：受影响的行数。

## 验证方法

你可以通过以下步骤验证服务器功能：

### 1. 编译并运行服务器

```bash
# 编译项目
cargo build --release

# 运行服务器（使用内存数据库）
cargo run --release
```

服务器将使用stdio（标准输入/输出）方式运行，等待客户端连接。

### 2. 在另一个终端运行客户端示例

```bash
# 使用内存数据库运行示例客户端
cargo run --example client -- ./target/release/mcp-sqlite

# 使用指定的数据库文件
cargo run --example client -- ./target/release/mcp-sqlite --db ./test.db

# 在Windows上
cargo run --example client -- .\target\release\mcp-sqlite.exe --db C:\path\to\test.db

# 查看帮助信息
cargo run --example client -- --help
```

客户端示例将通过stdio连接到服务器，创建表，插入数据，并执行查询，验证服务器的各项功能是否正常工作。

> 注意：客户端需要知道服务器可执行文件的路径。如果看到错误 `Error: StdioProcessError("program not found")`，请确保指定了正确的服务器可执行文件路径。

也可以使用官方的ts客户端来验证

```bash
npx -y @modelcontextprotocol/inspector .\mcp-sqlite.exe  --db C:\\Users\\yourusername\\test.db
```

### 3. 验证输出

客户端示例运行后，你应该能看到类似以下的输出：

```
已连接到SQLite MCP服务器
创建users表...
插入数据...
插入结果: {"lastrowid":1,"rowcount":1}
批量插入数据...
批量插入结果: {"rowcount":3}
查询所有用户...
查询结果:
id | name | email
-----------------
1 | 张三 | zhangsan@example.com
2 | 李四 | lisi@example.com
3 | 王五 | wangwu@example.com
4 | 赵六 | zhaoliu@example.com

按名称查询用户...
查询结果: {"columns":["id","name","email"],"rows":[[1,"张三","zhangsan@example.com"]]}

执行SQL脚本...
脚本执行结果: {"rowcount":2}

查询products表...
查询结果: {"columns":["id","name","price"],"rows":[[1,"产品A",99.99],[2,"产品B",199.99]]}

示例完成
```

如果你看到类似上述的输出，说明服务器功能正常。

## 使用

### 启动服务器

```bash
# 使用内存数据库
./mcp-sqlite

# 使用指定的SQLite数据库文件
./mcp-sqlite --db path/to/database.db
```

### 命令行选项

- `--db`：SQLite数据库文件路径（默认为内存数据库`:memory:`）
- `--log-level`：日志级别（默认为`info`）

### 客户端示例

```rust
use mcp_client::{
    client::{ClientCapabilities, ClientInfo, McpClient, McpClientTrait},
    transport::{StdioTransport, Transport},
    McpService,
};
use mcp_core;
use serde_json::json;
use std::{collections::HashMap, env, time::Duration};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 获取命令行参数
    let args: Vec<String> = env::args().collect();
    
    // 检查是否提供了服务器可执行文件路径
    let server_path = if args.len() > 1 {
        args[1].clone()
    } else {
        // 默认使用当前目录下的mcp-sqlite可执行文件
        "./mcp-sqlite".to_string()
    };
    
    // 检查是否提供了数据库路径
    let db_path = if args.len() > 2 {
        args[2].clone()
    } else {
        // 默认使用内存数据库
        ":memory:".to_string()
    };
    
    println!("使用服务器: {}", server_path);
    println!("使用数据库: {}", db_path);
    
    // 创建客户端
    let transport = StdioTransport::new(
        server_path,
        vec!["--db".to_string(), db_path],
        HashMap::new(),
    );
    let handle = transport.start().await?;
    let service = McpService::with_timeout(handle, Duration::from_secs(30));
    let mut client = McpClient::new(service);
    
    // 初始化客户端
    let info = ClientInfo {
        name: "mcp-sqlite-client".to_string(),
        version: "1.0.0".to_string(),
    };
    let capabilities = ClientCapabilities::default();
    client.initialize(info, capabilities).await?;

    // 创建表
    client.call_tool("execute", json!({
        "statement": "CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)"
    })).await?;

    // 插入数据
    client.call_tool("execute", json!({
        "statement": "INSERT INTO users (name, email) VALUES (?, ?)",
        "params": ["张三", "zhangsan@example.com"]
    })).await?;

    // 查询数据
    let result = client.call_tool("query", json!({
        "query": "SELECT * FROM users"
    })).await?;

    println!("查询结果: {:?}", result);

    Ok(())
}
```

## 许可证

MIT 
