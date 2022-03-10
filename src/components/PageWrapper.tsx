import * as React from 'react';
import Chart from './Chart';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { loadCurrenciesFromStorage, saveCurrenciesToStorage } from '../services/localStorageService';
import SelectedCurrenciesList from './SelectedCurrenciesList';

const coinList = [
    'ethereum',
    'bitcoin',
    'monero',
    'dogecoin',
    'polkadot',
    'litecoin',
    'binancecoin',
    'solana',
    'cosmos',
]

const PageWrapper: React.FC = () => {
    const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);

    useEffect(() => {
        setSelectedCurrencies(loadCurrenciesFromStorage());
    }, []);

    const handleChange = (event: BaseSyntheticEvent) => {
        const value = event.target.value;
        event.target.value = '';
        if (selectedCurrencies.length < 5 && !selectedCurrencies.includes(value)) {
            saveCurrenciesState([...selectedCurrencies, value]);
        }
    }

    const deleteFromList = (value: string) => () => {
        saveCurrenciesState(selectedCurrencies.filter(currency => currency !== value));
    }

    const saveCurrenciesState = (state: string[]) => {
        setSelectedCurrencies(state);
        saveCurrenciesToStorage(state);
    }

    return (
        <>
            <div className='currencies-selection'>
                <select className="currencies-selection__select"
                        disabled={selectedCurrencies.length >= 5}
                        onChange={handleChange}
                        data-testid="select">
                    <option value="" hidden>Choose a coin</option>
                    {coinList.map(coin => <option key={coin} disabled={selectedCurrencies.includes(coin)} value={coin}>{coin}</option>)}
                </select>

                <SelectedCurrenciesList currencies={selectedCurrencies} handleClick={deleteFromList}/>
            </div>

            <div className="chart-list"
                 data-testid="chart-list">
                {selectedCurrencies.map((currency, i) => (
                    <Chart key={currency} currency={currency} colorIndex={i}/>
                ))}
            </div>
        </>
    );
}

export default PageWrapper;