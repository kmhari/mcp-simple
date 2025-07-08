# MCP Infrastructure as Code Assistant

An MCP server for managing infrastructure as code with Terraform.

## Features

- Initialize Terraform working directories
- Generate and show execution plans
- Apply changes to infrastructure
- Destroy infrastructure
- Validate Terraform configurations
- Show current state or saved plans
- Manage Terraform workspaces

## Prerequisites

- Python 3.8 or higher
- Terraform 1.5.7 or higher
- Docker and Docker Compose (optional)

## Installation

### Local Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mcp-iac.git
   cd mcp-iac
   ```

2. Install dependencies using uv:
   ```bash
   curl -LsSf https://astral.sh/uv/install.sh | sh
   uv pip install -e .
   ```

### Docker Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mcp-iac.git
   cd mcp-iac
   ```

2. Build and run the Docker container:
   ```bash
   docker-compose up -d
   ```

## Usage

### Local Usage

1. Start the MCP server:
   ```bash
   python main.py
   ```

2. Use the MCP CLI to interact with the server:
   ```bash
   mcp terraform_init --working-dir ./terraform
   mcp terraform_plan --working-dir ./terraform
   mcp terraform_apply --working-dir ./terraform --auto-approve
   ```

### Docker Usage

1. Start the MCP server:
   ```bash
   docker-compose up -d
   ```

2. Use the MCP CLI to interact with the server:
   ```bash
   mcp terraform_init --working-dir ./terraform
   mcp terraform_plan --working-dir ./terraform
   mcp terraform_apply --working-dir ./terraform --auto-approve
   ```

## Example Terraform Configuration

The repository includes an example Terraform configuration that creates an EC2 instance in AWS:

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

resource "aws_instance" "example" {
  ami           = var.ami_id
  instance_type = var.instance_type

  tags = {
    Name = var.instance_name
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Available Tools

- `terraform_init`: Initialize a Terraform working directory
- `terraform_plan`: Generate and show an execution plan for Terraform
- `terraform_apply`: Apply the changes required to reach the desired state
- `terraform_destroy`: Destroy the infrastructure managed by Terraform
- `terraform_validate`: Validate the syntax and internal consistency of Terraform files
- `terraform_show`: Show the current state or a saved plan
- `terraform_workspace_list`: List Terraform workspaces
- `terraform_workspace_select`: Select a Terraform workspace

## Example Usage

Here's an example of how to use the MCP server with an AI agent:

1. Start the MCP server:
   ```bash
   python main.py
   ```

2. Connect to the server using an MCP client:
   ```bash
   mcp connect http://localhost:8000
   ```

3. The AI agent can now help you with Terraform operations. For example:
   - Initialize a Terraform working directory
   - Generate and review execution plans
   - Apply changes to infrastructure
   - Destroy infrastructure resources
   - Validate Terraform configurations

## Examples

Check out the `examples` directory for sample Terraform configurations that demonstrate how to use the MCP server:

- `examples/aws-s3`: A simple AWS S3 bucket example
