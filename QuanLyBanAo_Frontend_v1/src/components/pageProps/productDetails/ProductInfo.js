import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { addItemsToCart } from "../../../actions/cartAction";
import { useAlert } from "react-alert";

const ProductInfo = ({ productInfo, id }) => {
  const alert = useAlert()
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addItemsToCart(id,1)
    )
    alert.success("Item added successfully")
  }
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-4xl font-semibold">{productInfo.name}</h2>
      <p className="text-xl font-semibold">${productInfo.price}</p>
      <p className="text-base text-gray-600">{productInfo.description}</p>
      <p className="text-sm">Be the first to leave a review.</p>
      <p className="font-medium text-lg">
        <span className="font-normal">Colors:</span> {productInfo.color}
      </p>
      <button
        onClick={() =>
          handleAddToCart()
        }
        className="w-full py-4 bg-primeColor hover:bg-black duration-300 text-white text-lg font-titleFont"
      >
        Add to Cart
      </button>
      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Categories:</span> {productInfo.cate}
      </p>
    </div>
  );
};

export default ProductInfo;
