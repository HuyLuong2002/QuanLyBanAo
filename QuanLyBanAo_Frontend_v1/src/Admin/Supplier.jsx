import React, {Fragment, useEffect} from 'react'
import {useAlert} from 'react-alert';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {getSuppliers} from '../actions/productAction';
import {clearErrors} from '../actions/userAction';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MetaData from '../components/layout/MetaData';
import Sidebar from './Sidebar';
import {DataGrid} from '@material-ui/data-grid';
import './productList.css';
import {deleteSupplier} from "../actions/supplierAction";
import {DELETE_SUPPLIER_RESET} from "../constants/supplierConstant";
import ReplayIcon from "@material-ui/icons/Replay";
import {Popconfirm} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";

const Supplier = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const alert = useAlert();

    const {error, suplliers} = useSelector((state) => state.suppliers);

    const {error: deleteError, isDeleted} = useSelector((state) => state.supplier);

    const deleteSupplierHandler = (id, flag) => {
        dispatch(deleteSupplier(id));
        if(flag) {
            alert.success('Supplier Restored Successfully');
            return
        }
        alert.success('Supplier Deleted Successfully');
    };

    console.log("isDeleted: ", isDeleted);

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
            // alert.success('Supplier Deleted Successfully');
            navigate('/admin/suppliers');
            dispatch({type: DELETE_SUPPLIER_RESET});
        }

        dispatch(getSuppliers());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

    const columns = [
        {field: 'id', headerName: 'ID', minWidth: 50},

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
                        <Link to={`/admin/supplier/${params.getValue(params.id, 'id')}`}>
                            <EditIcon/>
                        </Link>

                        {/* <Button onClick={() => deleteSupplierHandler(params.getValue(params.id, 'id'))}>
                            <DeleteIcon/>
                        </Button> */}

                        {
                            params.getValue(params.id, 'deleted') ? (
                                <Button onClick={() => deleteSupplierHandler(params.getValue(params.id, 'id'), 1)}>
                                    <ReplayIcon />
                                </Button>
                            ) : (
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this supplier?"
                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                    placement='bottomLeft'
                                    onConfirm={() => deleteSupplierHandler(params.getValue(params.id, 'id'))}
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

    console.log("suplliers: ", suplliers);

    suplliers &&
    suplliers.forEach((item) => {
        rows.push({
            id: item.id,
            name: item.name,
            deleted: item.deleted,
        });
    });

    return (
        <Fragment>
            <MetaData title={`ALL SUPPLIERS - Admin`}/>

            <div className="dashboard">
                <Sidebar/>
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL SUPPLIERS</h1>

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

export default Supplier