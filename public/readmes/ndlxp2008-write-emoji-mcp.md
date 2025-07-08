# md-emoji-mcp ![火箭](emojis/remote/remote/火箭_1745566274842.gif)

本项目基于 [mcp-temple](https://github.com/ndlxp2008/mcp-temple) 构建,mcp-temple 也在不断完善中。

欢迎来到 md-emoji-mcp，一个超便捷的 CLI 小工具，让你的 Markdown 技术文章瞬间萌化~ ![笑脸](emojis/remote/remote/笑脸_1745566276057.jpg)

## 一、前置准备 ![工具](emojis/remote/remote/工具_1745566277182.jpg)

1. 确保已安装 Node.js（>=12）和 npm 或 yarn。
2. 如果想全局使用，需要管理员权限安装，或者用 npx 也可以。

## 二、快速安装 & 构建

```bash
# 克隆仓库到本地
git clone https://github.com/ndlxp2008/md-emoji-mcp.git
cd md-emoji-mcp

# 安装依赖
npm install
# 或者 yarn
yarn

# 编译 TypeScript
npm run build

# 全局安装（可选）
npm install -g .
# 或者直接用 npx
npx md-emoji-mcp <markdown文件> -d emojis
```

cursor mcp 配置：

```json
{
  "mcpServers": {
    "write_emoji_mcp": {
      "command": "F:\\project\\ai\\mcp\\write_emoji_mcp\\build\\index.js"
    }
  }
}
```

## 三、使用示例 ![眼睛](emojis/remote/remote/眼睛_1745566278664.jpg)

```bash
# 默认从 ./emojis 目录加载本地表情包
md-emoji-mcp README.md

# 指定自定义表情包目录
md-emoji-mcp docs/guide.md -d path/to/emojis

# 支持远程占位符，比如 ![可爱](emojis/remote/remote/可爱_1745566278815.jpg) ![调皮](emojis/remote/remote/调皮_1745566280278.jpg)，自动下载到本地哦~
```

处理完后，目标 Markdown 文件会被更新，对应关键词和占位符都会插入表情，让文章更生动！

## 四、项目结构

```
.
├── build/         // 编译后的 JS 文件
├── doc/           // 项目文档
├── emojis/        // 本地表情包目录
├── src/           // TS 源码
│   └── server/index.ts  // CLI 入口
├── package.json   // 项目配置
└── README.md      // 本说明文档
```

## 五、常见问题 ![思考](emojis/remote/remote/思考_1745566283493.jpg)

- **Q：命令找不到？**
  A：确认全局安装过，或者用 `npx md-emoji-mcp`。路径大小写也要对哦~

- **Q：占位符没变图片？**
  A：占位符格式必须像 ``，联网状态良好，并且名称要准确。

## 六、贡献 & 联系 ![爱心](emojis/remote/remote/爱心_1745566285397.jpg)

觉得好用就点个 Star ⭐，欢迎提 issue 或 PR，一起把工具做得更强大！ ![赞](emojis/remote/remote/赞_1745566285661.jpg)

---

快去试试吧，用表情包点亮你的文档世界！
