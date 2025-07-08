# mcp-upload-file

一个基于 MCP (Model Context Protocol) 的文件上传服务。

## 配置说明

在 MCP 配置文件中添加以下配置:

```json
{
  "mcpServers": {
    "upload-file": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-upload-file@latest"
      ],
      "env": {
        "UPLOAD_URL": "",        // 文件上传的目标 URL
        "FILE_KEY": "",          // 上传表单中文件字段的 key
        "FILE_NAME": "",         // 上传的文件名
        "EXTRA_FORM": "{\"other_form_key\":\"other_form_value\"}"  // 额外的表单数据(JSON 格式)
      }
    }
  }
}
```

### 环境变量说明

- `UPLOAD_URL`: 必填，文件上传的目标 URL
- `FILE_KEY`: 必填，上传表单中文件字段的 key 名称
- `FILE_NAME`: 可选，指定上传文件的文件名
- `EXTRA_FORM`: 可选，额外的表单数据，需要是合法的 JSON 字符串

