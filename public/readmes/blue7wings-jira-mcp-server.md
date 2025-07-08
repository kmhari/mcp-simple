# JIRA MCP Server
The JIRA MCP Server integrates JIRA services with MCP, allowing you to fetch JIRA content through MCP for use with LLM. Please note that this is a very early version of the project.

## Environment Variables Configuration
To ensure the service runs correctly, you need to configure the following environment variables:
```
JIRA_API_KEY=
JIRA_EMAIL=
JIRA_URL=
```
You can generate the `JIRA_API_KEY` at this [link](https://id.atlassian.com/manage-profile/security/api-tokens). For `JIRA_EMAIL`, please check your Profile. The `JIRA_URL` should be the current address you are using, for example: https://foobar.atlassian.net.

## Running the Server
The simplest way to run the server is by using the following command:

```go
go run main.go
```
Alternatively, you can compile it into a binary for any platform you prefer. Once the server is running successfully, it will start an SSE service at https://localhost:8080/sse. You can then connect to this endpoint using any MCP client that supports SSE.