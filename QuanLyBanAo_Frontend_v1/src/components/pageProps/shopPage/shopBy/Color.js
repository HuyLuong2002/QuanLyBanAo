import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";

const Color = () => {
  const [showColors, setShowColors] = useState(true);
  const [activeColorIndex, setActiveColorIndex] = useState(null);
  let { search } = useLocation()
  const values = queryString.parse(search)
  const navigate = useNavigate()

  const colors = [
    { id: 1, title: "GREEN", base: "#22c55e" },
    { id: 2, title: "RED", base: "#dc2626" },
    { id: 3, title: "YELLOW", base: "#f59e0b" },
    { id: 4, title: "BLUE", base: "#3b82f6" },
  ];

  const handleClick = (e, index, title) => {
    e.preventDefault();
    setActiveColorIndex(index);
    if (!search) {
      navigate(`/shop?color=${title}`);
      return
    } else
      if (values.color) {
        delete values.color;
        search = "?" + queryString.stringify(values);
        navigate(`/shop${search}&color=${title}`);
      }
    navigate(`/shop${search}&color=${title}`);
  };

  return (
    <div>
      <div onClick={() => setShowColors(!showColors)} className="cursor-pointer">
        <NavTitle title="Shop by Color" icons={true} />
      </div>
      {showColors && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {colors.map((item, index) => (
              <li
                key={item.id}
                className={`border-b-[1px] border-b-[#F0F0F0] cursor-pointer py-2 pl-2 flex items-center gap-2 rounded-lg ${activeColorIndex === index && values.color ? 'font-bold bg-slate-300' : ''}`}
                onClick={(e) => handleClick(e, index, item.title)}
              >
                <span
                  style={{ background: item.base }}
                  className={`w-3 h-3 bg-gray-500 rounded-full`}
                ></span>
                {item.title}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Color;
