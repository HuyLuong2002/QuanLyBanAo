import React from 'react'
import OrderDetail from '../../components/OrderDetail/OrderDetail'

const Order = () => {
  return (
    <div className='bg-[#f9fafb] px-24 py-8'>
        <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center gap-4'>
                <p className='text-2xl font-semibold'>Order #54879</p>
                <a className='text-blue-500' href="/">View invoice →</a>
            </div>

            <p>Order placed <span className='font-medium'>March 22, 2021</span></p>
        </div>

        {/* order detail */}
        <OrderDetail />
        <OrderDetail />
        
        {/* billing info */}
        <div className='bg-[#f3f4f6] flex justify-between p-8 rounded-md'>
          <div>
            <p className='font-medium mb-4'>Billing address</p>
            <p className='text-[#6B7280]'>Floyd Miles</p>
            <p className='text-[#6B7280]'>7363 Cynthia Pass</p>
            <p className='text-[#6B7280]'>Toronto, ON N3Y 4H8</p>
          </div>

          <div>
            <p className='font-medium mb-4'>Payment information</p>
            <p className='text-[#6B7280]'>CASH</p>
          </div>

          <div className='text-[#6B7280] flex flex-col gap-4 w-96'>
            <div className='flex justify-between border-b-2'>
              <span>Subtotal</span>
              <span className='text-black'>$72</span>
            </div>

            <div className='flex justify-between border-b-2'>
              <span>Shipping</span>
              <span className='text-black'>$5</span>
            </div>

            <div className='flex justify-between border-b-2'>
              <span>Tax</span>
              <span className='text-black'>$6.16</span>
            </div>

            <div className='flex justify-between'>
              <span className='font-semibold text-black'>Order total</span>
              <span className='text-blue-600'>$83.16</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Order