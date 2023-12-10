import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";

const ProductDetails = () => {
  const location = useLocation();
  const {_id} = useParams();
  const dispatch = useDispatch();
  const [prevLocation, setPrevLocation] = useState("");
  const [productInfo, setProductInfo] = useState([]);
  const { error, product, related } = useSelector((state) => state.productDetails);

  console.log("Product1: ", related);

  useEffect(() => {
    setProductInfo(location.state.item);
    setPrevLocation(location.pathname);
    dispatch(getProductDetails(_id))
  }, [dispatch, location, productInfo, _id]);

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4">
        <div className="xl:-mt-10 -mt-7">
          <Breadcrumbs title="" prevLocation={prevLocation} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full">
            <ProductsOnSale related={related ? related : []}/>
          </div>
          <div className="h-full xl:col-span-2">
            <img
              className="w-full h-full object-cover"
              src={productInfo.image}
              alt={productInfo.image}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} id={_id}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
