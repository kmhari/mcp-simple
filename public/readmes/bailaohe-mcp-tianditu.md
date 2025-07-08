# 天地图 MCP Server

## 概述

天地图API现已全面兼容MCP协议，提供了一套符合MCP协议标准的地理信息服务接口。

天地图提供的MCP Server，包含6个符合MCP协议标准的API接口，涵盖地理编码、逆地理编码、周边检索、行政区内搜索、驾驶规划、公交规划等核心地图服务功能。

依赖MCP Python SDK，任意支持MCP协议的智能体助手（如Claude、Cursor以及千帆AppBuilder等）都可以快速接入。

## 工具

### 地理编码 addr_to_geocode

**描述**: 将地址解析为对应的位置坐标，地址结构越完整，地址内容越准确，解析的坐标精度越高。

**参数**: 
- address: 待解析的地址（如：北京市海淀区莲花池西路28号）地址结构越完整，解析精度越高。

**输出**: 
- 地址经纬度信息数据字典，包含如下键：
  - lon (float): 经度 (gcj02ll)
  - lat (float): 纬度 (gcj02ll)
  - score (int): 置信度评分, 分值范围0-100, 分值越大精度越高
  - keyWord (str): 输入的地址内容

### 逆地理编码 geocode_to_addr

**描述**: 根据纬经度坐标, 获取对应位置的地址描述, 所在行政区划, 道路以及相关POI等信息

**参数**:
- latitude: 纬度 (gcj02ll)
- longitude: 经度 (gcj02ll)

**输出**: 
- 地址经纬度信息数据字典，包含如下键：
  - formatted_address (str): 格式化地址信息
  - addressComponent (dict): 地址信息
    - nation (str): 国家
    - province (str): 省
    - city (str): 市
    - county (str): 区
    - town (str): 镇/县
    - road (str): 道路
  - location (dict): 输入的经纬度信息
    - lon (float): 经度 (gcj02ll)
    - lat (float): 纬度 (gcj02ll)

### 周边检索 search_by_redius

**描述**: 设置圆心和半径，检索圆形区域内的地点信息（常用于周边检索场景）。

**参数**:
- query: 检索关键字, 可直接使用名称或类型, 如'query=天安门'
- latitude: 纬度 (gcj02ll)
- longitude: 经度 (gcj02ll)
- radius: 半径 (米)

**输出**: 
- 周边查询结果数据字典，包含如下键：
  - keyWord (str): 输入的检索关键字
  - count (int): 检索结果总数
  - pois(list[dict]): POI结果元素列表，每个元素包含如下键：
    - name (str): Poi点名称
    - address (str): Poi点地址
    - lonlat (str): 经纬度 (gcj02ll)，格式为：经度,纬度
    - phone (str): 联系电话
    - distance (str): 距离（单位 m,km），1千米以下单位为米（m），1千米以上单位为千米（km）

## 资源

### 行政区划编码表 tdt://admin-code

**描述**: 中国行政区划编码，包括省市区。

### 数据分类编码表 tdt://data-type

**描述**: 数据分类编码表，包含餐馆、商店、医院等各类POI分类编码。

## 开始

使用天地图MCP Server主要通过两种形式，分别是Python和Typescript，下面分别介绍。

### 获取AK

在选择两种方法之前，你需要在天地图开放平台的控制台中创建一个服务端AK，通过AK你才能够调用天地图API能力。

获取方式请参考: https://console.tianditu.gov.cn/api/key

### Python接入

#### 安装

使用pip安装mcp-tianditu：

```bash
pip install mcp-tianditu
```

安装后，我们可以使用以下命令将其作为脚本运行：

```bash
python -m mcp_tianditu
```

#### 配置

在任意MCP客户端（如Claude.app）中添加如下配置，部分客户端下可能需要做一些格式化调整。

其中TIANDITU_API_KEY对应的值需要替换为你自己的AK。

```json
{
    "mcpServers": {
        "tianditu-map": {
            "command": "python",
            "args": [
                "-m",
                "mcp_tianditu"
            ],
            "env": {
                "TIANDITU_API_KEY": "你的天地图API密钥"
            }
        }
    }
}
```

如果使用uv配置，配置内容如下：
```json
{
    "mcpServers": {
        "tianditu-map": {
            "command": "uvx",
            "args": [
                "mcp-tianditu"
            ],
            "env": {
                "TIANDITU_API_KEY": "你的天地图API密钥"
            }
        }
    }
}
```


## 效果

接下来就可以进行提问，验证出行规划小助手的能力了。

### 示例1：地址查询

```
请帮我查询北京市海淀区中关村的位置坐标
```

### 示例2：周边检索

