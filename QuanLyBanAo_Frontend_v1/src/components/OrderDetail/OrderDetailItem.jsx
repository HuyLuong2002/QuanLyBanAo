import React from 'react'
import { useSelector } from 'react-redux';

const OrderDetailItem = ({ itemChild }) => {
    console.log("itemChild: ", itemChild);
    const {user} = useSelector((state) => state.user)
    return (
        <div className='bg-[#fff] border border-solid flex justify-between gap-8 p-8 rounded-md' key={itemChild.id}>
            <div className='flex gap-4'>
                <img className='w-40 rounded-md' src={itemChild.product.image} alt="" />

                <div className='w-[480px] flex flex-col gap-2'>
                    <p className='font-medium'>{itemChild.product.name} &nbsp; &#x0028;X&nbsp;{itemChild.quantity}&#x0029;</p>
                    <p className='text-[#6B7280]'>${itemChild.product.price}</p>
                    <p className='text-[#6B7280]'>{itemChild.product.description}</p>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <p className='font-medium'>Delivery address</p>
                <p className='text-[#6B7280]'>{user.address}</p>
            </div>

            <div className='flex flex-col gap-2'>
                <p className='font-medium'>Shipping updates</p>
                <p className='text-[#6B7280]'>{user.email}</p>
                <p className='text-[#6B7280]'>{user.tel}</p>
                <a className='text-blue-500' href="/">Edit</a>
            </div>
        </div>
    )
}

export default OrderDetailItem