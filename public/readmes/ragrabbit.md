<h1 style="font-weight:normal">
  <a href="https://ragrabbit.com">
    <img src="./apps/saas/public/logo.svg" alt="RagRabbit" width=35>
  </a>
  &nbsp;RagRabbit&nbsp;
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmadarco%2Fragrabbit&env=OPENAI_API_KEY,AUTH_USERNAME,AUTH_PASSWORD,AUTH_SECRET&envDescription=Get%20an%20OpenAI%20Api%20Key%20and%20set%20AUTH_USERNAME%20and%20AUTH_PASSWORD%20to%20the%20desired%20credentials%20to%20secure%20the%20admin%20section.%20Also%20be%20sure%20to%20enable%20the%20Postgres%20database%20integration&envLink=https%3A%2F%2Fplatform.openai.com%2Fapi-keys&demo-title=RagRabbit%20-%20AI%20Site%20Search%20and%20LLM.txt&demo-description=Site%20AI%20Search%20and%20LLM.txt%20in%20Minutes%2C%20Open%20Source%20with%201%20Click%20Deploy%20on%20Vercel.&demo-url=https%3A%2F%2Fragrabbit.vercel.app%2F&demo-image=https%3A%2F%2Fragrabbit.vercel.app%2Fopengraph-image.png&stores=%5B%7B%22type%22%3A%22postgres%22%7D%5D&root-directory=apps/saas"><img src="https://img.shields.io/badge/deploy%20on-vercel-black.svg"></a>
  <a href="https://github.com/madarco/ragrabbit/blob/master/license.md"><img src=https://img.shields.io/github/license/madarco/ragrabbit.svg?colorB=ff0000></a>
  <a href="https://www.npmjs.com/package/@ragrabbit/mcp"><img src="https://img.shields.io/npm/d18m/%40ragrabbit%2Fmcp?label=npm" /></a>
  <img src="https://img.shields.io/github/stars/madarco/ragrabbit" />
</h1>

Self Hosted Site AI Search, LLMs.txt, MCP Server that crawls your content. 1-Click Deploy on Vercel.
<br>

<p align="center">
  
![RagRabbit](./apps/docs/public/cover.jpg)
</p>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmadarco%2Fragrabbit&env=OPENAI_API_KEY,AUTH_USERNAME,AUTH_PASSWORD,AUTH_SECRET&envDescription=Get%20an%20OpenAI%20Api%20Key%20and%20set%20AUTH_USERNAME%20and%20AUTH_PASSWORD%20to%20the%20desired%20credentials%20to%20secure%20the%20admin%20section.%20Also%20be%20sure%20to%20enable%20the%20Postgres%20database%20integration&envLink=https%3A%2F%2Fplatform.openai.com%2Fapi-keys&demo-title=RagRabbit%20-%20AI%20Site%20Search%20and%20LLM.txt&demo-description=Site%20AI%20Search%20and%20LLM.txt%20in%20Minutes%2C%20Open%20Source%20with%201%20Click%20Deploy%20on%20Vercel.&demo-url=https%3A%2F%2Fragrabbit.vercel.app%2F&demo-image=https%3A%2F%2Fragrabbit.vercel.app%2Fopengraph-image.png&stores=%5B%7B%22type%22%3A%22postgres%22%7D%5D&root-directory=apps/saas)

## How it works

