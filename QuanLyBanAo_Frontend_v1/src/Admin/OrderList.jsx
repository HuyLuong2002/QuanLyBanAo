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

const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, orders } = useSelector((state) => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
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
            alert.success('Order Deleted Successfully');
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
            cellClassName: (params) => {
                return params.getValue(params.id, 'status') === 'Delivered' ? 'greenColor' : 'redColor';
            },
        },
        {
            field: 'itemsQty',
            headerName: 'Quantity',
            minWidth: 150,
        },
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            minWidth: 190,
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
            minWidth: 250,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='flex'>
                        <Link to={`/admin/order/${params.getValue(params.id, 'id')}`}>
                            <EditIcon />
                        </Link>

                        <Button className='' onClick={() => deleteOrderHandler(params.getValue(params.id, 'id'))}>
                            <DeleteIcon />
                        </Button>

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
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL ORDERS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
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
