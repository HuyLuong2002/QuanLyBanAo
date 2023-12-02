import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, getCategories } from '../actions/productAction';
import { clearErrors } from '../actions/userAction';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MetaData from '../components/layout/MetaData';
import Sidebar from './Sidebar';
import { DataGrid } from '@material-ui/data-grid';
import './productList.css';

const Categories = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const alert = useAlert();

    const { error, categories } = useSelector((state) => state.categories);


    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getCategories());
    }, [dispatch, alert, error]);

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 50 },

        {
            field: 'name',
            headerName: 'Name',
            minWidth: 250,
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

    console.log("categories: ", categories);

    categories &&
    categories.forEach((item) => {
            rows.push({
                id: item.id,
                name: item.name,
                deleted: item.deleted,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL CATEGORIES - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL CATEGORIES</h1>

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
}

export default Categories