import React, {useEffect, useState,useRef} from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
export const UserData = [
    {
        id: 1,
        plan: 'LX123',
        userGain: 30,
    },
    {
        id: 2,
        plan: 'LX1234',
        userGain: 100,
    },
    {
        id: 3,
        plan: 'LX1235',
        userGain: 10,
    },
    {
        id: 4,
        plan: 'LX1236',
        userGain: 75,
    },
    {
        id: 5,
        plan: 'LX1238',
        userGain: 50,
    },
    {
        id: 6,
        plan: 'LX1238',
        userGain: 50,
    },
    {
        id: 7,
        plan: 'LX1238',
        userGain: 50,
    },
    {
        id: 8,
        plan: 'LX1238',
        userGain: 50,
    },
    {
        id: 9,
        plan: 'LX1238',
        userGain: 50,
    },
    {
        id: 10,
        plan: 'LX1238',
        userGain: 50,
    },
    {
        id:11,
        plan: 'LX1238',
        userGain: 50,
    },
    {
        id: 12,
        plan: 'LX1238',
        userGain: 50,
    },
    {
        id: 13,
        plan: 'LX1238',
        userGain: 100,
    },
];

function ManageProductionPlansBarChart({ chartData }) {
    const options = {
        indexAxis: 'y',
        plugins: {
            legend: {
                display: false,
            },

        },
    };
    return (
        <div style={{ width: '500px'}}>
            <Bar
                data={chartData}
                options={options}
            />
        </div>
    );
}

export default ManageProductionPlansBarChart;