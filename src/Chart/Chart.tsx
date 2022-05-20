// @ts-nocheck
import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import './Chart.css';
import {Bar} from 'react-chartjs-2';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Финансы',
        },
    },
};

const labels = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'];
const years = ['2020', '2021', '2022']


export default function Chart() {
    const params = useParams();
    const [data, setData] = useState({
        "2020": {
            "income": [0, 0, 0, 0, 0, 0, 0],
            "profit": [0, 0, 0, 0, 0, 0, 0],
        }
    });
    const [year, setYear] = useState(params.yearId);

    const dataForChart = {
        labels,
        datasets: [
            {
                label: 'Выручка',
                data: data.income,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Прибыль',
                data: data.profit,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                `https://my-json-server.typicode.com/helly-15/ssr-db/${year}`,
            );
            setData(result.data);
        }

        fetchData()
    }, [year]);

    return <div className={'chart-wrapper'}>
        <Bar options={options} data={dataForChart}/>
        {years.map((year) =>
            <Link
                className='chart-wrapper__year'
                to={`/${year}`}
                key={year}
                exact={'true'}
                onClick={() => setYear(year)}
            >{year}</Link>
        )}
    </div>;
}
