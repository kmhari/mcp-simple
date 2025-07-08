# 地理数据处理 MCP Server

## 项目简介

地理数据处理 MCP Server 是一个基于 Model Context Protocol (MCP) 的服务器，提供了一系列地理数据处理工具的接口。该服务器允许大型语言模型（如 Claude）通过标准化的接口访问和调用各种地理数据处理功能，包括 WhiteBox 和 SAGA GIS 提供的地理数据处理服务。

通过这个 MCP Server，用户可以：
- 查询可用的地理数据处理工具
- 获取工具的详细信息和参数要求
- 上传地理数据文件
- 调用地理数据处理工具进行数据分析和处理

## 安装和配置

### 前提条件

- Python 3.8 或更高版本
- 安装了 MCP SDK (`mcp-server`)
- 网络连接（用于访问地理数据处理服务 API）

### 安装步骤

1. 克隆本仓库：
   ```bash
   git clone https://github.com/your-username/geo-data-processor-mcp.git
   cd geo-data-processor-mcp
   ```

2. 安装依赖：
   ```bash
   pip install -r requirements.txt
   ```

3. 配置环境变量（可选）：
   ```bash
   export GEO_API_TOKEN="your_api_token"  # 如果不设置，将使用默认令牌
   ```

### 启动服务器

```bash
python server/geoDataProcessor.py
```

服务器将通过标准输入/输出（stdio）与 MCP 客户端通信。

## 配置 Claude for Desktop

要在 Claude for Desktop 中使用此 MCP Server，请按照以下步骤操作：

1. 打开 Claude for Desktop 配置文件：
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%AppData%\Claude\claude_desktop_config.json`

2. 添加服务器配置：
   ```json
   {
     "mcpServers": {
       "geoDataProcessor": {
         "command": "python",
         "args": [
           "/absolute/path/to/server/geoDataProcessor.py"
         ]
       }
     }
   }
   ```

3. 重启 Claude for Desktop

## 可用工具

### 1. list_all_tools

查询工具库中所有工具的缩略信息，一次性返回所有工具。

**参数**：无

**返回**：包含工具 ID、名称和描述的 JSON 字符串

**示例**：
```python
result = await list_all_tools()
```

### 2. search_tools_by_keyword

根据关键词获取工具，一次性返回所有符合条件的工具。

**参数**：
- `keyword`：搜索关键词（字符串）

**返回**：包含工具详细信息的 JSON 字符串

**示例**：
```python
result = await search_tools_by_keyword("vector")
```

### 3. get_tool_details

查询某个方法名称的详细信息。

**参数**：
- `name`：方法名称（字符串）

**返回**：包含工具详细信息的 JSON 字符串

**示例**：
```python
result = await get_tool_details("MergeVectors")
```

### 4. invoke_tool

调用地理数据处理方法。

**参数**：
- `tool_id`：工具 ID（整数）
- `params`：工具参数（字典），格式为 `{"val0": value0, "val1": value1, ...}`

**返回**：调用结果的 JSON 字符串

**示例**：
```python
params = {
    "val0": ["c55f39c3-23e4-4a80-aeee-f9fa2695f7a5", "c0ecc572-28f0-4b7e-b3b4-117ac76f320e"],
    "val1": "result.shp"
}
result = await invoke_tool(285, params)
```

### 5. upload_file

将文件上传到数据中转服务器。

**参数**：
- `file_path`：文件路径（字符串）

**返回**：上传成功后的文件 URL

**示例**：
```python
file_url = await upload_file("/path/to/your/file.shp")
```

## 参数说明

### invoke_tool 参数映射

调用 `invoke_tool` 时，参数的键名不是参数的实际名称，而是按照参数在工具定义中的顺序编号：
- `val0`：第一个参数
- `val1`：第二个参数
- `val2`：第三个参数，以此类推

不同类型参数的处理方式：

1. **文件输入类型参数**：
   - 需要先使用 `upload_file` 工具上传文件，然后将返回的文件 ID 作为参数值
   - 如果参数类型是单个文件，则传入文件 ID 字符串
   - 如果参数类型是文件列表，则传入文件 ID 列表

2. **文件输出类型参数**：
   - 只需传入输出文件名

3. **布尔类型参数**：
   - 可以传入布尔值（`true`/`false`）或字符串（`"true"`/`"false"`）

4. **数值类型参数**：
   - 可以传入数值或字符串形式的数值

## 使用流程示例

以下是使用地理数据处理 MCP Server 的典型流程：

### 1. 查找可用工具

```python
# 列出所有工具
tools_list = await list_all_tools()
print(tools_list)

# 或者搜索特定关键词的工具
vector_tools = await search_tools_by_keyword("vector")
print(vector_tools)
```

### 2. 获取工具详细信息

```python
# 获取特定工具的详细信息
tool_details = await get_tool_details("MergeVectors")
print(tool_details)
```

### 3. 上传输入文件

```python
# 上传需要处理的文件
file1_url = await upload_file("/path/to/vector1.shp")
file2_url = await upload_file("/path/to/vector2.shp")

# 从URL中提取文件ID
file1_id = file1_url.split('/')[-1]
file2_id = file2_url.split('/')[-1]
```

### 4. 调用工具处理数据

```python
# 准备参数
params = {
    "val0": [file1_id, file2_id],  # 文件ID列表
    "val1": "merged_result.shp"    # 输出文件名
}

# 调用工具（假设MergeVectors的ID是285）
result = await invoke_tool(285, params)
print(result)
```

## 常见问题解答

### Q: 如何知道工具需要哪些参数？

A: 使用 `get_tool_details` 函数获取工具的详细信息，包括参数列表和类型。返回的 `params` 字段包含每个参数的名称、类型、描述等信息。

### Q: 调用工具后如何获取处理结果？

A: 调用 `invoke_tool` 后，返回的 JSON 中的 `output` 字段包含输出文件的信息，包括文件 ID。您可以使用这些 ID 下载或进一步处理结果文件。

### Q: 支持哪些类型的地理数据？

A: 支持多种地理数据格式，包括但不限于：
- 矢量数据：Shapefile (.shp)
- 栅格数据：GeoTIFF (.tif, .tiff)
- LiDAR 点云数据：LAS/LAZ (.las, .laz, .zlidar)
- 表格数据：CSV (.csv)

## 贡献指南

我们欢迎对地理数据处理 MCP Server 的贡献！如果您想贡献代码、报告问题或提出建议，请遵循以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。