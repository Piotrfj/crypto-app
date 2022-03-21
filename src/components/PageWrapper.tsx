import * as React from 'react';
import Chart from './Chart';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { loadCurrenciesFromStorage, saveCurrenciesToStorage } from '../services/localStorageService';
import { Coin, getCoinList } from '../services/api-service';
import CurrencySelection from './CurrencySelection';

const PageWrapper: React.FC = () => {
    const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
    const [coinList, setCoinList] = useState<Coin[]>([]);

    useEffect(() => {
        setSelectedCurrencies(loadCurrenciesFromStorage());
        getCoinList().then(data => {
            setCoinList(data)
        })
    }, []);

    const handleChange = (event: BaseSyntheticEvent) => {
        const value = event.target.value;
        event.target.value = '';
        if (selectedCurrencies.length < 5 && !selectedCurrencies.includes(value)) {
            saveCurrenciesState([...selectedCurrencies, value]);
        }
    }

    const handleDelete = (value: string) => () => {
        saveCurrenciesState(selectedCurrencies.filter(currency => currency !== value));
    }

    const saveCurrenciesState = (state: string[]) => {
        setSelectedCurrencies(state);
        saveCurrenciesToStorage(state);
    }

    return (
        <main className='home'>
            {coinList.length > 0 &&
                <CurrencySelection handleChange={handleChange} handleDelete={handleDelete} coinList={coinList} selectedCurrencies={selectedCurrencies}/>
            }

            <div className="chart-list"
                 data-testid="chart-list">
                {selectedCurrencies.map((currency, i) => (
                    <Chart key={currency} currency={currency} colorIndex={i}/>
                ))}
            </div>
        </main>
    );
}

export default PageWrapper;