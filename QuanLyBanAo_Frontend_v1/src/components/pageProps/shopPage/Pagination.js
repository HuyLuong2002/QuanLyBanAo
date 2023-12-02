import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../actions/productAction";
import { useParams } from "react-router-dom";

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

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);
    const { categoryId, color, minprice, maxprice } = useParams();

    // useEffect to get products
    useEffect(() => {
        if (error) return alert.error(error);
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    const items = products.filter((item) => {
        // 0 condition
        if(color === "0" && categoryId === "0" && minprice === "0" && maxprice === "0") {
            return item
        }

        // 1 condition
        if(color !== "0" && categoryId === "0" && minprice === "0" && maxprice === "0") {
            return item.color === color 
        }
        if(color === "0" && categoryId !== "0" && minprice === "0" && maxprice === "0") {
            return item.category.id === Number(categoryId)
        }
        if(color === "0" && categoryId === "0") {
            if(minprice === "0")
                return item.price < Number(maxprice)

            if(maxprice === "0")
                return item.price > Number(minprice)

            return item.price > Number(minprice) && item.price < Number(maxprice)
        }

        // 2 conditions
        if(color !== "0" && categoryId !== "0" && minprice === "0" && maxprice === "0") {
            return item.color === color && item.category.id === Number(categoryId)
        }

        if(color !== "0" && categoryId === "0") {
            if(minprice === "0")
                return item.price < Number(maxprice) && item.color === color
            if(maxprice === "0")
                return item.price > Number(minprice) && item.color === color

            return item.color === color && item.price > Number(minprice) && item.price < Number(maxprice)
        }

        if(color === "0" && categoryId !== "0") {
            
            if(minprice === "0") {
                return item.price < Number(maxprice) && item.category.id === Number(categoryId)
            }
            if(maxprice === "0")
                return item.price > Number(minprice) && item.category.id === Number(categoryId)

            return item.category.id === Number(categoryId) && item.price > Number(minprice) && item.price < Number(maxprice)
        }

        // 3 conditions
        if(color !== "0" && categoryId !== "0") {
            if(minprice === "0")
                return item.price < Number(maxprice) && item.category.id === Number(categoryId) && item.color === color
            if(maxprice === "0")
                return item.price > Number(minprice) && item.category.id === Number(categoryId) && item.color === color

            return item.category.id === Number(categoryId) && item.price > Number(minprice) && item.price < Number(maxprice)  && item.color === color
        }

        return item
    });

    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    const [itemStart, setItemStart] = useState(1);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
        // console.log(
        //   `User requested page number ${event.selected}, which is offset ${newOffset},`
        // );
        setItemStart(newOffset);
    };



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
