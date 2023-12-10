import React from 'react'
import { useSelector } from 'react-redux';

const OrderDetailItem = ({ itemChild, note }) => {
    console.log("itemChild: ", itemChild);
    const { user } = useSelector((state) => state.user)
    return (
        <div className='bg-[#fff] border border-solid flex justify-between gap-8 p-8 rounded-md' key={itemChild.id}>
            <div className='flex gap-4 justify-between w-full'>
                <img className='w-32 rounded-md' src={itemChild.product.image} alt="" />

                <div className='flex flex-1 w-full items-center justify-between gap-2'>
                    <div className='w-[480px]'>
                        <p className='font-bold'>Name: {itemChild.product.name}</p>
                        {/* <p className='font-bold'>Description:</p> */}
                        <p className='text-[#6B7280]'>{itemChild.product.description}</p>
                    </div>
                </div>

                <div className='w-[50%] flex justify-around items-center'>
                    <div className='flex flex-col'>
                        <p className='font-bold'>Quantity:</p>
                        <p className='font-medium text-center text-[#6B7280]'>{itemChild.quantity}</p>
                    </div>
                    <div className='flex flex-col'>
                        <p className='font-bold'>Price:</p>
                        <p className='text-[#6B7280] text-center'>${itemChild.product.price}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetailItem