import React from "react";
import { SplOfferData } from "../../../constants";
import { useNavigate } from "react-router-dom";

const ProductsOnSale = ({ related }) => {
  const navigate = useNavigate()

  return (
    <div>
      <h3 className="font-titleFont text-xl font-semibold mb-6 underline underline-offset-4 decoration-[1px]">
        Products Related
      </h3>
      <div className="flex flex-col gap-2">
        {related && related.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border-b-[1px] border-b-gray-300 py-2 cursor-pointer"
            onClick={() => navigate(`/product/${item.id}`, {
              state: {
                item,
              },
            })}
          >
            <div>
              <img className="w-24" src={item.image} alt={item.image} />
            </div>
            <div className="flex flex-col gap-2 font-titleFont">
              <p className="text-base font-medium">{item.name}</p>
              <p className="text-sm font-semibold">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsOnSale;
