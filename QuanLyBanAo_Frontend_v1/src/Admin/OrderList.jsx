import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './productList.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
// import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdfIcon';
import SideBar from './Sidebar';
import { deleteOrder, getAllOrders, clearErrors } from '../actions/orderAction';
import { DELETE_ORDER_RESET } from '../constants/orderConstants';
import { useNavigate } from 'react-router-dom';
import MetaData from '../components/layout/MetaData';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import ExplicitIcon from '@material-ui/icons/Explicit';
import { Popconfirm } from 'antd';
import ReplayIcon from '@material-ui/icons/Replay';
import { QuestionCircleOutlined } from '@ant-design/icons';

const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, orders } = useSelector((state) => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id, flag, status) => {
        dispatch(deleteOrder(id));
        if(flag) {
            alert.success('Product Restored Successfully');
            return
        }
        if(status === 'SHIPPED') {
            return;
        }

        if(status === 'SHIPPING') {
            return;
        }
        alert.success('Product Deleted Successfully');
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            // alert.success('Order Deleted Successfully');
            navigate('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET });
        }

        dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

    const columns = [
        { field: 'id', headerName: 'Order ID', minWidth: 150 },

        {
            field: 'status',
            headerName: 'Status',
            minWidth: 150,
            renderCell: (params) => {
                return (
                    <span className={params.value === "SHIPPED" ? 'bg-green-200 rounded-xl text-sm w-24 p-2 text-center font-semibold' : params.value === "APPROVAL" ? 'bg-blue-200 rounded-xl text-sm w-24 p-2 text-center font-semibold' : params.value === "CANCELED" ? 'bg-red-300 rounded-xl text-sm w-24 p-2 text-center font-semibold' : 'bg-yellow-200 rounded-xl text-sm w-24 p-2 text-center font-semibold'}>{params.value}</span>
                )
            },
        },
        {
            field: 'itemsQty',
            headerName: 'Quantity',
            minWidth: 150,
            align: 'center',
        },
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            minWidth: 190,
            renderCell: (params) => {
                return (
                    <span className={params.value === "CASH" ? ' rounded-xl text-sm w-24 p-2 text-center font-semibold text-orange-500' : 'bg-blue-300 rounded-xl text-sm w-24 p-2 text-center font-semibold'}>{params.value}</span>
                )
            },
        },
        {
            field: 'amount',
            headerName: 'Total Price',
            minWidth: 150,
        },
        {
            field: 'orderDate',
            headerName: 'Place at',
            minWidth: 230,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 230,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='flex'>
                        <Link to={`/admin/order/${params.getValue(params.id, 'id')}`}>
                            <EditIcon />
                        </Link>

                        {/* <Button className='' onClick={() => deleteOrderHandler(params.getValue(params.id, 'id'))}>
                            <DeleteIcon />
                        </Button> */}
                        {
                            params.getValue(params.id, 'orderStatus') === "INACTIVE" ? (
                                <Button onClick={() => deleteOrderHandler(params.getValue(params.id, 'id'), 1)}>
                                    <ReplayIcon />
                                </Button>
                            ) : (
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this order?"
                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                    placement='bottomLeft'
                                    onConfirm={() => deleteOrderHandler(params.getValue(params.id, 'id'), 0, params.getValue(params.id, 'status'))}
                                >
                                    <Button danger><DeleteIcon /></Button>
                                </Popconfirm>
                            )
                        }

                        <Button onClick={() => deleteOrderHandler(params.getValue(params.id, 'id'))}>
                            <PictureAsPdfIcon />
                        </Button>

                        <Button onClick={() => deleteOrderHandler(params.getValue(params.id, 'id'))}>
                            <ExplicitIcon />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const rows = [];

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item.id,
                itemsQty: item.totalQuantity,
                amount: item.totalPrice,
                status: item.shipStatus,
                orderDate: item.orderDate,
                paymentMethod: item.paymentMethod,
                orderStatus: item.orderStatus,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="w-full bg-white border-l border-[#00000028] flex flex-col h-screen">
                    <h1 id="productListHeading">ALL ORDERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default OrderList;
