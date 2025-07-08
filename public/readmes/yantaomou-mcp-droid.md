# MCPDroid

MCPDroid是一个基于模型上下文协议(Model Context Protocol, MCP)的Android设备控制服务，旨在使大型语言模型(如Claude, GPT等)能够通过标准化接口直接控制和操作Android设备。

## 功能特点

- 通过MCP协议为大模型提供Android设备控制能力
- 支持屏幕操作（点击、滑动、截图等）
- 支持设备控制（返回键、电源键、音量键等）
- 支持应用管理（启动、停止、安装、卸载等）
- 支持文本输入和按键模拟
- 提供设备信息查询功能
- 支持高级图像识别和OCR文字识别功能

## 系统要求

- Python 3.8+
- ADB工具
- Android设备（Android 7.0+）

## 安装步骤

1. 克隆仓库

```bash
git clone <repository-url>
cd mcp_droid
```

2. 安装依赖

```bash
pip install -r requirements.txt
```

3. 确保Android设备已通过USB或网络连接到电脑，并已开启USB调试模式

## 使用方法

### 启动服务

```bash
python main.py --adb-path <adb路径> --host <主机地址> --port <端口>
```

参数说明：
- `--adb-path`: ADB命令路径，默认为"adb"
- `--device-id`: 设备ID，多设备时需要指定
- `--host`: 监听主机地址，默认为"0.0.0.0"
- `--port`: 监听端口，默认为8000
- `--debug`: 开启调试模式

### 在Claude桌面客户端中配置

在Claude Desktop的配置文件中添加：

```json
{
  "mcpServers": {
    "android": {
      "type": "sse",
      "url": "http://localhost:8000/jsonrpc"
    }
  }
}
```

### 在Cursor中配置

在Cursor的配置文件中添加：

```json
{
  "mcp": {
    "servers": {
      "android": {
        "transport": "http",
        "url": "http://localhost:8000/jsonrpc"
      }
    }
  }
}
```

## 工具列表

MCPDroid提供以下主要功能工具：

### 屏幕操作相关
- `get_screen_size`: 获取屏幕尺寸
- `take_screenshot`: 截取屏幕截图
- `tap_screen`: 点击屏幕
- `long_press`: 长按屏幕
- `swipe`: 滑动屏幕
- `slide_screen`: 上下滑动屏幕
- `multi_touch`: 多点触控操作
- `pinch`: 双指缩放操作

### 设备控制相关
- `press_back`: 点击返回键
- `go_to_home`: 返回桌面
- `press_power`: 按下电源键
- `keyevent`: 发送按键事件
- `unlock_screen`: 解锁屏幕
- `adjust_volume`: 调节音量
- `rotate_screen`: 控制屏幕旋转
- `set_brightness`: 设置屏幕亮度

### 文本输入相关
- `type_text`: 输入文本
- `switch_ime`: 切换输入法
- `paste_text`: 粘贴文本
- `clear_text`: 清除文本

### 应用管理相关
- `start_app`: 启动应用
- `stop_app`: 停止应用
- `list_apps`: 列出已安装应用
- `open_url`: 打开网址
- `get_current_app`: 获取前台应用信息
- `check_app_installed`: 检查应用是否已安装
- `monitor_app_start`: 监控应用启动

### 设备信息相关
- `get_device_info`: 获取设备信息
- `list_devices`: 列出已连接设备
- `get_battery_info`: 获取设备电量信息
- `get_storage_info`: 获取设备存储信息

### 高级功能相关
- `execute_shell`: 执行Shell命令
- `image_recognition`: 图像识别与匹配
- `ocr_recognition`: OCR文字识别
- `capture_logs`: 截取系统日志
- `wake_device`: 唤醒设备
- `sleep_device`: 休眠设备
- `explore_app`: 探索应用界面
- `file_operations`: 文件操作(上传/下载)
- `check_root`: 设备root检测
- `connect_over_tcp`: TCP/IP连接设备
- `record_and_replay`: 脚本录制和回放
- `run_test_case`: 自动化测试用例执行
- `monitor_performance`: 性能监控
- `screenshot_watcher`: 设备截屏监听器
- `multi_device_management`: 多设备管理与操作

### 网络与连接相关
- `toggle_wifi`: 设置WiFi开关
- `toggle_bluetooth`: 设置蓝牙开关
- `toggle_mobile_data`: 设置移动数据开关
- `toggle_airplane_mode`: 设置飞行模式
- `connect_wifi`: 连接到指定WiFi
- `get_wifi_info`: 获取当前WiFi详细信息

### 多设备协作相关
- `device_messaging`: 设备间消息传递
- `sync_operations`: 多设备同步操作
- `device_group_actions`: 设备组操作
- `share_between_devices`: 设备间文件共享

## 项目结构

```
MCPDroid
├── core/                  # 核心模块
│   ├── __init__.py
│   ├── mcp_server.py      # MCP协议服务器
│   ├── device_controller.py  # 设备控制基类
│   ├── app_controller.py  # 应用管理控制器
│   ├── system_controller.py  # 系统信息控制器
│   └── advanced_controller.py # 高级功能控制器
├── tools/                 # MCP工具
│   ├── __init__.py
│   └── android_tools.py   # Android设备控制工具
├── static/                # 静态资源
│   └── screenshot/        # 截图存储目录
├── main.py                # 主程序入口
└── README.md              # 项目文档
```

## 常见问题解决方案

1. 如果遇到ADB连接问题，请确保：
   - 设备已开启USB调试
   - 已在设备上允许来自电脑的调试
   - ADB守护进程已启动（可尝试`adb kill-server`然后`adb start-server`）

2. 如果需要使用高级图像识别功能，请确保已安装相关依赖：
   - Airtest: `pip install airtest`
   - OpenCV: `pip install opencv-python`

3. 如果需要使用OCR功能，请确保已安装Tesseract和相关Python包：
   - `pip install pytesseract`
   - 安装Tesseract OCR引擎

## 参考资料

- [Model Context Protocol 规范文档](https://github.com/anthropics/anthropic-cookbook/tree/main/mcp)
- [ADB命令行文档](https://developer.android.com/studio/command-line/adb)
- [Airtest文档](https://airtest.readthedocs.io/)

## 许可证

[MIT License](LICENSE) 