// State management module
let currentConfig = { mcpServers: {} };
let preConfiguredServers = {};
let savedVariables = {};
let starsData = {};
let selectedCardIndex = -1;
let visibleCards = [];
let currentGroupBy = 'none';
let currentSortBy = 'a-z'; // Default sort: a-z, options: 'a-z', 'z-a', 'stars'
let currentStarsFilter = 500; // Default to 500+ stars filter

export {
    currentConfig,
    preConfiguredServers,
    savedVariables,
    starsData,
    selectedCardIndex,
    visibleCards,
    currentGroupBy,
    currentSortBy,
    currentStarsFilter
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

export function setCurrentSortBy(sortBy) {
    currentSortBy = sortBy;
}

export function setCurrentStarsFilter(starsFilter) {
    currentStarsFilter = starsFilter;
}