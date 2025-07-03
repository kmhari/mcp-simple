// Variable management functions
import { 
    savedVariables, 
    setSavedVariables, 
    currentConfig, 
    preConfiguredServers 
} from './state.js';
import { showMessage } from './utils.js';

export async function loadVariables() {
    try {
        const response = await fetch('/api/variables');
        if (response.ok) {
            const variables = await response.json();
            setSavedVariables(variables);
        }
    } catch (error) {
        console.error('Failed to load variables:', error);
    }
}

export async function updateVariablesList() {
    const container = document.getElementById('variablesList');
    container.innerHTML = '';
    
    const variableUsage = {};
    
    Object.entries(preConfiguredServers).forEach(([key, server]) => {
        if (server.requiredEnvVars) {
            server.requiredEnvVars.forEach(varName => {
                if (!variableUsage[varName]) {
                    variableUsage[varName] = [];
                }
                variableUsage[varName].push(server.name);
            });
        }
    });
    
    Object.entries(currentConfig.mcpServers).forEach(([name, config]) => {
        if (config.env) {
            Object.keys(config.env).forEach(varName => {
                if (!variableUsage[varName]) {
                    variableUsage[varName] = [];
                }
                if (!variableUsage[varName].includes(name)) {
                    variableUsage[varName].push(name);
                }
            });
        }
    });
    
    let envVariables = {};
    try {
        const response = await fetch('/api/env-variables');
        const data = await response.json();
        if (data.exists) {
            envVariables = data.variables;
        }
    } catch (error) {
        console.error('Error fetching .env variables:', error);
    }
    
    Object.entries(variableUsage).sort().forEach(([varName, servers]) => {
        const item = document.createElement('div');
        item.className = 'variable-item';
        item.setAttribute('data-var-name', varName);
        
        const value = savedVariables[varName] || '';
        const hasEnvValue = envVariables[varName] !== undefined;
        const isEmpty = !value;
        
        item.innerHTML = `
            <div class="variable-header">
                <div class="variable-name">${varName}</div>
                <button type="button" class="variable-save-btn" onclick="saveIndividualVariable('${varName}')" title="Save this variable">
                    Save
                </button>
            </div>
            <div style="position: relative;">
                <input type="text" 
                       class="variable-input" 
                       data-var-name="${varName}"
                       data-original-value="${value}"
                       value="${value}"
                       placeholder="Enter value for ${varName}"
                       oninput="handleVariableChange('${varName}')"
                       style="padding-right: ${hasEnvValue && isEmpty ? '110px' : '8px'};">
                ${hasEnvValue && isEmpty ? `
                    <button type="button" class="btn-env-fetch" onclick="fetchFromEnvForVariables('${varName}')" title="Fetch from .env file">
                        <span style="font-size: 12px;">📋 fetch from .env</span>
                    </button>
                ` : ''}
                ${!isEmpty && hasEnvValue ? `
                    <small style="color: #27ae60; font-size: 12px; display: block; margin-top: 4px;">✓ Value available in .env file</small>
                ` : ''}
            </div>
            <div class="variable-usage">
                <strong>Used by:</strong> ${servers.join(', ')}
            </div>
        `;
        
        container.appendChild(item);
    });
    
    if (Object.keys(variableUsage).length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No environment variables found in configured servers.</p>';
    }
}

export function handleVariableChange(varName) {
    const input = document.querySelector(`input[data-var-name="${varName}"]`);
    const item = document.querySelector(`.variable-item[data-var-name="${varName}"]`);
    const saveBtn = item.querySelector('.variable-save-btn');
    
    if (!input || !item || !saveBtn) return;
    
    const originalValue = input.getAttribute('data-original-value') || '';
    const currentValue = input.value.trim();
    
    if (currentValue !== originalValue) {
        saveBtn.classList.add('show');
        item.classList.add('changed');
        item.classList.remove('saved', 'saved-success');
    } else {
        saveBtn.classList.remove('show');
        item.classList.remove('changed', 'saved', 'saved-success');
    }
}

export async function saveIndividualVariable(varName) {
    const input = document.querySelector(`input[data-var-name="${varName}"]`);
    const item = document.querySelector(`.variable-item[data-var-name="${varName}"]`);
    const saveBtn = item.querySelector('.variable-save-btn');
    
    if (!input || !item || !saveBtn) return;
    
    const value = input.value.trim();
    
    try {
        const updatedVariables = { ...savedVariables };
        if (value) {
            updatedVariables[varName] = value;
        } else {
            delete updatedVariables[varName];
        }
        
        const response = await fetch('/api/variables', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedVariables)
        });
        
        if (response.ok) {
            setSavedVariables(updatedVariables);
            input.setAttribute('data-original-value', value);
            saveBtn.classList.remove('show');
            item.classList.remove('changed');
            item.classList.add('saved-success');
            showMessage(`Variable ${varName} saved successfully`, 'success');
        } else {
            throw new Error('Failed to save variable');
        }
    } catch (error) {
        showMessage(`Error saving ${varName}: ` + error.message, 'error');
    }
}

export async function saveVariables() {
    const variables = {};
    
    document.querySelectorAll('.variable-input').forEach(input => {
        const varName = input.getAttribute('data-var-name');
        const value = input.value.trim();
        if (value) {
            variables[varName] = value;
        }
    });
    
    try {
        const response = await fetch('/api/variables', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(variables)
        });
        
        if (response.ok) {
            setSavedVariables(variables);
            showMessage('Variables saved successfully', 'success');
        } else {
            throw new Error('Failed to save variables');
        }
    } catch (error) {
        showMessage('Error saving variables: ' + error.message, 'error');
    }
}

export async function fetchFromEnvForVariables(varName) {
    try {
        const response = await fetch('/api/env-variables');
        const data = await response.json();
        
        if (data.exists && data.variables[varName]) {
            const variableInput = document.querySelector(`input[data-var-name="${varName}"]`);
            
            if (variableInput) {
                variableInput.value = data.variables[varName];
                handleVariableChange(varName);
                showMessage(`Fetched ${varName} from .env file`, 'success');
            }
        } else {
            showMessage(`${varName} not found in .env file`, 'error');
        }
    } catch (error) {
        showMessage('Error fetching from .env file', 'error');
    }
}