[RagRabbit](https://github.com/madarco/ragrabbit) is a [Next.js](https://nextjs.org/) [Turborepo](https://turbo.build/repo) app that uses [Llamaindex](https://github.com/run-llama/LlamaIndexTS) with [pgVector](https://github.com/pgvector/pgvector).

Features

- 💬 Chat Widget: Embeddable AI Chat agent and instant Search
- 🕸️ Website Crawler: scrapes and index pages with pgVector and PostgreSQL
- 📄 LLMs.txt Generation: fully customizable wiht ToC reorder
- 🔌 [MCP Server](./packages//mcp-server/README.md): `npx @ragrabbit/mcp` to access your docs from Claude Desktop and Cursor IDE
- 🛠️ Flexible: Authentication, Open Source, API Keys access
- 🚀 Easy Deployment: One-click setup on Vercel

Integrations:

- [Fumadocs](#fumadocs)

### Demo

View [RagRabbit Demo Page](https://ragrabbit.vercel.app/widget/demo)

![RagRabbit Demo](./apps/docs/public/ragrabbit.gif)

## Install

To install on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmadarco%2Fragrabbit&env=OPENAI_API_KEY,AUTH_USERNAME,AUTH_PASSWORD,AUTH_SECRET&envDescription=Get%20an%20OpenAI%20Api%20Key%20and%20set%20AUTH_USERNAME%20and%20AUTH_PASSWORD%20to%20the%20desired%20credentials%20to%20secure%20the%20admin%20section.%20Also%20be%20sure%20to%20enable%20the%20Postgres%20database%20integration&envLink=https%3A%2F%2Fplatform.openai.com%2Fapi-keys&demo-title=RagRabbit%20-%20AI%20Site%20Search%20and%20LLM.txt&demo-description=Site%20AI%20Search%20and%20LLM.txt%20in%20Minutes%2C%20Open%20Source%20with%201%20Click%20Deploy%20on%20Vercel.&demo-url=https%3A%2F%2Fragrabbit.vercel.app%2F&demo-image=https%3A%2F%2Fragrabbit.vercel.app%2Fopengraph-image.png&stores=%5B%7B%22type%22%3A%22postgres%22%7D%5D&root-directory=apps/saas)

Requirements:

- Node.js 20.x
- PostgreSQL w/ pgVector
- OpenAI API Key
- (Optional) Trigger.dev API Key

### Configuration

Set the following environment variables:

- OPENAI_API_KEY

For username/password login:

- ADMIN_USER
- ADMIN_PASSWORD

For email login:

- RESEND_AUTH=true
- To restrict access to those emails: RESEND_ALLOWED_EMAILS="test@test.com,foo@bar.com"
- To not send emails but logs the login link instead (in Vercel logs): SIMULATE_EMAILS=true

See [.env.example](./apps/saas/.env.example) for the complete list.

## How to use

Use the Indexing section to add a new url/website to index, either a single url or a website to crawl recursively:

![RagRabbit Indexing](./apps/docs/public/ragrabbit_indexing.png)
![RagRabbit Crawl Modal](./apps/docs/public/ragrabbit_crawl_modal.png)

Then start the Job Runner (keep the tab open until it finish)

![RagRabbit Job Runner](./apps/docs/public/ragrabbit_job_runner.png)

In the LLM.txt section you can preview the generated LLM.txt file:

![RagRabbit LLM.txt](./apps/docs/public/ragrabbit_llm_txt.png)

You can then embed the widget in your site with the following snippet:

### Chat Button

Embed a button at the bottom of your page:

```
<script src="https://<your deployed app>/widget.js"></script>
```

![RagRabbit Embed Widget Button](./apps/docs/public/ragrabbit_button.png)

### Chat Widget

Insert a search input anwhere in your page:

![RagRabbit Widget](./apps/docs/public/ragrabbit_search_field.png)

```
<script src="https://ragrabbit.com/widget.js?type=search"></script>
<ragrabbit-search></ragrabbit-search>
```

### To use with React.js

```typescript
"use client";

import Script from "next/script";

export function RagRabbitSearch() {
  return (
    <>
      <Script src="/widget.js?type=search" strategy="lazyOnload" />
      <style>{`
        ragrabbit-search .ragrabbit-search-input {
            padding: 6px 12px;
        }
      `}</style>
      <div className="ml-auto min-w-[300px] flex-1 sm:flex-initial">
        {/* @ts-ignore - Custom element will be mounted by external script */}
        <ragrabbit-search></ragrabbit-search>
      </div>
    </>
  );
}
```

### MPC Server

The MCP Server allows any supported AI Clients to retrieve pages from your documentation using semantic search.

### Claude Desktop

Add a custom mcp server with the name of your product, so that Claude AI can use it when looking for info about it.

in `claude_desktop_config.json` (Claude -> Settings -> Developer -> Edit Config)

```
{
  "mcpServers": {
    "<name_of_your_documentation_no_spaces>": {
      "command": "npx",
      "args": ["@ragrabbit/mcp", "http://<RagRabbit install>/", "<name of your documentation>"]
    }
  }
}
```

### In Cursor IDE

Go to Cursor -> Settings -> Cursor Settings -> MCP

And add a new MCP of type `command` with the command:

```
npx @ragrabbit/mcp", "http://<RagRabbit install>/", "<name of your documentation>"
```

Arguments:

- `ragrabbit-url`: (Required) The base URL of your RagRabbit instance, eg https://my-ragrabbit.vercel.com/
- `name`: (Required) Custom name for the documentation search service (defaults to "RagRabbit") so that AI will know to use it when looking for info

## Configuration Options

### Chat button

You can configure the chat button by adding the following parameters to the widget.js script tag:

#### buttonText

```
<script src="https://ragrabbit.com/widget.js?buttonText=Ask%20AI"></script>
```

### Search widget

You can configure the search widget by adding the following parameters and use the mountSearch call:

#### searchPlaceholder

```
<div id="search-container"></div>
<script>
  window.mountSearch("search-container", { searchPlaceholder: "Search documentation..." });
</script>
```

## Integrations

### Fumadocs

Create a component to replace the Search Dialog:

```bash
pnpm add @ragrabbit/search-react
```

```typescript
"use client";
import type { SharedProps } from "fumadocs-ui/components/dialog/search";
import { RagRabbitModal } from "@ragrabbit/search-react";

export default function SearchDialog({ open, onOpenChange }: SharedProps) {
  return <RagRabbitModal
    domain="http://localhost:3000/"
    open={open}
    onOpenChange={onOpenChange}
    />;
}
```

Then set it in the `layout.tsx`:

```tsx
<RootProvider
  search={{
    SearchDialog,
  }}
>
  ...
</RootProvider>
```

Optionally add the Floating Chat button:

```typescript
"use client";
import { RagRabbitChatButton } from "@ragrabbit/search-react";

export default function ChatButton() {
  return <RagRabbitChatButton domain="http://localhost:3000/" />;
}
```

And add it to the `layout.tsx`:

```tsx
<body className="flex flex-col min-h-screen">
  <ChatButton />
  ...
```

## Development

```bash
# Start the db (Docker needed)
pnpm dev:utils # Starts postgresql with pgvector, Storybook and Drizzle ORM Studio

# Start the app
cd apps/saas
pnpm dev
```

### Directory structure:

RagRabbit is a monorepo with Turborepo a Next.js app and a modular design with separate packages.

```
apps/
├── docs -> the documentation site
├── saas -> the main application
└── web -> the web site
packages/
├── db -> the database with Drizzle ORM
├── auth -> the authentication with Auth.js
├── core -> shared utils
├── design -> the design system
├── rag -> the LLM and RAG package with LlamaIndexTS
├── jobs -> job runner with Trigger.dev
└── storybook -> a Next.js Storybook app
.cursorrules -> Fine tuned Cursor rules with all the locations to work with the monorepo
```

# Author

[Marco D'Alia](https://www.madarco.net) - [@madarco](https://x.com/madarco) - [Linkedin](https://www.linkedin.com/in/marcodalia/)

# License

MIT
