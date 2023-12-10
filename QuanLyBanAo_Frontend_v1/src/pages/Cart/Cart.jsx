import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import axios from "axios";
import { checkout, getCurrentUserCart, removeItemsFromCart, resetCart, updateItemCart } from "../../actions/cartAction";
import { useAlert } from "react-alert";
import Loader from "../../components/Loader/Loader";
import {
    paypal
} from "../../assets/images";
import { Button } from "antd";
import { ForwardOutlined } from "@ant-design/icons";

const Cart = () => {
    const dispatch = useDispatch();
    // const [totalAmt, setTotalAmt] = useState("");
    const [shippingCharge, setShippingCharge] = useState("");
    let { loading, totalItem, totalPrices, cartItems } = useSelector((state) => state.cart);
    const { error, isAuthenticated, user } = useSelector((state) => state.user);
    const alert = useAlert();
    const ref = useRef();
    const navigate = useNavigate();
    const [loadingPayment, setLoadingPayment] = useState(true)
    const [linkPayment, setLinkPayment] = useState("")
    const [loadings, setLoadings] = useState([]);

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 8000);
    };

    const paymentMethod = "CASH"

    const handleRemoveItem = (id) => {
        dispatch(removeItemsFromCart(id))
        dispatch(getCurrentUserCart());
        alert.success("Item removed successfully")
    }

    const handleUpdateItemCart = (id, quantity) => {
        if (quantity === 0) {
            alert.info("Quantity not less than 1")
            return;
        }
        dispatch(updateItemCart(id, quantity))
    }

    const handleCheckout = async () => {
        const notes = ref.current.value
        await dispatch(checkout(paymentMethod, notes))
        dispatch(getCurrentUserCart());
        alert.success("Checkout successfuly")
    }


    const handleCheckoutOnl = async () => {
        enterLoading(1)
        const notes = ref.current.value
        const paymentMethodBanking = "BANKING";
        const config = { headers: { 'Content-Type': 'application/json' } };
        setLoadingPayment(false)
        const {data} = await axios.post(`http://localhost:8081/api/v1/cart/pay`, { paymentMethod: paymentMethodBanking, notes }, config);
        window.location.href = data.approval_link
        alert.info("Process to checkout")
    }

    const handleResetCart = async () => {
        await dispatch(resetCart())
        await dispatch(getCurrentUserCart());
    }

    useEffect(() => {
        dispatch(getCurrentUserCart());
    }, [dispatch]);

    useEffect(() => {
        setShippingCharge(25);
    }, [totalPrices]);

    return (
        loading && setLoadingPayment ? <>
            <Loader />
        </> :
            <div className="max-w-container mx-auto px-4">
                <Breadcrumbs title="Cart" />
                {cartItems?.length > 0 ? (
                    <div className="pb-20">
                        <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
                            <h2 className="col-span-2">Product</h2>
                            <h2>Price</h2>
                            <h2>Quantity</h2>
                            <h2>Sub Total</h2>
                        </div>
                        <div className="mt-5">
                            {cartItems?.map((item) => (
                                <div key={item.id}>
                                    <ItemCard item={item} handleRemoveItem={handleRemoveItem} handleUpdateItemCart={handleUpdateItemCart} />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => handleResetCart()}
                            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
                        >
                            Reset cart
                        </button>

                        <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
                            <div className="flex items-center gap-4">
                                <input
                                    className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                                    type="text"
                                    placeholder="notes..."
                                    ref={ref}
                                />
                                <p className="text-sm mdl:text-base font-semibold" >
                                    Write your notes...
                                </p>
                            </div>
                            <p className="text-lg font-semibold">Update Cart</p>
                        </div>
                        <div className="max-w-7xl gap-4 flex justify-end mt-4">
                            <div className="w-96 flex flex-col gap-4">
                                <h1 className="text-2xl font-semibold text-right">Cart totals</h1>
                                <div>
                                    <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                                        Subtotal
                                        <span className="font-semibold tracking-wide font-titleFont">
                                            ${totalPrices}
                                        </span>
                                    </p>
                                    <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                                        Shipping Charge
                                        <span className="font-semibold tracking-wide font-titleFont">
                                            ${shippingCharge}
                                        </span>
                                    </p>
                                    <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                                        Total
                                        <span className="font-bold tracking-wide text-lg font-titleFont">
                                            ${totalPrices + shippingCharge}
                                        </span>
                                    </p>
                                </div>
                                <div className="flex flex-col justify-end items-center gap-4">
                                    <Link to="#" onClick={handleCheckout}>
                                        <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                                            Check out by Cash
                                        </button>

                                    </Link>
                                    <span>Or</span>
                                    <div className="flex items-center gap-2 border rounded-lg px-[18px]">
                                        <button>
                                            <img src={paypal} alt="paypal" className="w-32"/>
                                        </button>
                                        <Button
                                            type="primary"
                                            icon={<ForwardOutlined />}
                                            loading={loadings[1]}
                                            onClick={() => handleCheckoutOnl()}
                                        ></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
                    >
                        <div>
                            <img
                                className="w-80 rounded-lg p-4 mx-auto"
                                src={emptyCart}
                                alt="emptyCart"
                            />
                        </div>
                        <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
                            <h1 className="font-titleFont text-xl font-bold uppercase">
                                Your Cart feels lonely.
                            </h1>
                            <p className="text-sm text-center px-10 -mt-2">
                                Your Shopping cart lives to serve. Give it purpose - fill it with
                                books, electronics, videos, etc. and make it happy.
                            </p>
                            <Link to="/shop">
                                <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
    );
};

export default Cart;