```
我现在在北京天安门（39.908823, 116.397470），请帮我找出5公里内的博物馆
```

### 示例3：位置信息查询

```
请告诉我坐标（39.908823, 116.397470）对应的地址信息
```

### 示例4：行政区内查询

```
请帮我查询北京市海淀区内的大学
```

### 示例5：驾驶规划

```
请帮我规划从北京市海淀区中关村到北京市朝阳区国贸的驾车路线
```

### 示例6：公交规划

```
请帮我规划从北京西站到北京站的公交路线
```

## 通过千帆AppBuilder平台接入

千帆平台接入，目前支持SDK接入或是API接入，通过AppBuilder构建一个应用，每个应用拥有一个独立的app_id，在python文件中调用对应的app_id，再调用天地图 Python MCP Tool即可。

模板代码可向下跳转，通过SDK Agent && 天地图MCP Server，拿到位置信息及周边POI信息，并给出出行建议。

### Agent配置

前往千帆平台，新建一个应用，并发布。

将Agent的思考轮数调到6。发布应用。

### 调用

此代码可以当作模板，以SDK的形式调用千帆平台上已经构建好且已发布的App，再将MCP Server下载至本地，将文件相对路径写入代码即可。

（注意：使用实际的app_id、token、query、mcp文件）

```python
import os
import asyncio
import appbuilder
from appbuilder.core.console.appbuilder_client.async_event_handler import (
    AsyncAppBuilderEventHandler,
)
from appbuilder.mcp_server.client import MCPClient

class MyEventHandler(AsyncAppBuilderEventHandler):
    def __init__(self, mcp_client):
        super().__init__()
        self.mcp_client = mcp_client
    
    def get_current_weather(self, location=None, unit="摄氏度"):
        return "{} 的温度是 {} {}".format(location, 20, unit)
    
    async def interrupt(self, run_context, run_response):
        thought = run_context.current_thought
        # 绿色打印
        print("\033[1;31m", "-> Agent 中间思考: ", thought, "\033[0m")
        tool_output = []
        for tool_call in run_context.current_tool_calls:
            tool_res = ""
            if tool_call.function.name == "get_current_weather":
                tool_res = self.get_current_weather(**tool_call.function.arguments)
            else:
                print(
                    "\033[1;32m",
                    "MCP工具名称: {}, MCP参数:{}\n".format(tool_call.function.name, tool_call.function.arguments),
                    "\033[0m",
                )
                mcp_server_result = await self.mcp_client.call_tool(
                    tool_call.function.name, tool_call.function.arguments
                )
                print("\033[1;33m", "MCP结果: {}\n\033[0m".format(mcp_server_result))
                for i, content in enumerate(mcp_server_result.content):
                    if content.type == "text":
                        tool_res += mcp_server_result.content[i].text
            tool_output.append(
                {
                    "tool_call_id": tool_call.id,
                    "output": tool_res,
                }
            )
        return tool_output
    
    async def success(self, run_context, run_response):
        print("\n\033[1;34m", "-> Agent 非流式回答: ", run_response.answer, "\033[0m")

async def agent_run(client, mcp_client, query):
    tools = mcp_client.tools
    conversation_id = await client.create_conversation()
    with await client.run_with_handler(
        conversation_id=conversation_id,
        query=query,
        tools=tools,
        event_handler=MyEventHandler(mcp_client),
    ) as run:
        await run.until_done()

### 用户Token
os.environ["APPBUILDER_TOKEN"] = ""

async def main():
    appbuilder.logger.setLoglevel("DEBUG")
    ### 发布的应用ID
    app_id = ""
    appbuilder_client = appbuilder.AsyncAppBuilderClient(app_id)
    mcp_client = MCPClient()
    
    ### 注意这里的路径为MCP Server文件在本地的相对路径
    await mcp_client.connect_to_server("./<YOUR_FILE_PATH>/main.py")
    print(mcp_client.tools)
    await agent_run(
        appbuilder_client,
        mcp_client,
        '请帮我查询北京市海淀区中关村的位置坐标',
    )
    await appbuilder_client.http_client.session.close()

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
```

### 效果

经过Agent自己的思考，通过调用MCPServer 地理编码服务、逆地理编码服务、周边检索服务等多个tool，拿到位置信息及周边POI信息，并给出出行建议。

实际用户请求："请帮我规划一次北京故宫一日游，并考虑周边的餐饮和交通。"

## 说明

在天地图MCP Server中传入的部分参数规格:

- 行政区划编码均采用天地图adcode映射表。
- 经纬度坐标均采用国测局经纬度坐标gcj02ll。
- 类型等中文字符串参数应符合天地图POI类型标准。

## 许可

MIT
