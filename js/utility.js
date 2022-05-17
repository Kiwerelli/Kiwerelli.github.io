function resetFilter(idFilter, idTable) {
    document.getElementById(idFilter).value = '';
    filterTabs(idFilter, idTable);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}