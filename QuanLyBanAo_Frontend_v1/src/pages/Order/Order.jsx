import React, { useEffect } from 'react'
import OrderDetail from '../../components/OrderDetail/OrderDetail'
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../../actions/orderAction';

const Order = () => {
  const { orders } = useSelector((state) => state.myOrders);
  const dispatch = useDispatch()

  console.log("orders: ", orders);

  useEffect(() => {
    dispatch(myOrders())
  }, [dispatch])

  return (
    <div className='bg-[#f9fafb] px-24 py-8'>
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center gap-4'>
          <p className='text-2xl font-semibold'>Order List</p>
          <a className='text-blue-500' href="/">View invoice →</a>
        </div>

        <p>Order placed <span className='font-medium'>March 22, 2021</span></p>
      </div>

      {/* order detail */}
      {
        orders && orders.map((item, index) => {
          return (
            <div key={index}>
              <p className='text-xl font-medium'>Order {item.id}</p>
              <OrderDetail item={item} note={item.notes}/>
            </div>
          )
        })
      }
    </div>
  )
}

export default Order