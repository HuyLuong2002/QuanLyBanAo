import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getAdminProduct, deleteProduct, getProduct } from '../actions/productAction';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../constants/productConstants';
import { useNavigate } from 'react-router-dom';
import MetaData from '../components/layout/MetaData';
import './productList.css';


const ProductList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const alert = useAlert();

    const { error, products } = useSelector((state) => state.products);

    const { error: deleteError, isDeleted } = useSelector((state) => state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
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
            alert.success('Product Deleted Successfully');
            navigate('/admin/dashboard');
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
        },
        {
            field: 'deleted',
            headerName: 'Deleted',
            minWidth: 185,
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

                        <Button onClick={() => deleteProductHandler(params.getValue(params.id, 'id'))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    console.log("products: ", products);

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
