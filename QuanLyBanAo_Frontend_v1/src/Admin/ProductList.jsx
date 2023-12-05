import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAdminProduct, deleteProduct, getProduct } from '../actions/productAction';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Box, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../constants/productConstants';
import { useNavigate } from 'react-router-dom';
import MetaData from '../components/layout/MetaData';
import ReplayIcon from '@material-ui/icons/Replay';
import './productList.css';
import { CheckCircleOutline } from '@material-ui/icons';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';


const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const alert = useAlert();

    const { error, products } = useSelector((state) => state.products);

    const { error: deleteError, isDeleted } = useSelector((state) => state.product);

    const deleteProductHandler = (id, flag) => {
        dispatch(deleteProduct(id));
        if(flag) {
            alert.success('Product Restored Successfully');
            return
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
            // alert.success('Product Deleted Successfully');
            navigate('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET });
        }

        dispatch(getProduct());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 50 },

        {
            field: 'name',
            headerName: 'Name',
            minWidth: 250,
        },
        {
            field: 'price',
            headerName: 'Price',
            // type: 'number',
            minWidth: 185,
        },
        {
            field: 'size',
            headerName: 'Size',
            minWidth: 185,
        },
        {
            field: 'color',
            headerName: 'Color',
            minWidth: 185,
            renderCell: (params) => {
                return (
                    <span className={params.value === "GREEN" ? 'bg-green-300 rounded-xl text-sm w-20 p-2 text-center' : params.value === "BLUE" ? 'bg-blue-500 rounded-xl text-sm w-20 p-2 text-center' : params.value === "RED" ? 'bg-red-500 rounded-xl text-sm w-20 p-2 text-center' : 'bg-yellow-200 rounded-xl text-sm w-20 p-2 text-center'}>{params.value}</span>
                )
            },
        },
        {
            field: 'deleted',
            headerName: 'Deleted',
            minWidth: 185,
            type: 'boolean',
            renderCell: (params) => {
                return !params.value ? (
                    <CheckCircleOutline
                        style={{
                            color: "green",
                        }}
                    />
                ) : (
                    <CloseCircleOutlined
                        style={{
                            color: "red",
                            fontSize: "22px"
                        }}
                    />
                );
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 185,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
                            <EditIcon />
                        </Link>

                        {
                            params.getValue(params.id, 'deleted') ? (
                                <Button onClick={() => deleteProductHandler(params.getValue(params.id, 'id'), 1)}>
                                    <ReplayIcon />
                                </Button>
                            ) : (
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                    placement='bottomLeft'
                                    onConfirm={() => deleteProductHandler(params.getValue(params.id, 'id'))}
                                >
                                    <Button danger><DeleteIcon /></Button>
                                </Popconfirm>
                            )
                        }
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item.id,
                name: item.name,
                price: item.price,
                size: item.size,
                color: item.color,
                deleted: item.deleted,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL PRODUCTS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
