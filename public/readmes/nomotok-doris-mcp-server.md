# **📖 Doris-MCP-Lite**

A lightweight **MCP server** designed for connecting to **Apache Doris** or other **MySQL compatible** database schemas, providing tools and prompts for LLM applications.

This server enables LLMs and MCP clients to explore database schemas, run read-only SQL queries, and leverage pre-built analytical prompts — all through a standardized, secure MCP interface.

> [!WARNING]
> This is an early developer version of doris-mcp-lite. Some functions may not operate properly and minor bugs may exist. If you have any quesions, please open an [issue](https://github.com/NomotoK/Doris-MCP-Lite/issues).
> The official Apache Doris MCP server is available at [apache/doris-mcp-server](https://github.com/apache/doris-mcp-server)

## **🚀 Features**

### **🛠️ Tools**

- Execute **read-only SQL queries** against your Doris database.
- Perform **data analysis operations** such as retrieving yearly, monthly, and daily usage data.
- Query metadata such as **database schemas**, **table structures**, and **resource usage**.
- Connection Pooling: Efficient **connection management with pooling** to optimize performance.
- Asynchronous Execution: Support for **asynchronous query** execution to improve responsiveness.

### **🧠 Prompts**

- Built-in prompt templates to assist LLMs in asking **analytics questions**.
- Support for **multi-role prompting** to enhance the interaction between LLMs and the Doris database.
- Support for **user-defined** and **general-purpose** SQL analysis prompts.

### **🗂️ Resources**

- Expose your Doris **database schema** as **structured resources**.
- Allow LLMs to **contextually access** table and field definitions to improve query understanding.

## **📦 Installation Options**

We recommend using [uv](https://docs.astral.sh/uv/) to manage your Python environment.

### **Option 1: Install via shell script**

> **Recommended for personal and server deployment**

This is the easiest way to install. Please copy the [`setup.sh`](setup.sh)  file in project and run it locally. For more information please refer: [Doris MCP install guide](INSTALL.md)

1. Copy the [`setup.sh`](setup.sh) to local.
2. Make the script executable:

```bash
chmod +x setup.sh
```

3. Run the script:

```bash
./setup.sh
```

The script will automatically install the server and help you walk through database configuration.

### **Option 2: Install via `pip`**

> **Recommended for production usage**

```bash
pip install doris-mcp-lite
```

✅ After installation, the command-line tool server will be available to launch the MCP server.

### **Option 3: Clone the source and install manually**

> **Recommended if you want to modify the server**

1. Fork and clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/doris-mcp-lite.git
cd doris-mcp-lite
```

1. Set up a local Python environment using [uv](https://github.com/astral-sh/uv):

```bash
uv venv # Create a virtual environment
uv sync # Install dependencies

# Activate the virtual environment
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

uv pip install
```

1. Add this server to your LLM client or Run the server:

```bash
uv run server doris://user:pass@localhost:9030/mydb
```

### **Option 4: Install using uv directly**

> **For local editable installations**

```bash
uv pip install 'git+https://github.com/NomotoK/doris-mcp-lite.git'
uv sync
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

uv pip install -e .

uv run server doris://user:pass@localhost:9030/mydb
```

## **⚙️ Post-Installation Setup**

### **Step 1: Configure `.env` file (optional)**

Use the .env file to permanently save your database connection information in the MCP server, so you do not need to enter the database connection every time you run the MCP server with CLI. Of course, **this step is not necessary**, if you are using a MCP-capatible LLM client, you can also **set up a database connection in the configuration file** of the MCP client later (See step2). Please follow these steps to finish configuration:

#### **Configure through shell script**

This is the most recommended and easiest way to setup. Please refer to [Doris MCP install guide](INSTALL.md).

#### **Configure manually in `.env`**

After installing, navigate to the `doris_mcp_lite/config/` directory inside your project directory. If you are using pip, your package will be installed in Python site-packages:

- **Mac/Linux:** `/Users/YOUR_USERNAME/.local/lib/python3.x/site-packages/doris_mcp_lite/config/`

- **Windows:** `C:\Users\YOUR_USERNAME\AppData\Local\Programs\Python\Python3x\Lib\site-packages\doris_mcp_lite\config\`

You can run the following command to locate pip install location:

```bash
pip show doris-mcp-lite
```

You will find a `.env.example` file:

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Edit .env to set your **Doris** database connection information:

```bash
DB_HOST=your-doris-host
DB_PORT=9030
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database

MCP_SERVER_NAME=DorisAnalytics
DEBUG=false
```

> [!NOTE]
> If `.env `is missing, the server will attempt to auto-create it from `.env.example` but you must manually fill in correct credentials.

### **Step 2: Configure MCP Client**

To connect this server to an MCP-compatible client (e.g., Claude Desktop, CherryStudio, Cline), you need to modify your MCP client configuration JSON.

Example if you are using CherryStudio:

- name: doris-mcp-lite
- type: stdio
- command: absolute/path/to/your/uv
- arguments:

```bash
--directory
/Users/hailin/dev/Doris-MCP-Lite
run
server
doris://user:pass@localhost:9030/mydb
```


Example if you are installing with pip (`mcp_setting.json`):

```json
{
  "mcpServers": {
    "DorisAnalytics": {
      "command": "server",
      "args": ["doris://user:pass@localhost:9030/mydb"],
      "transportType": "stdio"
    }
  }
}
```

If you are installing with source code/uv or using [`setup.sh`](setup.sh):

```json
{
"mcpServers": {
	"DorisAnalytics": {
		"disabled": false,
		"timeout": 60,
		"command": "absolute/path/to/uv",
		"args": [
			"--directory",
			"absolute/path/to/mcp/server",
			"run",
			"server"
			"doris://user:pass@localhost:9030/mydb"
		],
		"transportType": "stdio"
		}
	}

}
```
Note that you can use `uv` and `server` instead of passing absolute path in config file, but you need to make sure that `uv` is in your `PATH`.

**Connection URL**

Remember to replace `doris://user:pass@localhost:9030/mydb` with your actual database connection string.

For more information on how to configure your client, please refer to :

[For Server Developers - Model Context Protocol - Claude](https://modelcontextprotocol.io/quickstart/server)

[Config and Using MCP | CherryStudio](https://docs.cherry-ai.com/advanced-basic/mcp/config)

✅ Now your LLM client will discover Doris Analytics tools, prompts, and resources through the MCP server.

---

## **🖥️ Usage**

### **Testing MCP server (optional)**

Before you start, you can run the `test.py` in the project `src/doris-mcp-lite` directory to directly call the MCP Server functional interface to test database connection, resources, tools, etc. without using LLM (such as Claude, GPT, etc. models). You can control what functions to test by passing arguments through the command line.

Test all resources exposed by the server:

```bash
python test.py --server server.py --test resources
```

or test all the tools provided by the server:

```bash
python test.py --server server.py --test tools
```

or test database connection:

```bash
python test.py --server "doris://user:pass@localhost:9030/mydb" --test dbconfig
```

or test all functions of resources, tools, and prompt words at one time:

```bash
python test.py --server server.py --test all
```

### **Testing Database connection and run server**

Launch the MCP server by running the command:

```bash
server doris://user:pass@localhost:9030/mydb
```

Or manually:

```bash
python -m doris_mcp_lite.server doris://user:pass@localhost:9030/mydb
```

The server immediately attempts to connect to the database. If the connection is successful, after startup, you should see:

```bash
🚀 Doris MCP Server is starting...
[DorisConnector] Connected to 127.0.0.1:9030
✅ Database connection successful.
[DorisConnector] Connection closed.
```

You can now use the tools and prompts inside your MCP client.

## **📚 Project Structure Overview**

```bash
src/
└── doris_mcp_lite/
	├── config/             # Configuration files
	│   ├── __init__.py
	│   ├── config.py       # Loads environment variables
	│   ├── .env.example    # Environment variables template
	│   └── .env            # Stores your database credentials
	│
	├── db/                 # Database interaction logic
	│   ├── __init__.py
	│   ├── db.py           # Doris database connection class
	│   └── tools.py        # SQL query execution tools
	│
	├── res/                # Resource definitions (e.g., schemas)
	│   ├── __init__.py
	│   └── resources.py
	│
	├── prompts/            # Prebuilt prompt templates
	│   ├── __init__.py
	│   ├── general_prompts.py
	│   └── customize_prompts.py
	│
	├── __init__.py         # Main entry point to start the MCP server
	├── server.py           # Server launcher
	├── mcp_app.py          # MCP server instance
	└── test.py             # Unit test script
README.md                   # Documentation
INSTALL.md                  # Installation guide
LISENCE                     # Lisence
setup.sh                    # Auto setup wizard
pyproject.toml              # Project build configuration
.gitignore                  # Git ignore settings
```

## **📜 License**

This project is licensed under the [MIT License](LICENSE).

## **🌟Acknowledgements**

- Built using the [MCP Python SDK](https://pypi.org/project/mcp/).
- Based on: [MCP](https://modelcontextprotocol.io/introduction): The Model Context Protocol, a standard for LLMs to interact with external data sources.
- [Apache Doris](https://doris.apache.org/): An open-source, high-performance, real-time analytical database.
- [Apache Doris Official MCP Server](https://github.com/apache/doris-mcp-server): The official MCP server for Apache Doris.
- [PyMySQL](https://pypi.org/project/PyMySQL/): A Python MySQL client library for database interaction.
- Inspired by MCP official examples and best practices.
---

## **🤝 Contributions**

Contributions are welcome! Feel free to open issues or submit pull requests.