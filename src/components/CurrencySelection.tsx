import React from 'react';
import SelectedCurrenciesList from './SelectedCurrenciesList';
import { Coin } from '../services/api-service';

interface CurrencySelectionProps {
    selectedCurrencies: string[];
    coinList: Coin[];
    handleChange: (e) => void;
    handleDelete: (value: string) => () => void;
}

const CurrencySelection: React.FC<CurrencySelectionProps>  = ({selectedCurrencies, handleChange, coinList, handleDelete}) => {
    return (
        <div className='currencies-selection'>
            <div className='currencies-selection__content'>
                <select className="currencies-selection__select"
                        disabled={selectedCurrencies.length >= 5}
                        onChange={handleChange}
                        data-testid="select">
                    <option value="" hidden>Choose a coin</option>
                    {coinList.map(coin => <option key={coin.id} disabled={selectedCurrencies.includes(coin.id)} value={coin.id}>{coin.symbol + ' - ' + coin.name}</option>)}
                </select>

                <SelectedCurrenciesList currencies={selectedCurrencies} handleClick={handleDelete}/>
            </div>
        </div>
    );
}

export default CurrencySelection;