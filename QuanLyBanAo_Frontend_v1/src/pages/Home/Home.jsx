import React, { useState } from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
// import Sale from "../../components/home/Sale/Sale";
import SpecialOffers from "../../components/home/SpecialOffers/SpecialOffers";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { getProduct } from "../../actions/productAction";
import { getAllUsers, loadUser } from "../../actions/userAction";
import axios from "axios";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    const { users } = useSelector((state) => state.allUsers);

    useEffect(() => {
        if (error) return alert.error(error);
        dispatch(getProduct());
        dispatch(getAllUsers());
    }, [dispatch, error, alert]);

    return (
        <div className="w-full mx-auto">
            <Banner />
            <BannerBottom />
            <div className="max-w-container mx-auto px-4">
                {/* <Sale /> */}
                <NewArrivals />
                <BestSellers />
                <YearProduct />
                {/* <SpecialOffers /> */}
            </div>
        </div>
    );
};

export default Home;
