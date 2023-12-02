import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, updateProduct, getProductDetails, getSuppliers, getCategories } from '../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SideBar from './Sidebar';
import { UPDATE_PRODUCT_RESET } from '../constants/productConstants';
import { useNavigate, useParams } from 'react-router-dom';
import MetaData from '../components/layout/MetaData';
import Loader from '../components/Loader/Loader';

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();

    const { error, product } = useSelector((state) => state.productDetails);

    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

    const { categories } = useSelector((state) => state.categories);
    const { suplliers } = useSelector((state) => state.suppliers);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    // const [Stock, setStock] = useState(0);
    const [images, setImages] = useState('');
    // const [oldImages, setOldImages] = useState('');
    const [imagesPreview, setImagesPreview] = useState('');
    const [supplier, setSupplier] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');

    const productId = id;

    const sizeList = ['M', 'L', 'XL', '2XL', '3XL']

    const colorList = ['GREEN', 'RED', 'YELLOW', 'BLUE']

    console.log("Product: ", categories);

    function createProductImagesChange(event) {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const imagePath = URL.createObjectURL(selectedFile);
            setImages(selectedFile)
            setImagesPreview(imagePath)
        } else {
            console.log("Không có tệp nào được chọn");
        }
    }

    useEffect(() => {
        // if (product && product.id !== productId) {
        dispatch(getProductDetails(productId));
        // } else {
        //     setName(product.name);
        //     setDescription(product.description);
        //     setPrice(product.price);
        //     setCategory(product.category);
        //     // setStock(product.Stock);
        //     setOldImages(product.images);
        // }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Product Updated Successfully');
            navigate('/admin/products');
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }

        dispatch(getSuppliers());
        dispatch(getCategories());
    }, [dispatch, alert, error, navigate, isUpdated, productId, updateError]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('name', name);
        myForm.set('price', price);
        myForm.set('description', description);
        myForm.set('category', category.toLowerCase());
        // myForm.set('Stock', Stock);

        images.forEach((image) => {
            myForm.append('images', image);
        });
        dispatch(updateProduct(productId, myForm));
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Edit Product" />
                    <div className="dashboard">
                        <SideBar />
                        <div className="newProductContainer">
                            <form
                                className="createProductForm"
                                encType="multipart/form-data"
                                onSubmit={updateProductSubmitHandler}
                            >
                                <h1>Edit Product</h1>

                                <div>
                                    <SpellcheckIcon />
                                    <input
                                        type="text"
                                        placeholder="Product Name"
                                        required
                                        value={product?.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <AttachMoneyIcon />
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        required
                                        onChange={(e) => setPrice(e.target.value)}
                                        value={product?.price}
                                    />
                                </div>

                                <div>
                                    <DescriptionIcon />

                                    <textarea
                                        placeholder="Product Description"
                                        value={product?.description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        cols="40"
                                        rows="1"
                                    ></textarea>
                                </div>

                                <div>
                                    <AccountTreeIcon />
                                    <select onChange={(e) => setCategory(e.target.value)}>
                                        <option value="">{product && product.category?.name}</option>
                                        {categories && categories.filter(item=>item.name !== product.category?.name).map((cate) => (
                                            <option key={cate.id} value={cate.name}>
                                                {cate.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <AccountTreeIcon />
                                    <select onChange={(e) => setSupplier(e.target.value)}>
                                        <option value="">{product && product.supplier?.name}</option>
                                        {suplliers && suplliers.filter(item=>item.name !== product.supplier?.name).map((sup) => (
                                            <option key={sup.id} value={sup.name}>
                                                {sup.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <AccountTreeIcon />
                                    <select onChange={(e) => setSize(e.target.value)}>
                                        <option value="M">{product && product.size}</option>
                                        {sizeList.filter(item => item !== product.size).map((cate, index) => (
                                            <option key={index} value={cate}>
                                                {cate}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <AccountTreeIcon />
                                    <select onChange={(e) => setColor(e.target.value)}>
                                        <option value="RED">{product && product.color}</option>
                                        {colorList.filter(item => item !== product.color).map((cate, index) => (
                                            <option key={index} value={cate}>
                                                {cate}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* <div>
                                    <StorageIcon />
                                    <input
                                        type="number"
                                        placeholder="Stock"
                                        required
                                        onChange={(e) => setStock(e.target.value)}
                                        value={Stock}
                                    />
                                </div> */}

                                <div id="createProductFormFile">
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={createProductImagesChange}
                                        multiple
                                    />
                                </div>

                                <div id="">
                                    {
                                        !imagesPreview && <img src={product.image} alt="Old Product Preview" className='w-[120px]'/>
                                    }
                                </div>

                                <div id="">
                                    {imagesPreview &&
                                        <img src={imagesPreview} alt="Product Preview" className='w-[120px]'/>
                                    }
                                </div>

                                <Button id="createProductBtn" type="submit" disabled={loading ? true : false}>
                                    Update
                                </Button>
                            </form>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default UpdateProduct;
