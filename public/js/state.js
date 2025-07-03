// State management module
let currentConfig = { mcpServers: {} };
let preConfiguredServers = {};
let savedVariables = {};
let starsData = {};
let selectedCardIndex = -1;
let visibleCards = [];
let currentGroupBy = 'none';

export {
    currentConfig,
    preConfiguredServers,
    savedVariables,
    starsData,
    selectedCardIndex,
    visibleCards,
    currentGroupBy
};

export function setCurrentConfig(config) {
    currentConfig = config;
}

export function setPreConfiguredServers(servers) {
    preConfiguredServers = servers;
}

export function setSavedVariables(variables) {
    savedVariables = variables;
}

export function setStarsData(data) {
    starsData = data;
}

export function setSelectedCardIndex(index) {
    selectedCardIndex = index;
}

export function setVisibleCards(cards) {
    visibleCards = cards;
}

export function setCurrentGroupBy(groupBy) {
    currentGroupBy = groupBy;
}