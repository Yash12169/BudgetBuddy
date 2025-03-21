"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function PolarAreaChart() {
    const data = {
        labels: ["Stocks", "Equity MF", "Debt MF & FD", "Gold"],
        datasets: [
            {
                label: "",
                data: [50, 100, 100, 50],
                backgroundColor: ["#6F39C5", "#8654CD", "#9A6ED4", "#C0A4E3"],
                borderWidth: 5, // Removes borders for a smoother look
                cutout: "60%", // Creates the donut effect
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false, // Hides legend
            },
        },
    };

    return <Doughnut data={data} options={options} />;
}
