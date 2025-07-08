# Web Scraping with Anthropic’s MCP

[![Bright Data Promo](https://github.com/luminati-io/LinkedIn-Scraper/raw/main/Proxies%20and%20scrapers%20GitHub%20bonus%20banner.png)](https://brightdata.com/)

This guide explains how to set up an MCP server for on-demand data extraction, connect with development tools, and leverage Bright Data for instant AI-compatible web information.

- [Understanding the Limitation: Why LLMs Need Help with Real-World Interaction](#understanding-the-limitation-why-llms-need-help-with-real-world-interaction)
- [The Importance of MCP](#the-importance-of-mcp)
- [Understanding Model Context Protocol](#understanding-model-context-protocol)
- [MCP Architecture Explained](#mcp-architecture-explained)
- [Developing Your Own MCP Server](#developing-your-own-mcp-server)
- [Connecting Your MCP Server](#connecting-your-mcp-server)
- [Using Bright Data's MCP for Professional Web Data Extraction](#using-bright-datas-mcp-for-professional-web-data-extraction)
- [Further Reading](#further-reading)

## Understanding the Limitation: Why LLMs Need Help with Real-World Interaction

Large Language Models (LLMs) excel at processing and generating text from extensive training datasets. However, they face a critical constraint—they cannot naturally interact with the external world. This means they lack built-in capabilities to access local files, execute custom scripts, or retrieve current information from websites.

Consider a basic example: asking Claude to extract details from an active Amazon product page is impossible without additional tools. Why? Because it doesn't have the inherent capability to browse the internet or trigger external actions.

![claude-without-mcp](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/claude-without-mcp.png)

Without supplementary tooling, LLMs cannot perform practical tasks that depend on real-time data or integration with external systems.

This is where [Anthropic's Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol) becomes valuable. It enables LLMs to communicate with external tools—like data extractors, APIs, or scripts—in a secure and standardized manner.

Here's the difference in action. After integrating a custom MCP server, we successfully extracted structured Amazon product information directly through Claude:

![claude-amazon-product-data-extraction-results](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/claude-amazon-product-data-extraction-results.png)

## The Importance of MCP

- **Standardization:** MCP provides a uniform interface for LLM-based systems to connect with external tools and data—similar to how APIs standardized web integrations. This significantly reduces the need for custom integrations, accelerating development.
- **Flexibility and Scalability:** Developers can replace LLMs or hosting platforms without rewriting tool integrations. MCP supports multiple communication methods (such as `stdio`), making it adaptable to various configurations.
- **Enhanced LLM Capabilities:** By connecting LLMs to current data and external tools, MCP allows them to go beyond static responses. They can now deliver up-to-date, relevant information and trigger real-world actions based on context.

> **Analogy**:
> 
> Think of MCP as a USB interface for LLMs. Just like USB allows different devices (keyboards, printers, external drives) to plug into any compatible machine without needing special drivers, MCP lets LLMs connect to a wide range of tools using a standardized protocol—no need for custom integration each time.

## Understanding Model Context Protocol

Model Context Protocol (MCP) is an open standard developed by Anthropic that enables large language models (LLMs) to interact with external tools, APIs, and data sources in a consistent, secure way. It functions as a universal connector, allowing LLMs to perform real-world tasks like extracting website data, querying databases, or executing scripts.

While Anthropic introduced it, MCP is open and extensible, meaning anyone can implement or contribute to the standard. If you've worked with [Retrieval-Augmented Generation (RAG)](https://brightdata.com/blog/web-data/rag-explained), you'll appreciate the concept. MCP builds on that idea by standardizing interactions through a lightweight JSON-RPC interface so models can access live data and take action.

## MCP Architecture Explained

At its foundation, MCP standardizes communication between an AI model and external capabilities.

**Core Idea:** A standardized interface (usually JSON-RPC 2.0 over transports like `stdio`) allows an LLM (via a client) to discover and invoke tools exposed by external servers.

MCP operates through a client-server architecture with three key components:

1. **MCP Host**: The environment or application that initiates and manages interactions between the LLM and external tools. Examples include AI assistants like _Claude Desktop_ or IDEs like _Cursor_.
2. **MCP Client**: A component within the host that establishes and maintains connections with MCP Servers, handling the communication protocols and managing data exchange.
3. **MCP Server:** A program (which we developers create) that implements the MCP protocol and exposes a specific set of capabilities. An MCP server might interface with a database, a web service, or, in our case, a website (Amazon). Servers expose their functionality in standardized ways:
   - **Tools:** Callable functions (e.g. _scrape\_amazon\_product_, _get\_weather\_data_)
   - **Resources:** Read-only endpoints for retrieving static data (e.g. fetch a file, return a JSON record)
   - **Prompts:** Predefined templates to guide LLM interaction with tools and resources

Here's the MCP architecture diagram:

![mcp-architecture-diagram-host-client-server-connections](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/mcp-architecture-diagram-host-client-server-connections.png)

_Image Source: [Model Context Protocol](https://modelcontextprotocol.io/introduction)_

In this setup, the **host** (Claude Desktop or Cursor IDE) spawns an **MCP client**, which then connects to an external **MCP server**. That server exposes tools, resources, and prompts, allowing the AI to interact with them as needed.

In short, the workflow operates as follows:

- The user sends a message like _"Fetch product info from this Amazon link."_
- The MCP client checks for a registered tool that can handle that task
- The client sends a structured request to the MCP server
- The MCP server executes the appropriate action (e.g., launching a headless browser)
- The server returns structured results to the MCP client
- The client forwards the results to the LLM, which presents them to the user

## Developing Your Own MCP Server

Let's construct a Python MCP server to extract data from Amazon product pages.

![amazon-product-page-example](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/amazon-product-page-example.png)

This server will offer two tools: one to download HTML and another to extract organized information. You'll interact with the server via an LLM client in Cursor or Claude Desktop.

### Step 1: Preparing Your Environment

First, verify you have [Python 3](https://www.python.org/downloads/) installed. Then, create and activate a virtual environment:

```sh
python -m venv mcp-amazon-scraper
# On macOS/Linux:
source mcp-amazon-scraper/bin/activate
# On Windows:
.\mcp-amazon-scraper\Scripts\activate
```

Install the necessary libraries: the [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk), [Playwright](https://playwright.dev/python/), and [LXML](https://lxml.de/).

```sh
pip install mcp playwright lxml
# Install browser binaries for Playwright
python -m playwright install
```

This installs:

- **mcp**: Python SDK for Model Context Protocol servers and clients that handles all the JSON-RPC communication details
- **playwright**: Browser automation library that provides headless browser capabilities for rendering and scraping JavaScript-heavy websites
- **lxml**: Fast XML/HTML parsing library that makes it easy to extract specific data elements from web pages using XPath queries

In short, the MCP Python SDK (`mcp`) handles all protocol details, letting you expose tools that Claude or Cursor can call via natural-language prompts. Playwright allows us to render web pages completely (including JavaScript content), and lxml gives us powerful HTML parsing capabilities.

### Step 2: Starting the MCP Server

Create a Python file named `amazon_scraper_mcp.py`. Begin by importing the required modules and initializing the `FastMCP` server:

```python
import os
import asyncio
from lxml import html as lxml_html
from mcp.server.fastmcp import FastMCP
from playwright.async_api import async_playwright

# Define a temporary file path for the HTML content
HTML_FILE = os.path.join(os.getenv("TMPDIR", "/tmp"), "amazon_product_page.html")

# Initialize the MCP server with a descriptive name
mcp = FastMCP("Amazon Product Scraper")

print("MCP Server Initialized: Amazon Product Scraper")
```

This creates an instance of the MCP server. We'll now add tools to it.

### Step 3: Implementing the `fetch_page` Tool

This tool will take a URL as input, use Playwright to navigate to the page, wait for the content to load, download the HTML, and save it to our temporary file.

```python
@mcp.tool()
async def fetch_page(url: str) -> str:
    """
    Fetches the HTML content of the given Amazon product URL using Playwright
    and saves it to a temporary file. Returns a status message.
    """
    print(f"Executing fetch_page for URL: {url}")
    try:
        async with async_playwright() as p:
            # Launch headless Chromium browser
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            # Navigate to the URL with a generous timeout
            await page.goto(url, timeout=90000, wait_until="domcontentloaded")
            # Wait for a key element (e.g., body) to ensure basic loading
            await page.wait_for_selector("body", timeout=30000)
            # Add a small delay for any dynamic content rendering via JavaScript
            await asyncio.sleep(5)

            html_content = await page.content()
            with open(HTML_FILE, "w", encoding="utf-8") as f:
                f.write(html_content)

            await browser.close()
            print(f"Successfully fetched and saved HTML to {HTML_FILE}")
            return f"HTML content for {url} downloaded and saved successfully to {HTML_FILE}."
    except Exception as e:
        error_message = f"Error fetching page {url}: {str(e)}"
        print(error_message)
        return error_message
```

This asynchronous function uses Playwright to handle potential JavaScript rendering on Amazon pages. The `@mcp.tool()` decorator registers this function as a callable tool within our server.

### Step 4: Implementing the `extract_info` Tool

This tool reads the HTML file saved by `fetch_page`, parses it using LXML and XPath selectors, and returns a dictionary containing the extracted product details.

```python
def _extract_xpath(tree, xpath, default="N/A"):
    """Helper function to extract text using XPath, returning default if not found."""
    try:
        # Use text_content() to get text from node and children, strip whitespace
        result = tree.xpath(xpath)
        if result:
            return result[0].text_content().strip()
        return default
    except Exception:
        return default

def _extract_price(price_str):
    """Helper function to parse price string into a float."""
    if price_str == "N/A":
        return None
    try:
        # Remove currency symbols and commas, handle potential whitespace
        cleaned_price = "".join(filter(str.isdigit or str.__eq__("."), price_str))
        return float(cleaned_price)
    except (ValueError, TypeError):
        return None

@mcp.tool()
def extract_info() -> dict:
    """
    Parses the saved HTML file (downloaded by fetch_page) to extract
    Amazon product details like title, price, rating, features, etc.
    Returns a dictionary of the extracted data.
    """
    print(f"Executing extract_info from file: {HTML_FILE}")
    if not os.path.exists(HTML_FILE):
        return {
            "error": f"HTML file not found at {HTML_FILE}. Please run fetch_page first."
        }

    try:
        with open(HTML_FILE, "r", encoding="utf-8") as f:
            page_html = f.read()

        tree = lxml_html.fromstring(page_html)

        # --- XPath Selectors for Amazon Product Details ---
        title = _extract_xpath(tree, '//span[@id="productTitle"]')
        # Handle different price structures (main price, sale price)
        price_whole = _extract_xpath(tree, '//span[contains(@class, "a-price-whole")]')
        price_fraction = _extract_xpath(
            tree, '//span[contains(@class, "a-price-fraction")]'
        )
        price_str = (
            f"{price_whole}.{price_fraction}"
            if price_whole != "N/A"
            else _extract_xpath(tree, '//span[contains(@class,"a-offscreen")]')
        )  # Fallback to offscreen if needed

        price = _extract_price(price_str)

        # Original price (strike-through)
        original_price_str = _extract_xpath(
            tree, '//span[@class="a-price a-text-price"]//span[@class="a-offscreen"]'
        )
        original_price = _extract_price(original_price_str)

        # Rating
        rating_text = _extract_xpath(tree, '//span[@id="acrPopover"]/@title')
        rating = None
        if rating_text != "N/A":
            try:
                rating = float(rating_text.split()[0])
            except (ValueError, IndexError):
                rating = None

        # Review Count
        reviews_text = _extract_xpath(tree, '//span[@id="acrCustomerReviewText"]')
        review_count = None
        if reviews_text != "N/A":
            try:
                review_count = int(reviews_text.split()[0].replace(",", ""))
            except (ValueError, IndexError):
                review_count = None

        # Availability
        availability = _extract_xpath(
            tree,
            '//div[@id="availability"]//span/text()',
        )

        # Features (bullet points)
        feature_elements = tree.xpath(
            '//div[@id="feature-bullets"]//li//span[@class="a-list-item"]'
        )
        features = [
            elem.text_content().strip()
            for elem in feature_elements
            if elem.text_content().strip()
        ]

        # Calculate Discount
        discount = None
        if price and original_price and original_price > price:
            discount = round(((original_price - price) / original_price) * 100)

        extracted_data = {
            "title": title,
            "price": price,
            "original_price": original_price,
            "discount_percent": discount,
            "rating_stars": rating,
            "review_count": review_count,
            "features": features,
            "availability": availability.strip(),
        }
        print(f"Successfully extracted data: {extracted_data}")
        return extracted_data

    except Exception as e:
        error_message = f"Error parsing HTML: {str(e)}"
        print(error_message)  # Added for logging
        return {"error": error_message}
```

This function uses LXML's `fromstring` to parse the HTML and robust XPath selectors to find the desired elements

### Step 5: Running the Server

Finally, add the following lines to the end of your `amazon_scraper_mcp.py` script to start the server using the `stdio` transport mechanism, which is standard for local MCP servers communicating with clients like Claude Desktop or Cursor.

```python
if __name__ == "__main__":
    print("Starting MCP Server with stdio transport...")
    # Run the server, listening via standard input/output
    mcp.run(transport="stdio")
```

### Complete Source Code

```python
import os
import asyncio
from lxml import html as lxml_html
from mcp.server.fastmcp import FastMCP
from playwright.async_api import async_playwright

# Define a temporary file path for the HTML content
HTML_FILE = os.path.join(os.getenv("TMPDIR", "/tmp"), "amazon_product_page.html")

# Initialize the MCP server with a descriptive name
mcp = FastMCP("Amazon Product Scraper")

print("MCP Server Initialized: Amazon Product Scraper")

@mcp.tool()
async def fetch_page(url: str) -> str:
    """
    Fetches the HTML content of the given Amazon product URL using Playwright
    and saves it to a temporary file. Returns a status message.
    """
    print(f"Executing fetch_page for URL: {url}")
    try:
        async with async_playwright() as p:
            # Launch headless Chromium browser
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            # Navigate to the URL with a generous timeout
            await page.goto(url, timeout=90000, wait_until="domcontentloaded")
            # Wait for a key element (e.g., body) to ensure basic loading
            await page.wait_for_selector("body", timeout=30000)
            # Add a small delay for any dynamic content rendering via JavaScript
            await asyncio.sleep(5)

            html_content = await page.content()
            with open(HTML_FILE, "w", encoding="utf-8") as f:
                f.write(html_content)

            await browser.close()
            print(f"Successfully fetched and saved HTML to {HTML_FILE}")
            return f"HTML content for {url} downloaded and saved successfully to {HTML_FILE}."
    except Exception as e:
        error_message = f"Error fetching page {url}: {str(e)}"
        print(error_message)
        return error_message

def _extract_xpath(tree, xpath, default="N/A"):
    """Helper function to extract text using XPath, returning default if not found."""
    try:
        # Use text_content() to get text from node and children, strip whitespace
        result = tree.xpath(xpath)
        if result:
            return result[0].text_content().strip()
        return default
    except Exception:
        return default

def _extract_price(price_str):
    """Helper function to parse price string into a float."""
    if price_str == "N/A":
        return None
    try:
        # Remove currency symbols and commas, handle potential whitespace
        cleaned_price = "".join(filter(str.isdigit or str.__eq__("."), price_str))
        return float(cleaned_price)
    except (ValueError, TypeError):
        return None

@mcp.tool()
def extract_info() -> dict:
    """
    Parses the saved HTML file (downloaded by fetch_page) to extract
    Amazon product details like title, price, rating, features, etc.
    Returns a dictionary of the extracted data.
    """
    print(f"Executing extract_info from file: {HTML_FILE}")
    if not os.path.exists(HTML_FILE):
        return {
            "error": f"HTML file not found at {HTML_FILE}. Please run fetch_page first."
        }

    try:
        with open(HTML_FILE, "r", encoding="utf-8") as f:
            page_html = f.read()

        tree = lxml_html.fromstring(page_html)

        # --- XPath Selectors for Amazon Product Details ---
        title = _extract_xpath(tree, '//span[@id="productTitle"]')
        # Handle different price structures (main price, sale price)
        price_whole = _extract_xpath(tree, '//span[contains(@class, "a-price-whole")]')
        price_fraction = _extract_xpath(
            tree, '//span[contains(@class, "a-price-fraction")]'
        )
        price_str = (
            f"{price_whole}.{price_fraction}"
            if price_whole != "N/A"
            else _extract_xpath(tree, '//span[contains(@class,"a-offscreen")]')
        )  # Fallback to offscreen if needed

        price = _extract_price(price_str)

        # Original price (strike-through)
        original_price_str = _extract_xpath(
            tree, '//span[@class="a-price a-text-price"]//span[@class="a-offscreen"]'
        )
        original_price = _extract_price(original_price_str)

        # Rating
        rating_text = _extract_xpath(tree, '//span[@id="acrPopover"]/@title')
        rating = None
        if rating_text != "N/A":
            try:
                rating = float(rating_text.split()[0])
            except (ValueError, IndexError):
                rating = None

        # Review Count
        reviews_text = _extract_xpath(tree, '//span[@id="acrCustomerReviewText"]')
        review_count = None
        if reviews_text != "N/A":
            try:
                review_count = int(reviews_text.split()[0].replace(",", ""))
            except (ValueError, IndexError):
                review_count = None

        # Availability
        availability = _extract_xpath(
            tree,
            '//div[@id="availability"]//span/text()',
        )

        # Features (bullet points)
        feature_elements = tree.xpath(
            '//div[@id="feature-bullets"]//li//span[@class="a-list-item"]'
        )
        features = [
            elem.text_content().strip()
            for elem in feature_elements
            if elem.text_content().strip()
        ]

        # Calculate Discount
        discount = None
        if price and original_price and original_price > price:
            discount = round(((original_price - price) / original_price) * 100)

        extracted_data = {
            "title": title,
            "price": price,
            "original_price": original_price,
            "discount_percent": discount,
            "rating_stars": rating,
            "review_count": review_count,
            "features": features,
            "availability": availability.strip(),
        }
        print(f"Successfully extracted data: {extracted_data}")
        return extracted_data

    except Exception as e:
        error_message = f"Error parsing HTML: {str(e)}"
        print(error_message)  # Added for logging
        return {"error": error_message}

if __name__ == "__main__":
    print("Starting MCP Server with stdio transport...")
    # Run the server, listening via standard input/output
    mcp.run(transport="stdio")
```

## Connecting Your MCP Server

Now that the server script is ready, let's connect it to MCP clients like Claude Desktop and Cursor.

### Setting Up with Claude Desktop

**Step 1:** Open Claude Desktop.

**Step 2:** Navigate to `Settings` -> `Developer` -> `Edit Config`. This will open the `claude_desktop_config.json` file in your default text editor.

![claude-desktop-settings-menu-navigation](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/claude-desktop-settings-menu-navigation.png)

**Step 3:** Add an entry for your server under the `mcpServers` key. Make sure to replace the path in `args` with the absolute path to your `amazon_scraper_mcp.py` file.

```json
{
  "mcpServers": {
    "amazon_product_scraper": {
      "command": "python",  // Or python3 if needed
      "args": ["/full/path/to/your/amazon_scraper_mcp.py"], // <-- IMPORTANT: Use the correct absolute path
    }
  }
}
```

**Step 4:** Save the `claude_desktop_config.json` file and completely close and reopen Claude Desktop for the changes to take effect.

**Step 5:** In Claude Desktop, you should now see a small tools icon (like a hammer 🔨) in the chat input area.

![claude-desktop-mcp-tools-icon-interface](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/claude-desktop-mcp-tools-icon-interface.png)

**Step 6:** Clicking it should list your "Amazon Product Scraper" with its `fetch_page` and `extract_info` tools.

![claude-available-mcp-tools-dialog-amazon-scraper](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/claude-available-mcp-tools-dialog-amazon-scraper.png)

**Step 7:** Send a Prompt, for example: _"Get the current price, original price, and rating for this Amazon product: [https://www.amazon.com/dp/B09C13PZX7](https://www.amazon.com/dp/B09C13PZX7)"._

**Step 8:** Claude will detect that this requires external tools and prompt you for permission to run `fetch_page` first and then `extract_info`. Click "Allow for this chat" for each tool.

![mcp-permission-dialog-fetch-page-amazon-tool](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/mcp-permission-dialog-fetch-page-amazon-tool.png)

**Step 9:** After granting permissions, the MCP server will execute the tools. Claude will then receive the structured data and present it in the chat.

![claude-amazon-product-data-extraction-results](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/claude-amazon-product-data-extraction-results-2.png)

### Setting Up with Cursor

The process for Cursor (an AI-first IDE) is similar.

**Step 1:** Open Cursor.

**Step 2:** Go to `Settings` ⚙️ and navigate the `MCP` section.

![cursor-ide-add-new-global-mcp-server-settings](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/cursor-ide-add-new-global-mcp-server-settings.png)

**Step 3:** Click "+Add a new global MCP Server". This will open the `mcp.json` configuration file. Add an entry for your server, again using the **absolute path** to your script.

![cursor-mcp-json-configuration-file-amazon-scraper](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/cursor-mcp-json-configuration-file-amazon-scraper.png)

**Step 4:** Save the `mcp.json` file and you should see your "amazon\_product\_scraper" listed, hopefully with a green dot indicating it's running and connected.

![cursor-ide-configured-amazon-scraper-mcp-settings](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/cursor-ide-configured-amazon-scraper-mcp-settings.png)

**Step 5:** Use Cursor's chat feature (`Cmd+l` or `Ctrl+l`).

**Step 6:** Send a Prompt, for example: "_Extract all available product data from this Amazon URL: [https://www.amazon.com/dp/B09C13PZX7](https://www.amazon.com/dp/B09C13PZX7). Format the output as a structured JSON object"._

**Step 7:** Similar to Claude Desktop, the Cursor will ask for permission to run the `fetch_page` and `extract_info` tools. Approve these requests ("Run Tool").

**Step 8:** The Cursor will display the interaction flow, showing the calls to your MCP tools and finally presenting the structured JSON data returned by your `extract_info` tool.

![cursor-ide-amazon-product-data-extraction-json-results](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/cursor-ide-amazon-product-data-extraction-json-results.png)
Here's an example of JSON output from Cursor:

```json
{
  "title": "Razer Basilisk V3 Customizable Ergonomic Gaming Mouse: Fastest Gaming Mouse Switch - Chroma RGB Lighting - 26K DPI Optical Sensor - 11 Programmable Buttons - HyperScroll Tilt Wheel - Classic Black",
  "price": 39.99,
  "original_price": 69.99,
  "discount_percent": 43,
  "rating_stars": 4.6,
  "review_count": 7782,
  "features": [
    "ICONIC ERGONOMIC DESIGN WITH THUMB REST — PC gaming mouse favored by millions worldwide with a form factor that perfectly supports the hand while its buttons are optimally positioned for quick and easy access",
    "11 PROGRAMMABLE BUTTONS — Assign macros and secondary functions across 11 programmable buttons to execute essential actions like push-to-talk, ping, and more",
    "HYPERSCROLL TILT WHEEL — Speed through content with a scroll wheel that free-spins until its stopped or switch to tactile mode for more precision and satisfying feedback that's ideal for cycling through weapons or skills",
    "11 RAZER CHROMA RGB LIGHTING ZONES — Customize each zone from over 16.8 million colors and countless lighting effects, all while it reacts dynamically with over 150 Chroma integrated games",
    "OPTICAL MOUSE SWITCHES GEN 2 — With zero unintended misclicks these switches provide crisp, responsive execution at a blistering 0.2ms actuation speed for up to 70 million clicks",
    "FOCUS+ 26K DPI OPTICAL SENSOR — Best-in-class mouse sensor with intelligent functions flawlessly tracks movement with zero smoothing, allowing for crisp response and pixel-precise accuracy",
    // ... (other features)
  ],
  "availability": "In Stock"
}
```

This shows the flexibility of MCP – the same server works seamlessly with different client applications.

## Using Bright Data's MCP for Professional Web Data Extraction

Bright Data’s enterprise-grade [Model Context Protocol (MCP)](https://github.com/luminati-io/brightdata-mcp) solution eliminates the complexities of self-managed MCP servers—such as proxy management, [anti-bot navigation](https://brightdata.com/blog/web-data/anti-scraping-techniques), and scaling challenges—offering seamless integration with [AI agents](https://brightdata.com/use-cases/apps-agents) and LLMs.

Connecting to Bright Data’s MCP enables immediate access to public web data, including SERP results and hard-to-reach sites, optimized for AI workflows.

MCP unlocks a powerful web extraction framework with tools like the [Web Unlocker](https://brightdata.com/products/web-unlocker), [SERP API](https://brightdata.com/products/serp-api), [Web Scraper API](https://brightdata.com/products/web-scraper), and [Scraping Browser](https://brightdata.com/products/scraping-browser), delivering:

- **[AI-Ready Data](https://brightdata.com/use-cases/data-for-ai):** Pre-structured content, no preprocessing needed.
- **Scalability & Reliability:** High-volume support without slowdowns.
- **Block & CAPTCHA Bypass:** Advanced anti-bot capabilities.
- **Global IP Coverage:** Access from 195 countries with [Bright Data proxies](https://brightdata.com/proxy-types).
- **Seamless Integration:** Quick setup with any MCP client.

### Prerequisites for Bright Data MCP

Before starting your Bright Data MCP integration, verify you have the following:

1. **Bright Data Account:** Register at [brightdata.com](https://brightdata.com/). First-time users receive complimentary credits for testing.
2. **API Token:** Secure your API token from your Bright Data account settings ([User Settings Page](https://brightdata.com/cp/setting/users)).
3. **Web Unlocker Zone:** [Establish a Web Unlocker proxy](https://docs.brightdata.com/scraping-automation/web-unlocker/quickstart) zone in your Bright Data control panel. Choose a memorable identifier, such as `mcp_unlocker` (this can be modified later via environment variables if necessary).
4. **(Optional) Scraping Browser Zone:** If you require advanced browser automation features (e.g., for intricate JavaScript interactions or screenshots), [establish a Scraping Browser zone](https://docs.brightdata.com/scraping-automation/scraping-browser/quickstart). Record the authentication details (Username and Password) provided for this zone (within the **Overview** tab), typically formatted as `brd-customer-ACCOUNT_ID-zone-ZONE_NAME:PASSWORD`.

### Quickstart: Configuring Bright Data MCP for Claude Desktop

**Step 1:** The Bright Data MCP server typically runs using `npx`, which comes bundled with Node.js. Install Node.js if needed from the [official website](https://nodejs.org/en/download).

**Step 2:** Open Claude Desktop -> `Settings` -> `Developer` -> `Edit Config` (`claude_desktop_config.json`).

**Step 3:** Insert the Bright Data server configuration under `mcpServers`. Substitute placeholders with your actual credentials.

```json
{
  "mcpServers": {
    "Bright Data": { // Choose a name for the server
      "command": "npx",
      "args": ["@brightdata/mcp"],
      "env": {
        "API_TOKEN": "YOUR_BRIGHTDATA_API_TOKEN", // Paste your API token here
        "WEB_UNLOCKER_ZONE": "mcp_unlocker",     // Your Web Unlocker zone name
        // Optional: Add if using Scraping Browser tools
        "BROWSER_AUTH": "brd-customer-ACCOUNTID-zone-YOURZONE:PASSWORD"
      }
    }
  }
}
```

**Step 4:** Save the configuration file and restart Claude Desktop.

**Step 5:** Hover over the hammer icon (🔨) in Claude Desktop. You should now see multiple MCP tools available.

![claude-desktop-interface-with-mcp-tools-available](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/claude-desktop-interface-with-mcp-tools-available.png)

Let's attempt to extract data from Zillow, a website known for potentially restricting scrapers. Prompt Claude with "_Extract key property data in JSON format from this Zillow URL: [https://www.zillow.com/apartments/arverne-ny/the-tides-at-arverne-by-the-sea/ChWHPZ/](https://www.zillow.com/apartments/arverne-ny/the-tides-at-arverne-by-the-sea/ChWHPZ/)_"

![bright-data-mcp-zillow-property-extraction-process](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/bright-data-mcp-zillow-property-extraction-process.png)

Permit Claude to utilize the necessary Bright Data MCP tools. Bright Data's MCP server will manage the underlying complexities (proxy rotation, JavaScript rendering via Scraping Browser if required).

Bright Data's server conducts the extraction and delivers structured data, which Claude presents.

![zillow-property-data-json-structure-bright-data-mcp](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/zillow-property-data-json-structure-bright-data-mcp.png)

Here's a sample of the potential output:

```json
{
  "propertyInfo": {
    "name": "The Tides At Arverne By The Sea",
    "address": "190 Beach 69th St, Arverne, NY 11692",
    "propertyType": "Apartment building",
    // ... more info
  },
  "rentPrices": {
    "studio": { "startingPrice": "$2,750", /* ... */ },
    "oneBed": { "startingPrice": "$2,900", /* ... */ },
    "twoBed": { "startingPrice": "$3,350", /* ... */ }
  },
  // ... amenities, policies, etc.
}
```

**Another Example: Hacker News Headlines**

A more straightforward query: "_Give me the titles of the latest 5 news articles from Hacker News_".

![hacker-news-latest-articles-mcp-extraction-results](https://github.com/luminati-io/web-scraping-with-mcp/blob/main/images/hacker-news-latest-articles-mcp-extraction-results.png)

This demonstrates how Bright Data's MCP server simplifies accessing even dynamic or heavily secured web content directly within your AI workflow.

## Further Reading

Here is a curation of our earlier guides on AI and large language models (LLMs) for more in-depth knowledge:

- [Top Sources for Finding LLM Training Data](https://brightdata.com/blog/web-data/llm-training-data)
- [Web Scraping with LLaMA 3: Turn Any Website into Structured JSON](https://brightdata.com/blog/web-data/web-scraping-with-llama-3)
- [Web Scraping With LangChain and Bright Data](https://brightdata.com/blog/web-data/web-scraping-with-langchain-and-bright-data)
- [How To Create a RAG Chatbot With GPT-4o Using SERP Data](https://brightdata.com/blog/web-data/build-a-rag-chatbot)

## Conclusion

Anthropic's Model Context Protocol represents a fundamental shift in how AI systems interact with the external world. You can construct custom MCP servers for specific tasks. Bright Data's MCP integration enhances this further by delivering enterprise-grade web scraping capabilities that evade anti-bot protections and supply [AI-ready structured data](https://brightdata.com/use-cases/data-for-ai).

Register and try out [AI solutions](https://brightdata.com/ai) today for free!
