import React from 'react'
import { newArrOne } from "../../assets/images/index";

const OrderDetail = () => {
  return (
    <div className='mb-8'>
        <div className='bg-[#fff] border border-solid flex gap-8 p-8 rounded-md'>
            <div className='flex gap-4'>
                <img className='w-40 rounded-md' src={newArrOne} alt="" />

                <div className='w-[480px] flex flex-col gap-2'>
                    <p className='font-medium'>Nomad Tumbler</p>
                    <p className='text-[#6B7280]'>$35.00</p>
                    <p className='text-[#6B7280]'>This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.</p>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <p className='font-medium'>Delivery address</p>
                <p className='text-[#6B7280]'>Floyd Miles
                    7363 Cynthia Pass
                    Toronto, ON N3Y 4H8
                </p>
            </div>

            <div className='flex flex-col gap-2'>
                <p className='font-medium'>Shipping updates</p>
                <p className='text-[#6B7280]'>f•••@example.com</p>
                <p className='text-[#6B7280]'>1•••••••••40</p>
                <a className='text-blue-500'  href="/">Edit</a>
            </div>
        </div>

        {/* progress bar */}
        <div className='bg-[#fff] border border-solid p-8 rounded-md'>
            <p className='py-4 font-semibold'>Preparing to ship on March 24, 2021</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
            </div>
            <div className="flex justify-around mt-2">
                <span className="text-base font-medium text-blue-700 dark:text-white">Order placed</span>
                <span className="text-sm font-medium dark:text-white">Processing</span>
                <span className="text-base font-medium dark:text-white">Shipped</span>
                <span className="text-sm font-medium dark:text-white">Delivered</span>
            </div>
        </div>
    </div>
  )
}

export default OrderDetail