# 自动发文 MCP Server

## 简介

本项目实现通过AI生成一篇文章，然后自动发文到CSDN、掘金、博客园。关于MCP协议，详见MCP官方[文档](https://modelcontextprotocol.io/)。

依赖`MCP Java SDK`开发，任意支持MCP协议的智能体助手（如`Claude`、`Cursor`以及`千帆AppBuilder`等）都可以快速接入。

以下会给更出详细的适配说明。

## 工具列表

#### 搜索面经 `searchExperienceQuestion`

- 从牛客搜索用户发表的面经
- 输出: `面经内容`

#### 查询资讯 `searchNews`

- 从网上查询最新的科技资讯话题内容
- 输出: `资讯标题、资讯内容`

#### 发布文章到CSDN `publishArticle2Csdn`

- 
- 输入: `文章标题、内容、描述`
- 输出: `文章id、文章链接`

#### 发布文章到掘金 `publishArticle2Juejin`

-
- 输入: `文章标题、内容、描述`
- 输出: `文章id、文章链接`

#### 发布文章到博客园 `publishArticle2Cnblog`

-
- 输入: `文章标题、内容、描述`
- 输出: `文章id、文章链接`

## 环境参数
### JUEJIN_COOKIE
掘金账号的Cookie，主要的请求头Cookie的sessionid字段


### CSDN_COOKIE
CSDN账号的Cookie，主要是请求头Cookie的SESSION字段、UserName字段，UserInfo字段、UserToken字段
请求头签名：x-ca-key、x-ca-nonce、x-ca-signature、x-ca-signature-headers、accept、content-type 写死就行了


### CNBLOG_COOKIE
博客园账号的Cookie，主要是请求头Cookie的.CNBlogsCookie字段、AspNetCore.Antiforgery.xxxxxxxx字段，.Cnblogs.AspNetCore.Cookies字段

### CNBLOG_TOKEN
博客园请求头x-xsrf-token字段


## 快速开始

使用发文 MCP Server主要通过`Java SDK` 的形式

### Java 接入

> 前提需要Java 17 运行时环境

#### 安装

``` bash
git clone https://github.com/yuyuanweb/mcp--server-article
```

#### 构建

``` bash
cd mcp--server-article
mvn clean package
```

#### 使用

1) 打开`Cherry Studio`的`设置`，点击`MCP 服务器`。
   ![cherry1.png](img/cherry1.png)


2) 点击`编辑 JSON`,将以下配置添加到配置文件中。

``` json
{
  "mcpServers": {
    "articleServer": {
      "command": "java",
      "args": [
        "-Dspring.ai.mcp.server.stdio=true",
        "-Dspring.main.web-application-type=none",
        "-Dlogging.pattern.console=",
        "-jar",
        "/Users/gulihua/IdeaProjects/mcp-server-article/target/mcp-server-0.0.1-SNAPSHOT.jar"
      ],
      "env": {
        "JUEJIN_COOKIE": "掘金的cookie",
        "CNBLOG_COOKIE": "博客园的cookie",
        "CNBLOG_TOKEN": "博客园的x-xsrf-token",
        "CSDN_COOKIE": "CSDN的cookie"
      }
    }
  }
}
```

![cherry2.png](img/cherry2.png)

3) 在设置-模型服务里选择一个模型，输入API密钥，选择模型设置，勾选下工具函数调用功能。
   ![cherry3.png](img/cherry3.png)
4) 在输入框下面勾选开启MCP服务。
   ![cherry4.png](img/cherry4.png)
5) 配置完成，然后查询牛客的用户真实面经，AI生成文章，然后发布到CSDN、掘金、博客园。
   ![cherry5.png](img/cherry5.png)

#### 代码调用

1) 引入依赖

``` java
        <dependency>
            <groupId>com.alibaba.cloud.ai</groupId>
            <artifactId>spring-ai-alibaba-starter</artifactId>
            <version>1.0.0-M6.1</version>
        </dependency>
    <dependency>
      <groupId>org.springframework.ai</groupId>
      <artifactId>spring-ai-mcp-client-spring-boot-starter</artifactId>
      <version>1.0.0-M6</version>
    </dependency>
```

2) 配置MCP服务器
   需要在application.yml中配置MCP服务器的一些参数：

``` yaml
spring:
  ai:
    mcp:
      client:
        stdio:
          # 指定MCP服务器配置文件
          servers-configuration: classpath:/mcp-servers-config.json
  mandatory-file-encoding: UTF-8
```

其中mcp-servers-config.json的配置如下：

``` json
{
  "mcpServers": {
    "articleServer": {
      "command": "java",
      "args": [
        "-Dspring.ai.mcp.server.stdio=true",
        "-Dspring.main.web-application-type=none",
        "-Dlogging.pattern.console=",
        "-jar",
        "/Users/gulihua/IdeaProjects/mcp-server-article/target/mcp-server-0.0.1-SNAPSHOT.jar"
      ],
      "env": {
        "JUEJIN_COOKIE": "掘金的cookie",
        "CNBLOG_COOKIE": "博客园的cookie",
        "CNBLOG_TOKEN": "博客园的x-xsrf-token",
        "CSDN_COOKIE": "CSDN的cookie"
      }
    }
  }
}
```
客户端我们使用阿里巴巴的通义千问模型，所以引入spring-ai-alibaba-starter依赖，如果你使用的是其他的模型，也可以使用对应的依赖项，比如openAI引入`spring-ai-openai-spring-boot-starter` 这个依赖就行了。
配置大模型的密钥等信息：
``` yaml
spring:
  ai:
    dashscope:
      api-key: ${通义千问的key}
      chat:
        options:
          model: qwen-max
```
通义千问的key可以直接去[官网](https://help.aliyun.com/zh/model-studio/developer-reference/get-api-key?spm=a2c4g.11186623.0.0.7399482394LUBH) 去申请，模型我们用的是通义千问-Max。
3) 初始化聊天客户端
``` java
@Bean
public ChatClient initChatClient(ChatClient.Builder chatClientBuilder,
                                 ToolCallbackProvider mcpTools) {
    return chatClientBuilder
    .defaultTools(mcpTools)
    .build();
}
```
4) 接口调用
``` java
    @PostMapping(value = "/ai/answer/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> generateStreamAsString(@RequestBody AskRequest request) {

        Flux<String> content = chatClient.prompt()
                .user(request.getContent())
                .stream()
                .content();
        return content
                .concatWith(Flux.just("[complete]"));

    }
```