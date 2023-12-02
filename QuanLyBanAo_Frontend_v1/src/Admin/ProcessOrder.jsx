import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import SideBar from './Sidebar';
import { getOrderDetails, clearErrors, updateOrder } from '../actions/orderAction';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { Button } from '@material-ui/core';
import { UPDATE_ORDER_RESET } from '../constants/orderConstants';
// import './processOrder.css';
import { useParams } from 'react-router-dom';
import MetaData from '../components/layout/MetaData';
import Loader from '../components/Loader/Loader';

const ProcessOrder = () => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);
    const { id } = useParams();

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('status', status);

        dispatch(updateOrder(id, myForm));
    };

    console.log("order: ", order)

    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState('');

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
            alert.success('Order Updated Successfully');
            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError]);

    return (
        <Fragment>
            <MetaData title="Process Order" />
            <div className="dashboard">
                <SideBar />
                <div className="border-l">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div
                            className="flex justify-around px-4"
                        >
                            <div className='flex-1 p-16 pr-0'>
                                <p className='text-2xl font-semibold'>Order# {order.id} </p>
                                <p className='text-base font-light mb-8'>Place at: {order.orderDate}</p>
                                <div className="confirmshippingArea">
                                    <p className='text-2xl font-semibold'>Shipping Info</p>
                                    <div className="mt-4 ml-8 mb-8 flex flex-col gap-2">
                                        <div className='flex items-center gap-4 justify-between w-[60%]'>
                                            <p>Name:</p>
                                            <span>{order.user && order.user.firstName} {order.user && order.user.lastName}</span>
                                        </div>
                                        <div className='flex items-center gap-4 justify-between w-[60%]'>
                                            <p>Phone:</p>
                                            <span>{order?.user && order.user.tel}</span>
                                        </div>
                                        <div className='flex items-center gap-4 justify-between w-[60%]'>
                                            <p>Address:</p>
                                            <span>
                                                {order?.user && order.user.address}
                                            </span>
                                        </div>
                                    </div>

                                    <p className='text-2xl font-semibold'>Payment</p>
                                    <div className="mt-4 ml-8 mb-8 flex flex-col gap-2">
                                        <div className='flex gap-4 justify-between w-[60%]'>
                                            <p>Payment method: </p>
                                            <p
                                                className='text-green-500'
                                            >
                                                {order && order.paymentMethod}
                                            </p>
                                        </div>

                                        <div className='flex gap-4 justify-between w-[60%]'>
                                            <p>Payment status: </p>
                                            <p
                                                className={order.paymentStatus === 'UNPAID' ? 'text-red-500' : 'text-green-500'}
                                            >
                                                {order && order.paymentStatus}
                                            </p>
                                        </div>

                                        <div className='flex items-center gap-4 justify-between w-[60%]'>
                                            <p>Shipping fee:</p>
                                            <span>{order && order.shippingFee} $</span>
                                        </div>

                                        <div className='flex items-center gap-4 justify-between w-[60%]'>
                                            <p>Total Price:</p>
                                            <span>{order && order.totalPrice} $</span>
                                        </div>
                                    </div>

                                    <p className='text-2xl font-semibold'>Order Status</p>
                                    <div className="mt-4 ml-8 mb-8">
                                        <div>
                                            <p
                                                className={
                                                    order.shipStatus && order.shipStatus === 'SHIPPED'
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                }
                                            >
                                                {order && order.shipStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <p className='text-2xl font-semibold mb-4'>Your Cart Items:</p>
                                    <div className="flex flex-col gap-4">
                                        {order.orderDetails &&
                                            order.orderDetails.map((item) => (
                                                <div key={item.id} className='flex justify-around items-center'>
                                                    <img src={item.product.image} alt="Product" className='w-[120px]' />
                                                    <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>{' '}
                                                    <span>
                                                        {item.quantity} X ${item.product.price} ={' '}
                                                        <b>${item.unitPrice}</b>
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div
                                style={{
                                    display: order.shipStatus === 'SHIPPING' ? 'none' : 'block',
                                }}
                                className='w-[380px] mt-[15%] p-8 mr-20'
                            >
                                <form className="" onSubmit={updateOrderSubmitHandler}>
                                    <h1 className='text-center text-2xl mb-8'>Process Order</h1>

                                    <div className='relative flex items-center border-[2px] mb-4'>
                                        <AccountTreeIcon className='absolute top-[25%] left-[5%]'/>
                                        <select onChange={(e) => setStatus(e.target.value)} className='w-full p-3 pl-12'>
                                            <option value="">Choose status</option>
                                            {order.shipStatus === 'APPROVAL' && (
                                                <>
                                                    <option value="SHIPPING">SHIPPING</option>
                                                </>
                                            )}

                                            {order.shipStatus === 'SHIPPING' && (
                                                <option value="SHIPPING">SHIPPED</option>
                                            )}
                                        </select>
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={loading ? true : false || status === '' ? true : false}
                                    >
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;
