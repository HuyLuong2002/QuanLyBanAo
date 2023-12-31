import React, { useEffect } from 'react'
import { newArrOne } from "../../assets/images/index";
import OrderDetailItem from './OrderDetailItem';
import { useSelector } from 'react-redux';

const OrderDetail = ({ item, note }) => {
    let orderStatus = "33.33%"
    const { user } = useSelector((state) => state.user)

    return (
        <>
            <div className=''>
                {
                    item.orderDetails.map((itemChild) => {
                        return <OrderDetailItem itemChild={itemChild} note={note} />
                    })
                }

                {/* progress bar */}
                <div className='bg-[#fff] border border-solid p-8 rounded-md'>
                    <p className='py-4 font-semibold'>Preparing to ship on {item.orderDate}</p>

                    {
                        item.shipStatus === 'CANCELED' ? <>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-red-500 h-2.5 rounded-full w-full"></div>
                            </div>
                            <p className='text-red-500 text-xl font-bold text-center'>CANCELED</p>
                        </> : <>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: item.shipStatus === "SHIPPING" ? "66.67%" : item.shipStatus === "SHIPPED" ? "100%" : "33.33%" }}></div>
                            </div>
                            <div className="flex justify-around mt-2">
                                <span className="text-xl font-bold text-blue-700 dark:text-white">APPROVAL</span>
                                <span className="text-xl font-bold dark:text-white text-yellow-500">SHIPPING</span>
                                <span className="text-xl font-bold dark:text-white text-green-500">SHIPPED</span>
                            </div>
                        </>
                    }

                </div>
            </div>

            {/* billing info */}
            <div className='bg-[#f3f4f6] flex justify-between p-4 mb-12 rounded-md'>
                <div className='flex flex-col gap-2'>
                    <p className='font-medium '>Delivery address</p>
                    <p className='text-[#6B7280] mb-4'>{user.address}</p>
                    <p className='font-medium'>Notes</p>
                    <p className='text-[#6B7280]'>{note}</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className='font-medium'>Shipping updates</p>
                    <p className='text-[#6B7280]'>{user.email}</p>
                    <p className='text-[#6B7280]'>{user.tel}</p>
                </div>

                <div>
                    <p className='font-medium mb-4'>Payment information</p>
                    <p className='text-[#6B7280]'>{item.paymentMethod}</p>
                </div>

                <div className='text-[#6B7280] flex flex-col gap-4 w-96'>
                    <div className='flex justify-between border-b-2'>
                        <span>Subtotal</span>
                        <span className='text-black'>${item.totalPrice - item.shippingFee}</span>
                    </div>

                    <div className='flex justify-between border-b-2'>
                        <span>Shipping</span>
                        <span className='text-black'>${item.shippingFee}</span>
                    </div>

                    <div className='flex justify-between'>
                        <span className='font-semibold text-black'>Order total</span>
                        <span className='text-blue-600'>${item.totalPrice}</span>
                    </div>
                </div>
            </div>

        </>


    )
}

export default OrderDetail