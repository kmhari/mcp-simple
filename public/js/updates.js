// Update management and version checking
import { showMessage } from './utils.js';

export async function checkForUpdates() {
    try {
        const response = await fetch('/api/version-check');
        const versionInfo = await response.json();
        
        if (versionInfo.needsUpdate && versionInfo.isMandatory) {
            showMandatoryUpdateModal(versionInfo);
        } else if (versionInfo.needsUpdate) {
            showUpdateNotification(versionInfo);
        }
    } catch (error) {
        console.error('Error checking for updates:', error);
    }
}

function showMandatoryUpdateModal(versionInfo) {
    const modal = document.getElementById('serverModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = '🔄 Mandatory Update Required';
    
    modalBody.innerHTML = `
        <div class="update-modal">
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
                <h3 style="color: #e74c3c; margin-bottom: 12px;">Update Required</h3>
                <p style="color: #666; margin-bottom: 20px;">
                    A mandatory update is available. The application must be updated to continue.
                </p>
            </div>
            
            <div class="version-info" style="background: #f8f9fa; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="font-weight: 600;">Current Version:</span>
                    <span style="font-family: 'JetBrains Mono', monospace;">${versionInfo.currentVersion}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span style="font-weight: 600;">Latest Version:</span>
                    <span style="font-family: 'JetBrains Mono', monospace; color: #27ae60;">${versionInfo.latestVersion}</span>
                </div>
            </div>
            
            <div id="updateProgress" style="margin-bottom: 20px; display: none;">
                <div style="background: #e0e0e0; border-radius: 4px; overflow: hidden; margin-bottom: 8px;">
                    <div id="progressBar" style="background: #3498db; height: 8px; width: 0%; transition: width 0.3s;"></div>
                </div>
                <div id="updateStatus" style="text-align: center; font-size: 14px; color: #666;">
                    Preparing update...
                </div>
            </div>
            
            <div class="button-group">
                <button id="updateNowBtn" class="btn-primary" onclick="performAutoUpdate()" style="width: 100%;">
                    🔄 Update Now
                </button>
            </div>
            
            <div style="margin-top: 16px; padding: 12px; background: #fff3cd; border-radius: 6px; border-left: 4px solid #ffc107;">
                <small style="color: #856404;">
                    <strong>Note:</strong> The application will restart automatically after the update completes.
                </small>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.style.display = 'none';
    }
    
    modal.onclick = null;
}

function showUpdateNotification(versionInfo) {
    const message = document.getElementById('message');
    message.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>🔄 Update available: v${versionInfo.latestVersion} (current: v${versionInfo.currentVersion})</span>
            <button onclick="performAutoUpdate()" class="btn-primary" style="padding: 4px 12px; font-size: 12px;">
                Update Now
            </button>
        </div>
    `;
    message.className = 'message success';
    message.style.display = 'block';
}

export async function performAutoUpdate() {
    const updateBtn = document.getElementById('updateNowBtn');
    const updateProgress = document.getElementById('updateProgress');
    const progressBar = document.getElementById('progressBar');
    const updateStatus = document.getElementById('updateStatus');
    
    if (updateBtn) {
        updateBtn.disabled = true;
        updateBtn.textContent = '🔄 Updating...';
    }
    
    if (updateProgress) {
        updateProgress.style.display = 'block';
    }
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 90) progress = 90;
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        
        if (updateStatus) {
            if (progress < 30) {
                updateStatus.textContent = 'Downloading update...';
            } else if (progress < 60) {
                updateStatus.textContent = 'Installing update...';
            } else {
                updateStatus.textContent = 'Finalizing installation...';
            }
        }
    }, 500);
    
    try {
        const response = await fetch('/api/auto-update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        
        const result = await response.json();
        clearInterval(progressInterval);
        
        if (progressBar) progressBar.style.width = '100%';
        
        if (result.success) {
            if (updateStatus) {
                updateStatus.textContent = 'Update completed! Restarting...';
                updateStatus.style.color = '#27ae60';
            }
            
            setTimeout(() => {
                showMessage('Update completed successfully! The page will reload automatically.', 'success');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }, 1000);
            
        } else {
            if (updateStatus) {
                updateStatus.textContent = 'Update failed: ' + result.message;
                updateStatus.style.color = '#e74c3c';
            }
            
            if (updateBtn) {
                updateBtn.disabled = false;
                updateBtn.textContent = '🔄 Retry Update';
            }
            
            showMessage('Update failed: ' + result.message, 'error');
        }
    } catch (error) {
        clearInterval(progressInterval);
        
        if (updateStatus) {
            updateStatus.textContent = 'Update failed: Network error';
            updateStatus.style.color = '#e74c3c';
        }
        
        if (updateBtn) {
            updateBtn.disabled = false;
            updateBtn.textContent = '🔄 Retry Update';
        }
        
        showMessage('Update failed: ' + error.message, 'error');
    }
}