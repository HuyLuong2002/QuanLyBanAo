import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './dashboard.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
// import { getAllOrders } from '../../actions/orderAction';
// import { getAllUsers } from '../../actions/userAction';
import * as Utils from '../utils/Utils';
import { Chart } from 'chart.js';
import * as ChartJS from 'chart.js';
import { getAdminProduct, getProduct } from '../actions/productAction';
import MetaData from '../components/layout/MetaData';
import { getAllUsers } from '../actions/userAction';
import axios from 'axios';
import { getAllOrders } from '../actions/orderAction';

const controllers = Object.values(ChartJS).filter((chart) => chart.id !== undefined);
Chart.register(...controllers);

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);

    let outOfStock = 0;

    products &&
        products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1;
            }
        });
    useEffect(() => {
        dispatch(getProduct());
        dispatch(getAllUsers());
        dispatch(getAllOrders());
    }, [dispatch]);

    let totalAmount = 0;
    // orders &&
    //     orders.forEach((item) => {
    //         totalAmount += item.totalPrice;
    //     });

    const lineState = {
        labels: ['Initial Amount', 'Amount Earned'],
        datasets: [
            {
                label: 'TOTAL AMOUNT',
                backgroundColor: ['tomato'],
                hoverBackgroundColor: ['rgb(197, 72, 49)'],
                data: [0, totalAmount],
            },
        ],
    };

    const doughnutState = {
        labels: ['Out of Stock', 'InStock'],
        datasets: [
            {
                backgroundColor: ['#00A6B4', '#6800B4'],
                hoverBackgroundColor: ['#4B5000', '#35014F'],
                data: [outOfStock, products?.length - outOfStock],
            },
        ],
    };

    const barState = {
        labels: Utils.months({ count: 7 }),
        datasets: [
            {
                label: 'Total User each month',
                data: [65, users?.length, 80, 81, 56, 55, 40],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)',
                ],
                borderWidth: 1,
            },
        ],
    };

    console.log("users: ", users);

    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ${totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products?.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders?.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users?.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <h1 className='text-2xl font-semibold text-center mb-4'>REVENUE</h1>
                    <Line data={lineState} />
                </div>

                <div className='flex justify-around mt-12'>
                    <div className="w-[30%] h-full">
                        <h1 className='text-2xl font-semibold text-center mb-4'>PRODUCT</h1>
                        <Doughnut data={doughnutState} />
                    </div>

                    <div className="w-[60%] h-full">
                        <h1 className='text-2xl font-semibold text-center mb-4'>USER</h1>
                        <Bar data={barState} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
