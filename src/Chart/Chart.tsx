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
import { Bar } from 'react-chartjs-2';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {Profile} from "../Profile/Profile";

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
        // legend: {
        //     display: true,
        //     labels: {
        //         color: 'rgb(255, 99, 132)'
        //     },
        //     // display: true,
        //     // position: 'top',
        //     usePointStyle: true,
        //     pointStyle: 'circle',
        //     // align: 'start',
        // },

        // legend: {
        //     display: true,
        //     labels: {
        //         color: 'rgb(255, 99, 132)'
        //     }
        // }
    },
    scales: {
        y: {
            ticks: {
                callback: function(value, index, ticks) {
                    return value + ' млрд. ₽';
                }
            }
        }
    }
};

const labels = ['2001', '2002', '2003', '2018', '2019', '2020', '2021'];
const companies = ['wildberries', 'google', 'toyota'];

export default function ChartComponent(props) {
    const params = useParams();
    const stateFromSSR = props.componentData || {
        "income": [0, 0, 0, 0, 0, 0, 0],
        "profit": [0, 0, 0, 0, 0, 0, 0],
        "profile": {
            "regDate": "",
            "capital": "",
            "address": "",
            "ogrn": "",
            "inn": ""
        }
    };

    const [data, setData] = useState(stateFromSSR);
    const [company, setCompany] = useState(params.companyId?.split('-')[0]);
    const chartRef = useRef<ChartJS>(null);
    const dataForChartConst = {
        labels,
        datasets: [
            {
                label: 'Выручка',
                data: data.income,
                type: 'bar' as const,
                backgroundColor: 'rgb(17, 187, 136)',
            },
            {
                label: 'Прибыль',
                data: data.profit,
                type: 'bar' as const,
                backgroundColor: 'rgba(0, 0, 0)',
            },
        ]
    };
    let dataForChart = {
        labels,
        datasets: [
            {
                label: 'Выручка',
                type: 'bar' as const,
                data: data.income,
                backgroundColor: 'rgb(17, 187, 136)',
            },
            {
                label: 'Прибыль',
                data: data.profit,
                type: 'bar' as const,
                backgroundColor: 'rgba(0, 0, 0)',
            },
        ]
    };
    useEffect(() => {
        async function fetchDataOnline() {
            try {
                const result = await axios(
                    `https://my-json-server.typicode.com/helly-15/ssr-db/${company}`,
                );
                setData(result.data);
            } catch (err) {
                console.log('backend response fail')
            }
        }

        fetchDataOnline()
    }, [company]);
    const allButton = useRef(null);
    const profitButton = useRef(null);
    const incomeButton = useRef(null);
    const legendButtons = [
        allButton, incomeButton, profitButton
    ]
    const onButtonClick = (e) => {
        // legendButtons.forEach(button => {
        //     button.current.classList.remove('button-active')
        // })
        // e.target.classList.toggle('button-active');
        // const filterField = e.target.innerText;
        // dataForChart = filterField === "Все" ? {...dataForChartConst} : {
        //     ...dataForChartConst,
        //     datasets: dataForChartConst.datasets.filter(dataItem => dataItem.label === filterField)
        // }


       // chartRef.current.clear();
        ////chartRef.current.destroy();
        //chartRef.current.draw();
       // chartRef.current.clear();
       //   chartRef.current.update('active');
        ////chartRef.current.reset();
        ////chartRef.current.buildOrUpdateScales();

        // chartRef.current.render();


        chartRef.current.setDatasetVisibility(0, !chartRef.current.isDatasetVisible(0));


        chartRef.current.update();



        console.log(dataForChart)
        console.log(chartRef.current.options)
    }
    return <>
        <div className='chart-wrapper__company_wrapper'>
            {companies.map((company) =>
                <Link
                    className='chart-wrapper__company'
                    to={`/${company}`}
                    key={company}
                    exact={'true'}
                    onClick={() => setCompany(company)}
                >{company}</Link>
            )}
        </div>

        <Profile profile={data.profile}/>
        <div className={'chart-wrapper'}>
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
            <Bar ref={chartRef} data={dataForChart} options={options}/>
        </div>
    </>
}

