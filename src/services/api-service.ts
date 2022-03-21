import axios, { AxiosResponse } from 'axios';

const API_PREFIX = 'https://api.coingecko.com/api/v3'

export interface Coin {
    id: string;
    symbol: string;
    name: string;
}

export const getCoinHistory = (coinId: string) => {
    return axios.get(`${API_PREFIX}/coins/${coinId}/market_chart`, {
        params: {
            vs_currency: 'usd',
            days: 1,
        }
    }).then(data => data.data.prices)
}

export const getCoinList = () => {
    return axios.get(`${API_PREFIX}/coins/`).then(data => data.data.map(coin => ({
        id: coin.id,
        symbol: coin.symbol.toLocaleUpperCase(),
        name: coin.name,
    })));
}
