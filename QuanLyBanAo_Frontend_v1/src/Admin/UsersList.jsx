import React, { Fragment, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './productList.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from './Sidebar';
import { getAllUsers, clearErrors, deleteUser } from '../actions/userAction';
import { DELETE_USER_RESET } from '../constants/userConstants';
import MetaData from '../components/layout/MetaData';
import { CheckCircleOutline } from '@material-ui/icons';
import ReplayIcon from '@material-ui/icons/Replay';
import { CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';

const UsersList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, users } = useSelector((state) => state.allUsers);

    const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile);

    const deleteUserHandler = (id, flag) => {
        dispatch(deleteUser(id));
        if(flag) {
            alert.success('User Restored Successfully');
            return
        }
        alert.success('User Deleted Successfully');
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
            // alert.success(message);
            navigate('/admin/users');
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 50 },

        {
            field: 'email',
            headerName: 'Email',
            minWidth: 270,

        },
        {
            field: 'firstName',
            headerName: 'First Name',
            minWidth: 150,
        },
        {
            field: 'name',
            headerName: 'Last Name',
            minWidth: 150,
        },
        {
            field: 'sex',
            headerName: 'Gender',
            minWidth: 150,
        },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 150,
            renderCell: (params) => {
                return (
                    <span className={params.value === "ADMIN" ? 'bg-green-200 rounded-xl text-sm w-24 p-2 text-center' : params.value === "EMPLOYEE" ? 'bg-blue-200 rounded-xl text-sm w-24 p-2 text-center' : 'bg-yellow-200 rounded-xl text-sm w-24 p-2 text-center'}>{params.value}</span>
                )
            },
        },
        {
            field: 'deleted',
            headerName: 'Deleted',
            minWidth: 130,
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
            minWidth: 150,
            type: 'boolean',
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/user/${params.getValue(params.id, 'id')}`}>
                            <EditIcon />
                        </Link>

                        {
                            params.getValue(params.id, 'deleted') ? (
                                <Button onClick={() => deleteUserHandler(params.getValue(params.id, 'id'), 1)}>
                                    <ReplayIcon />
                                </Button>
                            ) : (
                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this user?"
                                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                    placement='bottomLeft'
                                    onConfirm={() => deleteUserHandler(params.getValue(params.id, 'id'))}
                                >
                                    <Button danger disabled={params.getValue(params.id, 'role') === "ADMIN"}><DeleteIcon /></Button>
                                </Popconfirm>
                            )
                        }
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    users &&
        users.forEach((item) => {
            rows.push({
                id: item.id,
                role: item && item.roles && item.roles[0].name,
                email: item.email,
                firstName: item.firstName,
                name: item.lastName,
                sex: item.sex,
                deleted: item.deleted,
            });
        });

    return (
        <Fragment>
            <MetaData title={`ALL USERS - Admin`} />

            <div className="dashboard">
                <SideBar />
                <div className="w-full bg-white border-l border-[#00000028] flex flex-col h-screen" >
                    <h1 id="productListHeading">ALL USERS</h1>

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

export default UsersList;
