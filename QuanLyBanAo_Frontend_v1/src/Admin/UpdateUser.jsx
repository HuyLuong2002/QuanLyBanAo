import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PersonIcon from '@material-ui/icons/Person';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import SideBar from './Sidebar';
import { UPDATE_USER_RESET } from '../constants/userConstants';
import { getUserDetails, updateUser, clearErrors } from '../actions/userAction';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../components/layout/MetaData';
import Loader from '../components/Loader/Loader';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import WcIcon from '@material-ui/icons/Wc';
import BusinessIcon from '@material-ui/icons/Business';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import CancelIcon from '@material-ui/icons/Cancel';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();

    const { loading, error, user } = useSelector((state) => state.userDetails);

    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [sex, setSex] = useState('');
    const [dateOfBirth, setdateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [tel, setTel] = useState('');
    const [status, setStatus] = useState('');


    const userId = id;

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        let roles = [
            {
                id: 2,
                name: "CUSTOMER"
            }
        ]


        if(role.toUpperCase() === "EMPLOYEE") {
            roles[0].id = 3
            roles[0].name = role
        }

        if(role.toUpperCase() === "ADMIN") {
            roles[0].id = 1
            roles[0].name = role
        }


        const data = {
            lastName: lastName ? lastName : user.lastName,
            firstName: firstName ? firstName : user.firstName,
            sex: sex ? sex : user.sex,
            dateOfBirth: dateOfBirth ? dateOfBirth : user.dateOfBirth,
            address: address ? address : user.address,
            tel: tel ? tel : user.tel,
            status: status ? status : user.status,
            roles: roles
        }

        dispatch(updateUser(userId, data));
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('User Updated Successfully');
            navigate('/admin/users');
            dispatch({ type: UPDATE_USER_RESET });
        }

        dispatch(getUserDetails(userId));
    }, [dispatch, alert, error, navigate, isUpdated, updateError, userId]);

    return (
        <Fragment>
            <MetaData title="Update User" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <form className="createProductForm" onSubmit={updateUserSubmitHandler}>
                            <h1>Update User</h1>

                            <div>
                                <FormatColorTextIcon />
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    disabled
                                    required
                                    value={user.firstName}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <FormatColorTextIcon />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    required
                                    disabled
                                    value={user.lastName}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    disabled
                                    value={user.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <DateRangeIcon />
                                <input
                                    type="date"
                                    placeholder="Date"
                                    disabled
                                    required
                                    value={user.dateOfBirth}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <WcIcon />
                                <select disabled value={role} onChange={(e) => setRole(e.target.value)}>
                                    {
                                        user.sex === "MALE" ? (
                                            <>
                                                <option value="MALE">MALE</option>
                                                <option value="FEMALE">FEMALE</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="FEMALE">FEMALE</option>
                                                <option value="MALE">MALE</option>
                                            </>
                                        )
                                    }
                                </select>
                            </div>

                            <div>
                                <BusinessIcon />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    required
                                    disabled
                                    value={user.address}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <LocalPhoneIcon />
                                <input
                                    type="number"
                                    placeholder="Telephone"
                                    required
                                    disabled
                                    value={user.tel}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <CancelIcon />
                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    {
                                        user.status === "ACTIVE" ? (
                                            <>
                                                <option value="ACTIVE">ACTIVE</option>
                                                <option value="INACTIVE">INACTIVE</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="INACTIVE">INACTIVE</option>
                                                <option value="ACTIVE">ACTIVE</option>
                                            </>
                                        )
                                    }
                                </select>
                            </div>

                            <div>
                                <VerifiedUserIcon />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    {
                                        user && user?.roles?.name === "EMPLOYEE" ? (
                                            <>
                                                <option value="EMPLOYEE">EMPLOYEE</option>
                                                <option value="CUSTOMER">CUSTOMER</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </>
                                        ) : user?.roles?.name === "ADMIN" ? (
                                            <>
                                                <option value="ADMIN">ADMIN</option>
                                                <option value="EMPLOYEE">EMPLOYEE</option>
                                                <option value="CUSTOMER">CUSTOMER</option>
                                            </>
                                        ) : (
                                            <>
                                                <option value="CUSTOMER">CUSTOMER</option>
                                                <option value="ADMIN">ADMIN</option>
                                                <option value="EMPLOYEE">EMPLOYEE</option>
                                            </>
                                        )
                                    }
                                </select>
                            </div>

                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={updateLoading ? true : false || role === '' ? true : false}
                            >
                                Update
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUser;
