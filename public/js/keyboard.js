// Keyboard navigation functionality
import { 
    selectedCardIndex, 
    visibleCards,
    setSelectedCardIndex,
    setVisibleCards,
    preConfiguredServers
} from './state.js';
import { isServerInstalled } from './utils.js';

export function clearSelection() {
    setSelectedCardIndex(-1);
    const cards = document.querySelectorAll('.server-card');
    cards.forEach(card => {
        card.classList.remove('keyboard-selected');
    });
}

export function initializeKeyboardNavigation() {
    const searchBox = document.querySelector('.search-box');
    
    searchBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchEnterKey();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateCards(1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateCards(-1);
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateCards(1);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateCards(-1);
        } else if (e.key === 'Enter' && selectedCardIndex >= 0) {
            e.preventDefault();
            activateSelectedCard();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            clearSelection();
            searchBox.focus();
        }
    });
}

function updateVisibleCards() {
    const cards = Array.from(document.querySelectorAll('.server-card:not(.uninstalling)'));
    setVisibleCards(cards);
}

function handleSearchEnterKey() {
    updateVisibleCards();
    
    if (visibleCards.length === 0) {
        return;
    } else if (visibleCards.length === 1) {
        const card = visibleCards[0];
        const serverKey = getServerKeyFromCard(card);
        if (serverKey) {
            const server = preConfiguredServers[serverKey];
            const isInstalled = isServerInstalled(serverKey, server);
            
            if (isInstalled) {
                window.configureServer(serverKey);
            } else {
                const requiresConfig = server.requiredEnvVars && server.requiredEnvVars.length > 0;
                if (requiresConfig) {
                    window.configureServer(serverKey);
                } else {
                    window.quickInstallServer(serverKey);
                }
            }
        }
    } else {
        setSelectedCardIndex(0);
        updateCardSelection();
    }
}

function navigateCards(direction) {
    updateVisibleCards();
    
    if (visibleCards.length === 0) return;
    
    if (selectedCardIndex === -1) {
        setSelectedCardIndex(direction > 0 ? 0 : visibleCards.length - 1);
    } else {
        let newIndex = selectedCardIndex + direction;
        
        if (newIndex < 0) {
            newIndex = visibleCards.length - 1;
        } else if (newIndex >= visibleCards.length) {
            newIndex = 0;
        }
        
        setSelectedCardIndex(newIndex);
    }
    
    updateCardSelection();
}

function updateCardSelection() {
    visibleCards.forEach((card) => {
        card.classList.remove('keyboard-selected');
    });
    
    if (selectedCardIndex >= 0 && selectedCardIndex < visibleCards.length) {
        const selectedCard = visibleCards[selectedCardIndex];
        selectedCard.classList.add('keyboard-selected');
        selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function activateSelectedCard() {
    if (selectedCardIndex >= 0 && selectedCardIndex < visibleCards.length) {
        const card = visibleCards[selectedCardIndex];
        const serverKey = getServerKeyFromCard(card);
        
        if (serverKey) {
            const server = preConfiguredServers[serverKey];
            const isInstalled = isServerInstalled(serverKey, server);
            
            if (isInstalled) {
                window.configureServer(serverKey);
            } else {
                const requiresConfig = server.requiredEnvVars && server.requiredEnvVars.length > 0;
                if (requiresConfig) {
                    window.configureServer(serverKey);
                } else {
                    window.quickInstallServer(serverKey);
                }
            }
        }
    }
}

function getServerKeyFromCard(card) {
    const configureBtn = card.querySelector('button[onclick*="configureServer"]');
    if (configureBtn) {
        const onclickAttr = configureBtn.getAttribute('onclick');
        const match = onclickAttr.match(/configureServer\('([^']+)'\)/);
        if (match) {
            return match[1];
        }
    }
    return null;
}