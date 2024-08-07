// src/components/ProductCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LikeButton from '../LikeButton';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const ProductCard = ({ id, image, name, positive, negative }) => {
    const shortName = name.length > 40 ? `${name.slice(0, 40)}...` : name;
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/report/${encodeURIComponent(id)}`);
    };

    // Convert rating to percentage
    const positivePercentage = positive; // Assuming rating is out of 5
    const negativePercentage = negative;
    const neutralPercentage = 100 - positivePercentage - negativePercentage;

    const data = {
        labels: [''],
        datasets: [
            {
                label: 'Positive',
                data: [positivePercentage],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
            {
                label: 'Neutral',
                data: [neutralPercentage],
                backgroundColor: 'rgba(109, 115, 120, 0.8)',
                borderColor: 'rgba(80, 84, 87, 1)',
                borderWidth: 2,
            },
            {
                label: 'Negative',
                data: [negativePercentage],
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
            },


        ],
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Positivity Distribution',
                align: 'center',
            },
            tooltip: {
                enabled: false, // Disable the tooltip
            },
            datalabels: {
                display: true,
                color: 'white',
                formatter: (value) => (value >= 11 ? `${value}%` : ''),
                anchor: 'center',
                align: 'center',
                font: {
                    weight: 'bold',
                    size: 16,
                },
            },
        },
        scales: {
            x: {
                stacked: true,
                beginAtZero: true,
                max: 100, // Set max to 100 for percentage scale
                display: false, // Hide the x-axis labels
            },
            y: {
                stacked: true,
            },
        },
        layout: {
            padding: {
                right: 11, // Add padding to the left
            },
        },
    };

    return (
        <div
            className="relative group w-65 h-96 bg-green-200 rounded-lg shadow-lg overflow-hidden cursor-pointer p-1.5"
            onClick={handleCardClick}
        >
            <div className="relative w-full h-2/5 flex items-center justify-center bg-white">
                <img
                    src={`data:image/jpeg;base64,${image}`}
                    alt={shortName}
                    className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-blue-100 rounded-full p-2 flex items-center justify-center w-12 h-12">
                        <LikeButton reportId={id} />
                    </div>
                </div>
            </div>
            <div className="w-full h-3/5 flex flex-col justify-center items-center p-2">
                <div className="relative">
                    <p className="text-lg font-semibold text-black text-center">{shortName}</p>
                    <div className="absolute bottom-0 left-0 right-0 mt-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* <p className="text-sm font-semibold text-black bg-gray-100 p-1 rounded shadow">{name}</p> */}
                    </div>
                </div>
                <div className="w-full h-20">
                    <Bar data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
