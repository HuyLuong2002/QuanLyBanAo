import React, { useEffect } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
    newArrOne,
    newArrTwo,
    newArrThree,
    newArrFour,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../actions/productAction";

const NewArrivals = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    // useEffect to get products
    useEffect(() => {
        if (error) return alert.error(error);
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <div className="w-full pb-16">
            <Heading heading="New Arrivals" />
            <Slider {...settings}>
                {
                    products && products?.filter(item => item.deleted === false).map((item, index) => {
                        return (
                            <div className="px-2" key={index}>
                                <Product
                                    id={item.id}
                                    image={item.image}
                                    name={item.name}
                                    price={item.price}
                                    color={item.color}
                                    badge={true}
                                    description={item.description}
                                    cate={item.category.name}
                                />
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    );
};

export default NewArrivals;
