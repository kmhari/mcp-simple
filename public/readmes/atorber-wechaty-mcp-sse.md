# WECHATY-MCP-SSE

基于TypeScript实现的wechaty-mcp-sse服务器，提供Wechaty相关功能，用于连接Claude等大型语言模型和Wechaty。

[chat-wechat](https://github.com/atorber/chat-wechat)的MCP版本，MCP使的这一实现极大简化。

## 功能

- 使用昵称查询好友信息

- 使用群名称查询群信息

- 向好友发送消息

- 向群发送消息

## MCP配置信息

```
{
  "mcpServers": {
    "wechaty-mcp-sse": {
      "url": "http://localhost:8083/sse"
    }
  }
}
```

## 使用示例

- 查询好友信息

<img src="./docs/findfriend.png" alt="查找好友" height="300" />

- 发送消息给好友

<img src="./docs/sendmsg.png" alt="发送消息" height="300" />

## 安装与运行

1. 安装依赖

```bash
cd mcp-sse-server
npm install
```

2. 创建环境配置文件

```bash
cp .env.example .env
```

3. 启动开发服务器

```bash
npm run dev
```

4. 构建生产版本

```bash
npm run build
```

5. 启动生产服务器

```bash
npm start
```

## MCP工具说明

1. **findFriend**: 查找好友

   - 参数:
     - nickname: 好友昵称（必填）
   - 返回:
     - 成功：返回好友列表，格式为：`{ content: [{ type: "text", text: "[{\"wxid\":\"xxx\",\"name\":\"xxx\",\"index\":1}, ...]" }] }`
     - 失败：`{ content: [{ type: "text", text: "「{nickname}」用户不存在" }] }`

2. **findRoomByTopic**: 查找群组

   - 参数:
     - topic: 群组名称（必填）
   - 返回:
     - 成功：返回群组列表，格式为：`{ content: [{ type: "text", text: "[{\"wxid\":\"xxx\",\"name\":\"xxx\"}]" }] }`
     - 失败：返回空列表

3. **sendMessageToFriendByNickname**: 使用昵称向好友发送消息

   - 参数: 
     - nickname: 好友昵称（必填）
     - message: 消息内容（必填）
   - 返回: 
     - 成功：`{ content: [{ type: "text", text: "消息发送消息到「{nickname}」成功，发送时间 {timestamp}" }] }`
     - 失败：`{ content: [{ type: "text", text: "「{nickname}」用户不存在" }] }`
     - 多个匹配：`{ content: [{ type: "text", text: "「{nickname}」用户存在多个，请使用微信ID发送消息或指定发送给第几个好友" }, { type: "text", text: "[{\"wxid\":\"xxx\",\"name\":\"xxx\",\"index\":1}, ...]" }] }`

4. **sendMessageToRoomByTopic**: 使用群名称向群组发送消息

   - 参数: 
     - topic: 群组名称（必填）
     - message: 消息内容（必填）
   - 返回: 
     - 成功：`{ content: [{ type: "text", text: "消息发送消息到「{topic}」成功，发送时间 {timestamp}" }] }`
     - 失败：`{ content: [{ type: "text", text: "「{topic}」群组不存在" }] }`
     - 多个匹配：`{ content: [{ type: "text", text: "「{topic}」群组存在多个，请使用微信ID发送消息或指定发送给第几个群组" }, { type: "text", text: "[{\"wxid\":\"xxx\",\"name\":\"xxx\",\"index\":1}, ...]" }] }`

5. **sendMessageToFriendByWxId**: 使用微信ID向好友发送消息

   - 参数:
     - wxid: 好友的微信ID（必填）
     - message: 消息内容（必填）
   - 返回:
     - 成功：`{ content: [{ type: "text", text: "消息发送消息到「{wxid}」成功，发送时间 {timestamp}" }] }`
     - 失败：`{ content: [{ type: "text", text: "「{wxid}」用户不存在" }] }`

6. **sendMessageToRoomByWxId**: 使用微信ID向群组发送消息

   - 参数:
     - wxid: 群组的微信ID（必填）
     - message: 消息内容（必填）
   - 返回:
     - 成功：`{ content: [{ type: "text", text: "消息发送消息到「{wxid}」成功，发送时间 {timestamp}" }] }`
     - 失败：`{ content: [{ type: "text", text: "「{wxid}」群组不存在" }] }`

## 容器化部署

可使用 Docker 进行容器化部署，示例 Dockerfile 如下：

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist/ ./dist/

EXPOSE 8083

USER node

CMD ["node", "dist/index.js"]
```
