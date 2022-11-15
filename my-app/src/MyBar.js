
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

export default function MyBar() {
    const [dataA, setDataA] = useState({});
    const [barData, setBarData] = useState({
        labels: [],
        datasets: [
        ],
    });

    const Myfetch = async () => {
        const dataSe = await axios.get("Myapp/getData");
        setDataA(dataSe);
        console.log(dataA);

    }

    useEffect(() => {
        Myfetch()
    }, [])


    const setData = () => {
        console.log(dataA);
        setBarData({
            labels: dataA.data.map((da) => da.attributes.name),
            datasets: [
                {
                    label: 'price',
                    data: dataA.data.map((d) => d.attributes.price_in_usd),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }
            ],
        });
    }


    return (
        <>
        <button onClick={setData} >Load data</button>
            <Bar
                options={options} data={barData}
            />
        </>

    );
}