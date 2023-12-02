import React, { Fragment, useEffect, useState } from 'react';
import './newProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, createProduct, getCategories, getSuppliers } from '../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FeaturedPlayList from '@material-ui/icons/FeaturedPlayList'
import SideBar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import MetaData from '../components/layout/MetaData';
import { NEW_PRODUCT_RESET } from '../constants/productConstants';
import axios from 'axios';

const NewProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newProduct);
    const { products } = useSelector((state) => state.products);

    const { categories } = useSelector((state) => state.categories);
    const { suplliers } = useSelector((state) => state.suppliers);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    // const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState('');
    const [supplier, setSupplier] = useState('');
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');

    const sizeList = ['M', 'L', 'XL', '2XL', '3XL']

    const colorList = ['GREEN', 'RED', 'YELLOW', 'BLUE']

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success('Product Created Successfully');
            navigate('/admin/dashboard');
            dispatch({ type: NEW_PRODUCT_RESET });
        }

        dispatch(getSuppliers());
        dispatch(getCategories());
    }, [dispatch, alert, error, navigate, success]);

    const createProductSubmitHandler = async (e) => {
        e.preventDefault();

        // myForm.set('name', name);
        // myForm.set('price', price);
        // myForm.set('description', description);
        // myForm.set('category', category);
        // myForm.set('category', category);
        // myForm.set('color', color);
        // myForm.set('size', size);

        // images.forEach((image) => {
        //     myForm.append('image', image);
        // });
        console.log("image: ", images);

        const formData = new FormData();
        formData.append('file', images); // images[0] là tệp ảnh đầu tiên

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };

        const response = await axios.post('http://localhost:8081/api/v1/products/upload', formData, config);
        const { image } = response.data;
        console.log("dataImg: ", image);

        const data = {
            name,
            price,
            description,
            category: categories && categories.find(item => item.name === category),
            supplier: suplliers && suplliers.find(item => item.name === supplier),
            color,
            size,
            image: image
        }
        console.log("Data: ", data);
        dispatch(createProduct(data));
    };

    // const createProductImagesChange = (e) => {
    //     const files = Array.from(e.target.files);

    //     setImages([]);
    //     setImagesPreview([]);

    //     files.forEach((file) => {
    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setImagesPreview((old) => [...old, reader.result]);
    //                 setImages((old) => [...old, reader.result]);
    //             }
    //         };

    //         reader.readAsDataURL(file);
    //     });
    // };

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

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
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
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories && categories.map((cate) => (
                                    <option key={cate.id} value={cate.name}>
                                        {cate.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setSupplier(e.target.value)}>
                                <option value="">Choose Supplier</option>
                                {suplliers && suplliers.map((sup) => (
                                    <option key={sup.id} value={sup.name}>
                                        {sup.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setSize(e.target.value)}>
                                <option value="M">Choose Size</option>
                                {sizeList.map((cate, index) => (
                                    <option key={index} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select onChange={(e) => setColor(e.target.value)}>
                                <option value="RED">Choose Color</option>
                                {colorList.map((cate, index) => (
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
                            />
                        </div> */}

                        {/* <div className="specification">
                            <FeaturedPlayList />
                            <div>
                                <input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" /><input type="text" />
                            </div>
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

                        <div id="createProductFormImage">
                            {/* {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))} */}
                            {imagesPreview && <img src={imagesPreview} alt="Product Preview" />} 
                        </div>

                        <Button id="createProductBtn" type="submit" disabled={loading ? true : false}>
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;
