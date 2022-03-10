import axios from 'axios';

const API_PREFIX = 'https://api.coingecko.com/api/v3'

export const getCoinHistory = (coinId: string) => {
    return axios.get(`${API_PREFIX}/coins/${coinId}/market_chart`, {
        params: {
            vs_currency: 'usd',
            days: 1,
        }
    }).then(data => data.data.prices)
}
