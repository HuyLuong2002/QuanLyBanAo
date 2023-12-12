import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";
import axios from "axios";
import SampleNextArrow from "../NewArrivals/SampleNextArrow";
import SamplePrevArrow from "../NewArrivals/SamplePrevArrow";
import Slider from "react-slick";

const BestSellers = () => {
  const [top10Product, setTop10Product] = useState([])
  let productsBestSeller = []

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
  const getTop10Products = async () => {
    const { data } = await axios.get("http://localhost:8081/api/v1/statistical/top10ProductBestSell");
    setTop10Product(data)
  }

  productsBestSeller = top10Product && top10Product.map((item) => {
    return item.product;
  }, [])

  console.log("productsBestSeller: ", productsBestSeller);

  useEffect(() => {
    getTop10Products()
  }, []);

  return (

    <div className="w-full pb-16">
      <Heading heading="Best sellers" />
      <Slider {...settings}>
        {
          productsBestSeller && productsBestSeller?.filter(item => item.deleted === false).map((item, idx) => {
            return (
              <div key={idx} className="px-2">
                <Product
                  Fzid={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  color={item.color}
                  badge={true}
                  description={item.description}
                  cate={item.category.name} />
              </div>
            )
          })
        }
      </Slider>
    </div>
  );
};

export default BestSellers;
