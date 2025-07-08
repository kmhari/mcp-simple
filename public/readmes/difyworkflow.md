## mcp-difyworkflow-server

mcp-difyworkflow-server is an mcp server Tools application that implements the query and invocation of Dify workflows, supporting the on-demand operation of multiple custom Dify workflows.

## INSTALL

```shell
git clone https://github.com/gotoolkis/mcp-difyworkflow-server.git

# build by go
cd mcp-difyworkflow-server
go build .

## or use make build
make build
```

## Configuration

```json
{
  "mcpServers": {
    "mcp-difyworkflow-server": {
      "command": "mcp-difyworkflow-server",
      "args": ["-base-url", "http://localhost/v1"],
      "env": {
        "DIFY_WORKFLOW_NAME": "workflow-translator“,workflow-genImag",
        "DIFY_API_KEYS": "appkey-xxxxxxxxxxxa,appkey-xxxxxxxxxxxb"
      }
    }
  }
}
```

- **"base-url":"http://localhost/v1"**

  The base URL of the Dify platform api server url.

- **"command":"mcp-difyworkflow-server"**

  You can specify the absolute path for the compiled binary, or create a symbolic link with:<br>
  "sudo ln -s \<gitWorkPath\>/mcp-difyworkflow-server /usr/local/bin/mcp-difyworkflow-server"

- **DIFY_WORKFLOW_NAME、DIFY_API_KEYS**

  Need to correspond one by one in order.<br>
  Workflow name can be self-defined by the user in the Prompt, and the Workflow API Key needs to be generated for the corresponding workflow created on the Dify platform (refer to the relevant Dify documentation for how to generate the API KEY).

## Usage

- **list_workflows**<br>
  List authorized workflows
- **execute_workflow**<br>
  Execute a specified workflow,args: workflow_name, input
  Note: The input variable name of the **dify workflow** should be defined by default as: **"message"**

#### Samples

> prompt: **查看 mcp-difyworkflow-server 可使用的工具列表**<br>
> prompt: **给我执行 dify 名为 workflow-translator 的工作流，输入的消息为“这是一条测试消息”**

> prompt: **View the list of tools available for mcp-difyworkflow-server.**<br>
> prompt: **Execute the workflow named 'workflow-translator' for me, the input message is "This is a test message".**
