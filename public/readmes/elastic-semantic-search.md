# MCP Server: Elasticsearch semantic search tool

Demo repo for: https://j.blaszyk.me/tech-blog/mcp-server-elasticsearch-semantic-search/

## Table of Contents
- [Overview](#overview)
- [Running the MCP Server](#running-the-mcp-server)
- [Integrating with Claude Desktop](#integrating-with-claude-desktop)
- [Crawling Search Labs Blog Posts](#crawling-search-labs-blog-posts)
  - [1. Verify Crawler Setup](#1-verify-crawler-setup)
  - [2. Configure Elasticsearch](#2-configure-elasticsearch)
  - [3. Update Index Mapping for Semantic Search](#3-update-index-mapping-for-semantic-search)
  - [4. Start Crawling](#4-start-crawling)
  - [5. Verify Indexed Documents](#5-verify-indexed-documents)

---

## Overview
This repository provides a **Python implementation of an MCP server** for **semantic search** through **Search Labs blog posts** indexed in **Elasticsearch**.

It assumes you've crawled the blog posts and stored them in the `search-labs-posts` index using **Elastic Open Crawler**.

---

## Running the MCP Server

Add `ES_URL` and `ES_AP_KEY` into `.env` file, (take a look [here](#2-configure-elasticsearch) for generating api key with minimum permissions)

Start the server in **MCP Inspector**:

```sh
make dev
```

Once running, access the MCP Inspector at: [http://localhost:5173](http://localhost:5173)

---

## Integrating with Claude Desktop

To add the MCP server to **Claude Desktop**:

```sh
make install-claude-config
```

This updates `claude_desktop_config.json` in your home directory. On the next restart, the Claude app will detect the server and load the declared tool.

---

## Crawling Search Labs Blog Posts

### 1. Verify Crawler Setup
To check if the **Elastic Open Crawler** works, run:

```sh
docker run --rm \
  --entrypoint /bin/bash \
  -v "$(pwd)/crawler-config:/app/config" \
  --network host \
  docker.elastic.co/integrations/crawler:latest \
  -c "bin/crawler crawl config/test-crawler.yml"
```

This should print crawled content from a **single page**.

---

### 2. Configure Elasticsearch
Set up **Elasticsearch URL and API Key**.

Generate an API key with **minimum crawler permissions**:

```sh
POST /_security/api_key
{
  "name": "crawler-search-labs",
  "role_descriptors": {
    "crawler-search-labs-role": {
      "cluster": ["monitor"],
      "indices": [
        {
          "names": ["search-labs-posts"],
          "privileges": ["all"]
        }
      ]
    }
  },
  "metadata": {
    "application": "crawler"
  }
}
```

Copy the `encoded` value from the response and set it as `API_KEY`.

---

### 3. Update Index Mapping for Semantic Search

Ensure the `search-labs-posts` index exists. If not, create it:

```sh
PUT search-labs-posts
```

Update the **mapping** to enable **semantic search**:

```sh
PUT search-labs-posts/_mappings
{
  "properties": {
    "body": {
      "type": "text",
      "copy_to": "semantic_body"
    },
    "semantic_body": {
      "type": "semantic_text",
      "inference_id": ".elser-2-elasticsearch"
    }
  }
}
```

The `body` field is indexed as **semantic text** using **Elasticsearch’s ELSER model**.

---

### 4. Start Crawling

Run the crawler to populate the index:

```sh
docker run --rm \
  --entrypoint /bin/bash \
  -v "$(pwd)/crawler-config:/app/config" \
  --network host \
  docker.elastic.co/integrations/crawler:latest \
  -c "bin/crawler crawl config/elastic-search-labs-crawler.yml"
```
> [!TIP]
> **If using a fresh Elasticsearch cluster**, wait for the **ELSER model** to start before indexing.

---

### 5. Verify Indexed Documents
Check if the documents were indexed:

```sh
GET search-labs-posts/_count
```

This will return the total document count in the index. You can also verify in **Kibana**.

---

 **Done!** You can now perform **semantic searches** on **Search Labs blog posts**
