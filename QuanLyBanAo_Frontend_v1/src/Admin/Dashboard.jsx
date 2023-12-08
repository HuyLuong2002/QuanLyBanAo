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
import { Chart, TimeScale } from 'chart.js';
import * as ChartJS from 'chart.js';
import { getAdminProduct, getProduct } from '../actions/productAction';
import MetaData from '../components/layout/MetaData';
import { getAllUsers } from '../actions/userAction';
import axios from 'axios';
import { getAllOrders } from '../actions/orderAction';
import { Space, Table, Tag } from 'antd';
import WeeklyRevenueBarChart from './WeeklyRevenueBarChart';

const revenueData = [
    {
        "year": 2023,
        "month": 11,
        "totalPrice": 500.0
    },
    {
        "year": 2023,
        "month": 12,
        "totalPrice": 4323.0
    }
];

const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a href='/'>{text}</a>,
    },
    {
        title: 'Image',
        dataIndex: 'image',
        width: 120,
        maxWidth: 120,
        render: (t, r) => <img src={`${r.image}`} alt='' className='text-center' />
    },
    {
        title: 'Total sell',
        dataIndex: 'totalSell',
        key: 'totalSell',
        align: 'center'
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        align: 'center'
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        align: 'center'
    },
    {
        title: 'Size',
        dataIndex: 'size',
        key: 'size',
    },
    {
        title: 'Color',
        key: 'color',
        dataIndex: 'color',
        render: (_, { color }) => (
            <>
                {
                    color === "GREEN" ? (
                        <Tag color='green' key={color}>
                            {color}
                        </Tag>
                    ) : color === "YELLOW" ? (
                        <Tag color={'yellow'} key={color}>
                            {color}
                        </Tag>
                    ) : color === "BLUE" ? (
                        <Tag color={'blue'} key={color}>
                            {color}
                        </Tag>
                    ) : (
                        <Tag color={'red'} key={color}>
                            {color}
                        </Tag>
                    )
                }
            </>
        ),
    },
];

const columns2 = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Total Quantity',
        dataIndex: 'totalQuantity',
        key: 'totalQuantity',
        align: 'center'
    },
    {
        title: 'Sex',
        dataIndex: 'sex',
        key: 'sex',
        align: 'center'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        align: 'center'
    },
    {
        title: 'Telephone',
        dataIndex: 'tel',
        key: 'tel',
    },
];

const controllers = Object.values(ChartJS).filter((chart) => chart.id !== undefined);
Chart.register(...controllers);

const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);

    const [top5Employee, settop5Employee] = useState([])
    const [top5Customer, settop5Customer] = useState([])
    const [top10Product, setTop10Product] = useState([])
    const [selectedYear, setSelectedYear] = useState(2023);

    const filteredData = revenueData.filter(item => item.year === selectedYear);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const yearData = filteredData.reduce((acc, item) => {
        acc[item.month] = item.totalPrice;
        return acc;
    }, {});

    let data2 = []
    let data3 = []

    const handleYearChange = (event) => {
        const selectedYear = parseInt(event.target.value);
        setSelectedYear(selectedYear);
    };

    const getTop10Products = async () => {
        const { data } = await axios.get("http://localhost:8081/api/v1/statistical/top10ProductBestSell");
        setTop10Product(data)
    }

    const getTop5Customers = async () => {
        const { data } = await axios.get("http://localhost:8081/api/v1/statistical/top10CustomerBestSell");
        settop5Customer(data)
    }

    data2 = top5Customer && top5Customer.map(item => {
        return {
            id: item.customer.id,
            lastName: item.customer.lastName,
            firstName: item.customer.firstName,
            email: item.customer.email,
            totalQuantity: item.totalQuantity,
            sex: item.customer.sex,
            address: item.customer.address,
            tel: item.customer.tel,
        }
    }, [])

    data3 = top10Product && top10Product.map((item) => {
        return {
            id: item.product.id,
            name: item.product.name,
            image: item.product.image,
            totalSell: item.totalQuantity,
            category: item.product.category.name,
            price: item.product.price,
            size: item.product.size,
            color: item.product.color
        }
    }, [])

    const chartData = {
        labels: months.map((month) => month.toString()),
        datasets: [
            {
                label: 'Doanh thu',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: months.map((month) => yearData[month] || 0),
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        dispatch(getProduct());
        dispatch(getAllUsers());
        dispatch(getAllOrders());
        getTop10Products();
        getTop5Customers();
    }, [dispatch]);

    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> $ Chưa có ní
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

                <div className='w-[80%] mx-auto my-16'>
                    <div className='flex justify-between items-center'>
                        <div className='w-[40px]'></div>
                        <h1 className='text-2xl font-semibold text-center mb-4'>REVENUE BY MONTH</h1>
                        <div>
                            <select className='cursor-pointer' value={selectedYear} onChange={handleYearChange}>
                                <option value={2022}>2022</option>
                                <option value={2023}>2023</option>
                                <option value={2024}>2024</option>

                            </select>
                        </div>
                    </div>
                    <Bar data={chartData} options={chartOptions} />
                </div>

                <div className='w-[80%] mx-auto my-16'>
                    <WeeklyRevenueBarChart />
                </div>

                <div>
                    <h1 className='text-2xl font-semibold text-center mb-4'>TOP 5 CUSTOMER:  </h1>
                    <Table columns={columns2} dataSource={data2} />
                </div>

                <div>
                    <h1 className='text-2xl font-semibold text-center mb-4'>TOP 5 EMPLOYEE: </h1>
                    <Table columns={columns2} dataSource={data2} />
                </div>

                <div>
                    <h1 className='text-2xl font-semibold text-center mb-4'>TOP 10 PRODUCT: </h1>
                    <Table columns={columns} dataSource={data3} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
