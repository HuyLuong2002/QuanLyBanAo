import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const rawData = [
    {
        "dayOfWeek": 1,
        "totalPrice": 934.0
    },
    {
        "dayOfWeek": 3,
        "totalPrice": 419.0
    },
    {
        "dayOfWeek": 4,
        "totalPrice": 155.0
    },
    {
        "dayOfWeek": 5,
        "totalPrice": 130.0
    },
    {
        "dayOfWeek": 7,
        "totalPrice": 3185.0
    }
];

const processData = (data) => {
    const dailyData = Array.from({ length: 7 }, () => 0);

    data.forEach((item) => {
        dailyData[item.dayOfWeek - 1] += item.totalPrice;
    });

    return dailyData;
};

const getWeeksInMonth = (month, year) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();

    let weeks = [];
    let currentWeek = [];

    for (let i = 0; i < daysInMonth + firstDayOfWeek; i++) {
        const day = i - firstDayOfWeek + 1;
        if (i >= firstDayOfWeek) {
            const date = new Date(year, month - 1, day);
            currentWeek.push(date);

            if (date.getDay() === 6 || i === daysInMonth + firstDayOfWeek - 1) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        } else {
            currentWeek.push(null);
        }
    }

    return weeks;
};

const WeeklyRevenueBarChart = () => {
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [data, setData] = useState([]);

    useEffect(() => {
        const processedData = processData(rawData);
        setData(processedData);
    }, [selectedWeek, selectedMonth, selectedYear]);

    const handleWeekChange = (event) => {
        setSelectedWeek(parseInt(event.target.value));
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

    const generateWeekOptions = () => {
        const weeksInMonth = getWeeksInMonth(selectedMonth, selectedYear);
        return weeksInMonth.map((week, index) => (
            <option key={index + 1} value={index + 1}>
                Tuần {index + 1}
            </option>
        ));
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

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2>Weekly Revenue Bar Chart</h2>

                <div>
                    <label>Chọn tuần:</label>
                    <select value={selectedWeek} onChange={handleWeekChange}>
                        {generateWeekOptions()}
                    </select>

                    <label>Chọn tháng:</label>
                    <select value={selectedMonth} onChange={handleMonthChange}>
                        {Array.from({ length: 12 }, (_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
                    </select>

                    <label>Chọn năm:</label>
                    <select value={selectedYear} onChange={handleYearChange}>
                        {Array.from({ length: 5 }, (_, index) => (
                            <option key={index} value={new Date().getFullYear() - index}>
                                {new Date().getFullYear() - index}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <Bar data={{ labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ data }] }} options={options} />
        </div>
    );
};

export default WeeklyRevenueBarChart;
