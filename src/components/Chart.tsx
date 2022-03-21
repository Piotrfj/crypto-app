import * as React from 'react';
import { useEffect, useState } from 'react';
import { getCoinHistory } from '../services/api-service';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import dayjs from 'dayjs'
import { CircularProgress } from '@mui/material';

interface ChartProps {
    currency: string;
    colorIndex: number;
}

interface ChartData {
    amount: number;
    time: string;
}

const colors = [
    '#C771F5',
    '#DAC969',
    '#4492EB',
    '#D67F4D',
    '#3BF785',
]

const Chart: React.FC<ChartProps> = ({currency, colorIndex}) => {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [currentPrice, setCurrentPrice] = useState<number>(undefined);

    useEffect(() => {
        getCoinHistory(currency).then(data => {
            setChartData(data.map(dat => ({time: dayjs(dat[0]).format('HH:mm'), amount: dat[1]})));
            setCurrentPrice(data[data.length - 1][1]);
        });
    }, [currency])

    return (
        <div className="chart">
            <p className="chart__heading">{currency}{currentPrice && ' - $' + currentPrice.toFixed(2)}</p>
            {chartData.length === 0 ?
                <CircularProgress className="chart__loading-spinner"/>
                :
                <ResponsiveContainer width='90%' height='100%'>
                    <LineChart data={chartData}>
                        <XAxis minTickGap={20} dataKey="time"/>
                        <YAxis width={80} tickFormatter={value => '$' + value} tickCount={10}
                               domain={['auto', 'auto']}/>
                        <CartesianGrid stroke="#eee" strokeDasharray="2 2"/>
                        <Line type="monotone" dataKey="amount" dot={false} stroke={colors[colorIndex]} strokeWidth={3}/>
                    </LineChart>
                </ResponsiveContainer>
            }
        </div>
    );
}

export default Chart