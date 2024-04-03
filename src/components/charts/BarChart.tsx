import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
  barThickness:40,
  maintainAspectRatio:false,
  font: { family: "Poppins", size:5 },
  plugins: {
    legend: {
        display:false,
      position: 'top' as const,
      font: {
        family:'Poppins', size:4
      }
    },
    title: {
      display: false,
    },
    labels: {
        color: "rgb(255, 99, 132)",
        font: {
          family: "Poppins"
        }
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              color: "red"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              color: "blue"
            }
          }
        ]
      }
  }
};


export function BarChart(props:{bg?:string, dataList:any[]}) {
    const {bg} = props
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September','October', 'November', 'December']; 

    const data = {
        labels,
        datasets: [
          {
            label: '',
            data: props?.dataList,
            backgroundColor: bg?bg:'#397ADB',
          }
        ],
      };
  return <Bar className='font-poppins text-primary'  width={'30%'} options={options} data={data} />;
}
