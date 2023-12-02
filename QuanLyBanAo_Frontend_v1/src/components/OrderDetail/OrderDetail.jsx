import React, { useEffect } from 'react'
import { newArrOne } from "../../assets/images/index";
import OrderDetailItem from './OrderDetailItem';
import { useSelector } from 'react-redux';

const OrderDetail = ({ item }) => {
    let orderStatus = "33.33%"
    const {user} = useSelector((state) => state.user)

    return (
        <>
            <div className=''>
                {
                    item.orderDetails.map((itemChild) => {
                        return <OrderDetailItem itemChild={itemChild} />
                    })
                }

                {/* progress bar */}
                <div className='bg-[#fff] border border-solid p-8 rounded-md'>
                    <p className='py-4 font-semibold'>Preparing to ship on {item.orderDate}</p>

                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: item.shipStatus === "SHIPPING" ? "66.67%" : item.shipStatus === "SHIPPED" ? "100%" : "33.33%" }}></div>
                    </div>
                    <div className="flex justify-around mt-2">
                        <span className="text-base font-medium text-blue-700 dark:text-white">APPROVAL</span>
                        <span className="text-sm font-medium dark:text-white text-yellow-500">SHIPPING</span>
                        <span className="text-base font-medium dark:text-white">SHIPPED</span>
                    </div>
                </div>
            </div>

            {/* billing info */}
            <div className='bg-[#f3f4f6] flex justify-between p-4 mb-12 rounded-md'>
                <div>
                    <p className='font-medium mb-4'>Billing address</p>
                    <p className='text-[#6B7280]'>{user.address}</p>
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