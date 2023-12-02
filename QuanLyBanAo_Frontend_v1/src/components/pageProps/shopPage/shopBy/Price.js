import { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import NavTitle from './NavTitle';
import { useNavigate, useParams } from 'react-router-dom';

const Price = () => {
  const [activePriceIndex, setActivePriceIndex] = useState(null);
  const { categoryId, color, minprice, pricelte } = useParams();
  const navigate = useNavigate();

  const priceList = [
    { _id: 950, priceOne: 0, priceTwo: 99 },
    { _id: 952, priceOne: 100, priceTwo: 300 },
    { _id: 953, priceOne: 400, priceTwo: 599 },
    { _id: 955, priceOne: 600, priceTwo: 0 },
  ];

  const handleClick = (index, item) => {
    setActivePriceIndex(index);
    navigate(`/shop/${categoryId}/${color}/${item.priceOne}/${item.priceTwo}`);
  };

  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {priceList.map((item, index) => (
            <li
              key={item._id}
              className={`border-b-[1px] border-b-[#F0F0F0] py-2 pl-2 rounded-lg flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300 ${activePriceIndex === index ? 'font-bold bg-slate-300' : ''}`}
              onClick={() => handleClick(index, item)}
            >
              {item._id === 950 && (
                <>
                  <IoIosArrowBack /> ${item.priceTwo.toFixed(2)}
                </>
              )}
              {item._id === 955 && (
                <>
                  <IoIosArrowForward /> ${item.priceOne.toFixed(2)}
                </>
              )}
              {(item._id !== 950 && item._id !== 955) && (
                <>
                  ${item.priceOne.toFixed(2)} - ${item.priceTwo.toFixed(2)}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;
