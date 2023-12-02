import React, { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Category = () => {
  const [showSubCatOne, setShowSubCatOne] = useState(false);
  const [active, setActive] = useState(null); 
  const [cateList, setCateList] = useState([])
  const { categoryId, color, minprice, maxprice } = useParams();
  const navigate = useNavigate()

  const items = cateList

  useEffect(() => {
    const getListCategory = async () => {
      const { data } = await axios.get("http://localhost:8081/api/v1/categories"); 
      setCateList(data.categories)
    }

    getListCategory()
  }, [])

  const handleClick = (index, id) => {
    setActive(index);
    setShowSubCatOne(!showSubCatOne);
    navigate(`/shop/${id}/${color}/${minprice}/${maxprice}`);
  };

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {items.map(({ id, name, icons = false }, index) => (
            <li
              key={id}
              className={`border-b-[1px] border-b-[#F0F0F0] py-2 pl-2 flex items-center rounded-lg justify-between cursor-pointer ${active === index ? 'font-bold bg-slate-300' : ''}`}
              onClick={() => handleClick(index, id)}
            >
              {name}
              {icons && (
                <span
                  onClick={() => handleClick(index, id)}
                  className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                >
                  <ImPlus />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
