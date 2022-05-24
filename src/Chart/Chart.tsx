// @ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
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
            display: true,
            position: 'top',
            usePointStyle: true,
            pointStyle: 'circle',
            align: 'start',
        },
    }
};

const labels = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'];
const years = ['2020', '2021', '2022'];

export default function Chart(props) {
    const params = useParams();
    const stateFromSSR = props.componentData || {
        "income": [0, 0, 0, 0, 0, 0, 0],
        "profit": [0, 0, 0, 0, 0, 0, 0],
    };

    const [data, setData] = useState(stateFromSSR);
    const [year, setYear] = useState(params.yearId?.slice(0, 4));

    const dataForChartConst = {
        labels,
        datasets: [
            {
                label: 'Выручка',
                data: data.income,
                backgroundColor: 'rgb(17, 187, 136)',
                barThickness: 20,
                maxBarThickness: 20,
            },
            {
                label: 'Прибыль',
                data: data.profit,
                backgroundColor: 'rgba(0, 0, 0)',
                barThickness: 20,
                maxBarThickness: 20,
            },
        ]
    };
    let dataForChart = {
        labels,
        datasets: [
            {
                label: 'Выручка',
                data: data.income,
                backgroundColor: 'rgb(17, 187, 136)',
                barThickness: 20,
                maxBarThickness: 20,
            },
            {
                label: 'Прибыль',
                data: data.profit,
                backgroundColor: 'rgba(0, 0, 0)',
                barThickness: 20,
                maxBarThickness: 20,
            },
        ]
    };
    useEffect(() => {
        async function fetchDataOnline() {
            try {
                const result = await axios(
                    `https://my-json-server.typicode.com/helly-15/ssr-db/${year}`,
                );
                setData(result.data);
            } catch (err) {
                setData({
                    "2020": {
                        "income": [10, 10, 10, 10, 10, 10, 10],
                        "profit": [10, 10, 10, 10, 10, 10, 10],
                    }
                });
            }
        }

        fetchDataOnline()
    }, [year]);
    const allButton = useRef(null);
    const profitButton = useRef(null);
    const incomeButton = useRef(null);
    const legendButtons = [
        allButton, incomeButton, profitButton
    ]
    const onButtonClick = (e) => {
        legendButtons.forEach(button => {
            button.current.classList.remove('button-active')
        })
        e.target.classList.toggle('button-active');
        const filterField = e.target.innerText;
        dataForChart = filterField === "Все"?{...dataForChartConst}:{...dataForChartConst, datasets:dataForChartConst.datasets.filter(dataItem => dataItem.label === filterField)}
        console.log(dataForChart);
    }
    return <div className={'chart-wrapper'}>
        <p className={'chart-wrapper__title'}> Финансы </p>
        <p className={'chart-wrapper__subtitle'}> Данные по финансовым показателям приведены на
            основании <b> бухгалтерской отчетности</b></p>
        <div className={'chart-wrapper__legend'}>
            <button ref={allButton} onClick={(e) => onButtonClick(e)} className={'chart-wrapper__legend-button'}>Все
            </button>
            <button ref={incomeButton} onClick={(e) => onButtonClick(e)}
                    className={'chart-wrapper__legend-button chart-wrapper__legend-button_withdot'}>
                <span className={'chart-wrapper__legend-button_dot chart-wrapper__legend-button_dot_profit'}/>
                Выручка
            </button>
            <button ref={profitButton} onClick={(e) => onButtonClick(e)}
                    className={'chart-wrapper__legend-button chart-wrapper__legend-button_withdot'}>
                <span className={'chart-wrapper__legend-button_dot chart-wrapper__legend-button_dot_income'}/>
                Прибыль
            </button>
        </div>
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

