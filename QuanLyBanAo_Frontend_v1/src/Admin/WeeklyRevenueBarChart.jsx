import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar } from 'react-chartjs-2';
import 'animate.css/animate.min.css';

const rawData = [
    {
        "dayOfWeek": 1,
        "month": 11,
        "year": 2023,
        "totalPrice": 934.0
    },
    {
        "dayOfWeek": 3,
        "month": 12,
        "year": 2023,
        "totalPrice": 419.0
    },
    {
        "dayOfWeek": 4,
        "month": 11,
        "year": 2023,
        "totalPrice": 155.0
    },
    {
        "dayOfWeek": 5,
        "month": 11,
        "year": 2023,
        "totalPrice": 130.0
    },
    {
        "dayOfWeek": 7,
        "month": 12,
        "year": 2023,
        "totalPrice": 3185.0
    }
];

const WeeklyRevenueBarChart = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (startDate && endDate) {
            const filteredData = rawData.filter((item) => {
                const itemDate = new Date(item.year, item.month - 1, item.dayOfWeek);
                return itemDate >= startDate && itemDate <= endDate;
            });

            const processedData = processData(filteredData);
            setData(processedData);
        }
    }, [startDate, endDate]);

    const handleSearch = () => {
        // You can perform additional actions here if needed
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    const processData = (data) => {
        const processedData = Array.from({ length: 7 }, () => 0);

        data.forEach((item) => {
            const weekIndex = item.dayOfWeek - 1;
            processedData[weekIndex] += item.totalPrice;
        });

        return processedData;
    };

    return (
        <div className="p-4 border border-gray-300 rounded-md shadow-md bg-white animate__animated animate__fadeInUp z-auto">
            <h2 className="text-3xl font-bold mb-4 text-blue-500 text-center">Weekly Revenue Bar Chart</h2>

            <div className='flex gap-4'>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Choose start date:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        popperPlacement='right'
                        dateFormat="dd-MM-yyyy"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">CHoose end date:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        popperPlacement='right'
                        dateFormat="dd-MM-yyyy"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                {/* <button
                    onClick={handleSearch}
                    className="bg-blue-500 h-12 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    <span className="animate__animated animate__heartBeat animate__infinite">Tìm kiếm</span>
                </button> */}
            </div>

            {data.length > 0 ? (
                <Bar data={{ labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ data, label: 'Doanh thu theo thứ trong tuần', }] }} options={options} />
            ) : (
                <p className="mt-4 text-gray-500">Not found data to show</p>
            )}
        </div>
    );
};

export default WeeklyRevenueBarChart;
