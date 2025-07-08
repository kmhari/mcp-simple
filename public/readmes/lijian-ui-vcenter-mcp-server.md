# vCenter-mcp-server

#### 介绍
vCenter-mcp-server 是一款专为 vCenter Server 设计的 MCP（Model Context Protocol）服务器工具，旨在简化虚拟机管理任务。通过与 vCenter Server 的无缝集成，该工具为用户提供了一个高效、便捷的接口，以执行虚拟机迁移和查询等操作。

#### 功能特性
- vCenter Server 连接：支持与 vCenter Server 的稳定连接，确保对虚拟化环境的全面访问。
- 虚拟机迁移：允许用户将虚拟机从一台宿主机迁移到另一台宿主机，支持单个虚拟机、多个虚拟机以及整个宿主机的批量迁移。
- 虚拟机信息查询：提供宿主机上虚拟机的详细信息查询功能，帮助用户快速了解虚拟机状态。

#### 主要功能
- 创建虚拟机：
- 迁移虚拟机：支持多种迁移场景，满足不同用户需求。
- 列出虚拟机信息：清晰展示宿主机上各虚拟机的关键信息。

更多功能持续更新中


#### 使用说明

 1.  克隆代码：从 Gitee 仓库克隆项目代码。
```
git@gitee.com:rooky-top/vcenter-mcp-server.git
```

2.  安装依赖：使用 pip 安装项目所需的依赖。

```
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

3.  修改配置文件 ：修改 `.env` 文件，填写 vCenter Server 的连接信息。
```
VCENTER_HOST=192.168.103.66
VCENTER_USER=administrator@vsphere.local
VCENTER_PASSWORD=Password
```
  **配置说明** 
| 配置项  | 说明  | 必填  |
|---|---|---|
| VCENTER_HOST  | vCenter服务器地址	  |  是 |
| VCENTER_USER  |  登录用户名	 | 是  |
|  VCENTER_PASSWORD |登录密码	   | 是  |
3.  运行服务器：推荐使用 mcp-proxy 以 SSE 模式运行服务。
```
 mcp-proxy --sse-host=0.0.0.0 --sse-port=8080 uv run vMotion_server.py 
```
4.  配置 MCP 客户端：在 MCP 客户端配置文件中添加 vCenter-mcp 服务器的配置。
```
{
  "mcpServers": {
    "vCenter-mcp": {
      "url": "http://localhost:8080/sse"
    }
  }
}
```




#### 工具说明

1.创建虚拟机
```
{
    "host_ip": 宿主机IP地址,
    "vm_name": 虚拟机名称,
    "cpu_count": CPU数量,
    "memory_mb": 内存大小（MB）,
    "disk_size_gb": 硬盘大小（GB），
    "datastore_name": 硬盘存放的datastore名称,
    "network_name":网络名称
}
```
![输入图片说明](png/screenshot_2025-04-25_11-22-16.png)

2.迁移虚拟机

支持：
- 传入单个虚拟机名称字符串，迁移该虚拟机到目标主机
- 传入多个虚拟机名称列表，迁移这些虚拟机到目标主机
- 传入宿主机IP字符串，批量迁移该宿主机下所有虚拟机到目标主机

```
{
    "vm_names_or_source_host_ip":  单个虚拟机名称（str）、多个虚拟机名称列表（list[str]）或宿主机IP（str）,
    "target_host_ip": 目标宿主机IP地址
}
```
![输入图片说明](png/screenshot_2025-04-25_11-27-43.png)

3.列出虚拟机
```
{
    "host_name": ESXi 宿主机的名称或 IP 地址
}
```
![输入图片说明](png/screenshot_2025-04-25_11-29-03.png)

4.关闭宿主机(DELL务器)
```
{
    "host_name": ESXi 宿主机的名称或 IP 地址
}
```

4.开启宿主机(DELL务器)
```
{
    "bmc_ip": ESXi 宿主机的idrac IP 地址
}
```

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
