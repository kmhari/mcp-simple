# kube-mcp

## Get a Gemini APi Key
Goto https://aistudio.google.com/ and get yourself an API Key. Currently, gemini-2.0-pro-exp-02-05 LLM is available absolutely free of charge. Other models available for very cheap price also.

## Install Codename Goose
Goose is an open source AI agent that supercharges your software development by automating coding tasks. We will use Codename Goose as it has a built in MCP client. Install Codename Goose by following the steps here https://block.github.io/goose/docs/getting-started/installation. Setup GOOGLE_API_KEY environment variable so that Goose knows to use Gemini API. Understand how to configure using `goose configure` and start as session using `goose session`. 

## Develop MCP Server
Read about MCP by reading the documentation : https://modelcontextprotocol.io/introduction and specifically the Python SDK : https://github.com/modelcontextprotocol/python-sdk
Clone this repository and test it using `mcp dev server.py`. Note that this project uses `uv` package manager instead of pip. Learn about `uv` by reading docs : https://github.com/astral-sh/uv
This project uses the kubernetes python client: https://github.com/kubernetes-client/python

## Install Minikube
Install minikube by following isntructions : https://minikube.sigs.k8s.io/docs/start/?arch=%2Flinux%2Fx86-64%2Fstable%2Fbinary+download
Ensure that the config to the cluster is provided to the MCP server. Look at the `KubernetesManager` and `config.load_kube_config()` to understand how the config is loaded. 

## Connect your MCP server to Codename Goose
Add the MCP Server as an extension by reading the following docs : https://block.github.io/goose/docs/getting-started/using-extensions
Start a new goose session using command `goose session --with-builtin developer --with-extension "uvx kube-mcp"` 

## Make it all work
Try giving a command in Goose and make it interact with Minikube using the MCP Server
