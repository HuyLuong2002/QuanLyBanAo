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
import axios from 'axios';

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();

    const { error, product } = useSelector((state) => state.productDetails);

    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);

    const { categories } = useSelector((state) => state.categories);
    const { suplliers } = useSelector((state) => state.suppliers);

    const [name, setName] = useState(product && product?.name);
    const [price, setPrice] = useState(product?.price);
    const [description, setDescription] = useState(product?.description);
    const [category, setCategory] = useState('');
    const [images, setImages] = useState('');
    const [imagesPreview, setImagesPreview] = useState('');
    const [supplier, setSupplier] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [CheckChangeImage, setCheckChangeImage] = useState(false);

    const productId = id;

    const sizeList = ['M', 'L', 'XL', '2XL', '3XL']

    const colorList = ['GREEN', 'RED', 'YELLOW', 'BLUE']

    function createProductImagesChange(event) {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const imagePath = URL.createObjectURL(selectedFile);
            setImages(selectedFile)
            setImagesPreview(imagePath)
            setCheckChangeImage(true)
        } else {
            console.log("Không có tệp nào được chọn");
        }
    }

    

    const updateProductSubmitHandler = async (e) => {
        e.preventDefault();
        let imageOrigin = product.image

        if(CheckChangeImage) {
            const formData = new FormData();
            formData.append('file', images); // images[0] là tệp ảnh đầu tiên

            const config = {
                headers: { 'Content-Type': 'multipart/form-data' },
            };

            const response = await axios.post('http://localhost:8081/api/v1/products/upload', formData, config);
            const { image } = response.data;
            imageOrigin = image
        }

        
        console.log("dataImg: ", imageOrigin);

        const data = {
            name: name ? name : product.name,
            price: price ? price : product.price,
            description: description ? description : product.description,
            category: product.category,
            supplier: product.supplier,
            color: color ? color : product.color,
            size: size ? size : product.size,
            image: imageOrigin
        }

        // console.log("data: ", data);
        dispatch(updateProduct(productId, data));
    };

    useEffect(() => {
        dispatch(getProductDetails(productId));
        dispatch(getSuppliers());
        dispatch(getCategories());
        
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
        
    }, [dispatch, alert, error, navigate, isUpdated, productId, updateError]);

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
                                        value={name ? name : product?.name}
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
                                        value={price ? price : product?.price}
                                    />
                                </div>

                                <div>
                                    <DescriptionIcon />

                                    <textarea
                                        placeholder="Product Description"
                                        value={description ? description : product?.description}
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
