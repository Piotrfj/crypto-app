import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import * as React from 'react';

interface SelectedCurrenciesListProps {
    currencies: string[];
    handleClick: (currency: string) => () => void;
}

const SelectedCurrenciesList: React.FC<SelectedCurrenciesListProps> = ({currencies, handleClick}) => {
    return (
        <div className='currencies-list'
             data-testid="currencies-list">
            {currencies.map(currency =>
                <Button key={currency}
                        onClick={handleClick(currency)}
                        variant="contained"
                        color="error"
                        endIcon={<DeleteForeverIcon/>}>
                    {currency}
                </Button>)}
        </div>
    )
}

export default SelectedCurrenciesList;