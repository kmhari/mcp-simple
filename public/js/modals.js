// Modal management and guides
import { showMessage, closeModal } from './utils.js';

export async function confirmStopServer() {
    const modal = document.getElementById('serverModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = '⚠️ Stop MCP Manager Server';
    
    modalBody.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 48px; margin-bottom: 20px;">🛑</div>
            <h3 style="margin-bottom: 20px; color: #e74c3c;">Are you sure you want to stop the server?</h3>
            <p style="margin-bottom: 30px; color: #666;">
                This will shut down the MCP Manager web interface.<br>
                You'll need to restart it from the command line to access it again.
            </p>
            <div class="button-group" style="justify-content: center; gap: 15px;">
                <button type="button" class="btn-primary" style="background: #e74c3c;" onclick="stopServer()">
                    Yes, Stop Server
                </button>
                <button type="button" class="btn-secondary" onclick="closeModal()">
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

export async function stopServer() {
    try {
        const response = await fetch('/api/shutdown', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            showMessage('Server is shutting down...', 'success');
            
            setTimeout(() => {
                document.body.innerHTML = `
                    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #ececec;">
                        <div style="text-align: center; font-family: 'JetBrains Mono', monospace;">
                            <div style="font-size: 72px; margin-bottom: 20px;">👋</div>
                            <h1 style="color: #2c3e50; margin-bottom: 20px;">Server Stopped</h1>
                            <p style="color: #666; font-size: 18px;">
                                The MCP Manager server has been shut down.<br>
                                To restart it, run: <code style="background: #fff; padding: 5px 10px; border-radius: 4px;">node mcp-manager.js --web</code>
                            </p>
                        </div>
                    </div>
                `;
            }, 1000);
        } else {
            throw new Error('Failed to stop server');
        }
    } catch (error) {
        showMessage('Error stopping server: ' + error.message, 'error');
        closeModal();
    }
}

export function showSlackTokenGuide() {
    const modal = document.getElementById('serverModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = 'Get Slack Bot Token - Step by Step';
    
    modalBody.innerHTML = `
        <div class="slack-token-guide">
            <h3>Manual Steps:</h3>
            <ol>
                <li>
                    <strong>Go to Slack API Apps page</strong><br>
                    <a href="https://api.slack.com/apps" target="_blank" class="btn-secondary">Open Slack Apps</a>
                </li>
                <li>
                    <strong>Create a new app or select existing app</strong><br>
                    <small>If creating new: Choose "From scratch" and give it a name</small>
                </li>
                <li>
                    <strong>Navigate to "OAuth & Permissions" in the left sidebar</strong>
                </li>
                <li>
                    <strong>Add Bot Token Scopes</strong><br>
                    <small>Common scopes: chat:write, channels:read, users:read</small>
                </li>
                <li>
                    <strong>Install to Workspace</strong><br>
                    <small>Click "Install to Workspace" button and authorize</small>
                </li>
                <li>
                    <strong>Copy the Bot User OAuth Token</strong><br>
                    <small>It starts with "xoxb-"</small>
                </li>
            </ol>
            
            <div class="form-group">
                <label>Paste your Bot Token here:</label>
                <input type="text" id="manual_slack_token" placeholder="xoxb-your-token-here">
            </div>
            
            <div class="button-group" style="margin-top: 20px;">
                <button type="button" class="btn-primary" onclick="applySlackToken()">Apply Token</button>
                <button type="button" class="btn-secondary" onclick="closeModal()">Cancel</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

export function applySlackToken() {
    const token = document.getElementById('manual_slack_token').value;
    if (token) {
        document.getElementById('env_SLACK_BOT_TOKEN').value = token;
        closeModal();
        showMessage('Slack token applied successfully', 'success');
    } else {
        showMessage('Please enter a token', 'error');
    }
}

export async function showReadme(serverId) {
    const modal = document.getElementById('serverModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = `📄 ${serverId} README`;
    modalBody.innerHTML = '<div style="text-align: center; padding: 20px;">Loading README from GitHub...</div>';
    
    modal.style.display = 'block';
    
    try {
        const response = await fetch(`/api/readme/${serverId}`);
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `README not found (${response.status})`);
        }
        
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message || 'Failed to fetch README');
        }
        
        const htmlContent = marked.parse(data.content);
        
        modalBody.innerHTML = `
            <div class="readme-content">
                ${htmlContent}
            </div>
            <div class="readme-footer" style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
                <a href="${data.githubUrl}" target="_blank" rel="noopener noreferrer">📖 View on GitHub</a>
            </div>
            <div class="button-group" style="margin-top: 20px; justify-content: center;">
                <button type="button" class="btn-secondary" onclick="closeModal()">Close</button>
            </div>
        `;
        
    } catch (error) {
        modalBody.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div style="color: #e74c3c; margin-bottom: 15px;">❌ Error loading README</div>
                <p style="color: #666; margin-bottom: 20px;">${error.message}</p>
                <div class="button-group" style="justify-content: center;">
                    <button type="button" class="btn-secondary" onclick="closeModal()">Close</button>
                </div>
            </div>
        `;
    }
}