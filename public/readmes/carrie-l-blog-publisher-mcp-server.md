
## 需求
在用户输入 "blog+文章名" 时，自动将 Obsidian 本地目录下的指定 Markdown 文件复制到指定目录，处理图片链接并复制图片到目标文件夹，然后将更改推送到 GitHub。

## 功能
创建一个 MCP（Model Context Protocol）博客上传服务，具体功能如下：

- **触发条件**：用户输入 "blog+文章名"。
- **文件复制**：将 Obsidian 本地目录下的某个 Markdown 文件（*.md，例如 "文章名.md"）复制到 I:\B-MioBlogSites 下的指定目录（默认 I:\B-MioBlogSites\_Android）。
- **图片处理**：检测 Markdown 文件中的图片链接，将图片从 I:\B-1 笔记\Android\Android\z. attachments 复制到 I:\B-MioBlogSites\assets\images，并更新 Markdown 文件中的图片路径。
- **GitHub 推送**：将更改提交并推送到 GitHub。

## 返回结果



## ![claude](result.png)

