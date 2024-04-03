import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

const options: any = {
    responsive: true,
    // cutout: 40,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            display: false,
            position: "right",
            labels: {
                font: {
                    size: 11,
                    family: 'poppins',
                },
                usePointStyle: true,
                // boxWidth: 360,
                // padding: 12,
                // pointStyle: 'rect',
                // position: 'right',
                // rtl: true,
                // maxWidth: 590
            },

        },
    },
};
export const PieChart = (props:{data:any[], colors:string[], labels:string[]}) => {
    const data = {
        legend: {
            display: true,
            position: "right",
        },
        labels: props.labels,
        datasets: [
            {
                data: props.data.map((item:any)=>item.value)||[],
                backgroundColor:
                props.data[0]===0&&props.data[1]===0
                ?
                ['#f1f1f1']
                : 
                props.data.map((item:any)=>item.color),
    
                borderWidth: 0,
                // borderRadius: 100,
            },
    
        ],
    };
    return (
        <div style={{ width: 280, height: 190 }} className='mx-0'>
                <Pie
                    className='mx-aut'
                    data={data}
                    options={options}
                    height={106}
                    width={106}
                />
        </div>
    )
}
