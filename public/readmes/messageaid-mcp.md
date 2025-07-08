# Broker MCP

This is the [Message Aid MCP server](https://messageaid.com/docs/reference/mcp). The goal is to support the three main brokers 
of Message Aid, RabbitMQ, Azure Service Bus, and SQS.

## Resources

| Resource      | Rabbit MQ | Azure Service Bus | SQS     |
|---------------|-----------|-------------------|---------|
| Queues        | ✅         | Planned           | Planned |
| Topics        | ✅         | Planned           | Planned |
| Subscriptions | Planned   | Planned           | Planned |

A `broker` is in rabbitmq speak a HOST + VHOST

- Queue: `rabbitmq://broker/queues/name`
- Topic: `rabbitmq://broker/topics/name`
  - An Exchange in RabbitMQ
- Subscription: `rabbitmq://broker/subscription/base64(source, destinationType, destinationName, propertiesKey)`
  - A Binding in RabbitMQ

- `azure://broker/name`
- `sqs://localhost/vhost/name`

## Tools

| Action      | Rabbit MQ | Azure Service Bus | SQS     |
|-------------|-----------|-------------------|---------|
| Purge Queue | ✅         | Planned           | Planned | 


## Usage

| Transport  | ...                                                                                             |
|------------|-------------------------------------------------------------------------------------------------|
| STDIO      | ✅                                                                                               |
| Streamable | [Planned](https://github.com/modelcontextprotocol/csharp-sdk/issues/157) (based on SDK Support) |

### Via Docker

```sh
docker run -i --rm \
  --env 'BROKER_URL=rabbitmq://guest:guest@localhost:15672/' \
  ghcr.io/messageaid/mcp
```

### Sample Json Config for Cursor, etc

```json
{
  "mcpServers": {
    "messageAid": {
      "command": "docker",
      "args": [
        "run", 
        "-i", 
        "--rm", 
        "--env 'BROKER_URL=rabbitmq://guest:guest@localhost:15672/'",
        "docker pull ghcr.io/messageaid/mcp:latest"]
    }
  }
}
```

## Configuration

| Env Var    | ...                                    |
|------------|----------------------------------------|
| BROKER_URL | The broker to connect to in URL format |
| MCP_MODE   | ReadOnly                               | 
|            | MessageAllowed                         | 
|            | BrokerAllowed                          | 

## Building

Built using dotnet and the [MCP C# SDK](https://github.com/modelcontextprotocol/csharp-sdk)

```sh
docker build -t ghcr.io/messageaid/mcp -f Dockerfile .
```



## Licence

This MCP server is licensed under the BSL 1.1 License. For more details,
see the LICENSE file in the project repository.