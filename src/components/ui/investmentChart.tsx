"use client";
import { PolarArea } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, RadialLinearScale } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, RadialLinearScale);

export default function PolarAreaChart() {

    const data = {
        labels: ["Stocks", "Equity MF", "Debt MF & FD","Gold"],
        datasets: [
            {
                label: "",
                data: [50, 100, 100, 50],
                backgroundColor : ["#6F39C5", "#8654CD", "#9A6ED4","#C0A4E3"]
            }
        ]
    };
    const options = {
        plugins: {
            legend: {
                display: false 
            }
        }
    };

    return <PolarArea data={data} options={options} />;
}
