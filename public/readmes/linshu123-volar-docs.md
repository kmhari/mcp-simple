# Volar - Plan, Review & Build with AI

*Annoyed when AI starts touching unrelated code?*

*Getting nervous when you ask AI to write something maybe a little too complicated?*

*Pulling hair out when AI forgets your instructions?*

---

Volar helps you guide your AI coding assistant more effectively:

1.  **Defining Tasks:** Write your idea and let AI fill in the details.
2.  **Planning & Breakdown:** Let your AI flesh out specifics, break down complex requests into manageable pieces, and plan implementation steps.
3.  **Review & Refinement:** You review the AI's plan, add context, and make adjustments *before* any code is written.
4.  **Precise Execution:** Instruct the AI to implement the approved plan, ensuring it sticks to the defined scope.

Volar is an orchestrator, preparing and sending detailed prompts to your chosen AI tool, and helping you manage the AI's output.

**NOTE: Volar doesn't use AI directly. Volar creates prompts for your AI coding tool.**

## 🚀 Getting Started: Choose Your Configuration

To use Volar, you first need to choose the AI coding tool you use. This tells Volar how to set up the MCP config. For Cursor, Windsurf, Claude Code, the setup can be done automatically.

**NOTE: You may need to enable/refresh `VolarTaskServer` in Cursor/Windsurf's MCP settings for validation.**


Here are the instructions to set up MCP for other tools.

#### For Cline/Roo Code
1.  Choose "Other Tool" in Tool dropdown menu.
2.  Copy the url next to the dropdown.
3.  Go to the MCP setup tab.
4.  Fill in the values:
    *   **Server Name:** `VolarTaskServer`
    *   **Server URL:** `http://localhost:<port number>/sse` (The copied url)

---

## 💡 Core Features & Usage

Once Volar is configured, you can start planning, reviewing, and building with your AI!

### Task View & Task Management
The Volar extension adds a new view to your VS Code sidebar where you can manage your tasks.

![Screenshot of Task List View](https://raw.githubusercontent.com/linshu123/volar_docs/main/resources/Task%20List%20View.png)

![Screenshot of Task Modal View](https://raw.githubusercontent.com/linshu123/volar_docs/main/resources/Task%20Modal%20View.png)

*   **View Task:** Click on any task to see its details.
*   **Create Tasks:** Write down a task title and hit "Enter" to see the new task.
*   **Edit Task Details:** In task detail view, click the "✏️" (pencil) emoji to edit the task content.
*   **AI-Assisted Task Updates (with MCP):** If you've set up MCP, you can also ask your AI agent (e.g., Cursor) to update tasks directly for you through chat.

### Taking Actions on Tasks with AI
For each task, you can ask your AI to perform specific actions.

![Screenshot of Action Dropdown](https://raw.githubusercontent.com/linshu123/volar_docs/main/resources/Action%20Dropdown.png)

There are three key actions:

*   **Plan:**
    *   **What it does:** Provide a concise task title or a brief description. Volar will then prompt your AI to analyze your codebase (if relevant) and generate a detailed implementation plan.
    *   **When to use it:** For any new idea or feature. This is your first step to get the AI to articulate its understanding and proposed solution.
    *   **Outcome:** The AI's plan will populate the task details. Review this plan carefully. Make changes as needed.

*   **Breakdown:**
    *   **What it does:** If a task or its plan seems too complex, ambiguous, or large for the AI to handle in one go, use "Breakdown". Volar will prompt your AI to break the current task into smaller, more manageable sub-tasks.
    *   **When to use it:** When a task feels overwhelming, or the initial "Plan" is too high-level.
    *   **Outcome:** New sub-tasks will be created. You can recursively use "Plan" and "Breakdown" on these sub-tasks until each one is small and clear enough for reliable execution.

*   **Execute:**
    *   **What it does:** After you have reviewed and are satisfied with a task's plan (either an initial plan or one refined after breakdowns), use "Execute". Volar will prompt your AI to write the code according to that specific plan.
    *   **When to use it:** When the plan is clear, detailed, and you're confident the AI can implement it correctly. For very simple, self-contained changes, you might execute directly.
    *   **Outcome:** The AI will attempt to make the code changes according to the task content.

## ⚠️ Known Issues & Troubleshooting

* AI agent cannot find get task info from Volar: go to the MCP settings of your AI tool (Cursor/Windsurf/etc) and check if the VolarTaskServer is enabled and running. Check the url is the same as shown next to the tool dropdown.
