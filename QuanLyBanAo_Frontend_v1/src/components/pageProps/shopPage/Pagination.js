import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../actions/productAction";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import queryString from 'query-string'

function Items({ currentItems }) {

    return (
        <>
            {currentItems &&
                currentItems.map((item) => (
                    <div key={item._id} className="w-full">
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
                ))}
        </>
    );
}

const Pagination = ({ itemsPerPage }) => {

    const { search } = useLocation()
    const values = queryString.parse(search)

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    const { cate, color, priceGte, priceLte} = values;

    const items = products.filter((item) => {
        // 0 condition
        if(!color && !cate && !priceGte && !priceLte) {
            return item
        }

        // 1 condition
        if(color && !cate && !priceGte && !priceLte) {
            return item.color === color 
        }
        if(!color && cate && !priceGte && !priceLte) {
            return item.category.id == cate
        }
        if(!color && !cate) {
            if(!priceGte && priceLte)
                return item.price <= priceLte
            if(priceGte && !priceLte)
                return item.price >= priceGte

            return item.price >= priceGte && item.price <= priceLte
        }

        // 2 conditions
        if(color && cate && !priceGte && !priceLte) {
            return item.color === color && item.category.id == cate
        }

        if(color && !cate) {
            if(!priceGte && priceLte)
                return item.price <= priceLte && item.color === color
            if(priceGte && !priceLte)
                return item.price >= priceGte && item.color === color

            return item.color === color && item.price >= priceGte && item.price <= priceLte
        }

        if(!color && cate) {
            if(!priceGte && priceLte)
                return item.price <= priceLte && item.category.id == cate
            if(priceGte && !priceLte)
                return item.price >= priceGte && item.category.id == cate

            return item.category.id == cate && item.price >= priceGte && item.price <= priceLte
        }

        // 3 conditions
        if(color && cate) {
            if(!priceGte && priceLte)
                return item.price <= priceLte && item.category.id == cate && item.color === color
            if(priceGte && !priceLte)
                return item.price >= priceGte && item.category.id == cate && item.color === color

            return item.category.id == cate && item.price >= priceGte && item.price <= priceLte  && item.color === color
        }

        return item
    });

    console.log("items: ", items);

    const [itemOffset, setItemOffset] = useState(0);
    const [itemStart, setItemStart] = useState(1);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
        setItemStart(newOffset);
    };

    useEffect(() => {
        if (error) return alert.error(error);
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
                <Items currentItems={currentItems} />
            </div>
            <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
                <ReactPaginate
                    nextLabel=""
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel=""
                    pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
                    pageClassName="mr-6"
                    containerClassName="flex text-base font-semibold font-titleFont py-10"
                    activeClassName="bg-black text-white"
                />

                <p className="text-base font-normal text-lightText">
                    Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of{" "}
                    {items.length}
                </p>
            </div>
        </div>
    );
};

export default Pagination;
