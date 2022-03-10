export const saveCurrenciesToStorage = (currencies: string[]) => {
    window.localStorage.setItem('currencies', JSON.stringify(currencies))
}

export const loadCurrenciesFromStorage = () => {
    return JSON.parse(window.localStorage.getItem('currencies')) || [];
}