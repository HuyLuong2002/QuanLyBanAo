import React, { useState } from "react";
import { motion } from "framer-motion";
import NavTitle from "./NavTitle";
import { useNavigate, useParams } from "react-router-dom";

const Color = () => {
  const [showColors, setShowColors] = useState(true);
  const [activeColorIndex, setActiveColorIndex] = useState(null);
  const { categoryId, color, minprice, maxprice } = useParams();
  const navigate = useNavigate()

  const colors = [
    { id: 9001, title: "GREEN", base: "#22c55e" },
    { id: 9003, title: "RED", base: "#dc2626" },
    { id: 9004, title: "YELLOW", base: "#f59e0b" },
    { id: 9005, title: "BLUE", base: "#3b82f6" },
  ];

  const handleClick = (e, index, title) => {
    e.preventDefault();
    setActiveColorIndex(index);
    navigate(`/shop/${categoryId}/${title}/${minprice}/${maxprice}`);
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
                className={`border-b-[1px] border-b-[#F0F0F0] cursor-pointer py-2 pl-2 flex items-center gap-2 rounded-lg ${activeColorIndex === index ? 'font-bold bg-slate-300' : ''}`}
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
