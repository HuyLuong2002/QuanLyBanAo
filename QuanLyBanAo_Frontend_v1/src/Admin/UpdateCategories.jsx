import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors } from '../actions/productAction';
import Loader from '../components/Loader/Loader';
import MetaData from '../components/layout/MetaData';
import Sidebar from './Sidebar';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import { Button } from '@material-ui/core';

const UpdateCategories = () => {
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
        // dispatch(getProductDetails(productId));
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
            // dispatch({ type: UPDATE_PRODUCT_RESET });
        }

        // dispatch(getSuppliers());
        // dispatch(getCategories());
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
        // dispatch(updateProduct(productId, myForm));
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Edit Category" />
                    <div className="dashboard">
                        <Sidebar />
                        <div className="newProductContainer">
                            <form
                                className="createProductForm"
                                encType="multipart/form-data"
                                onSubmit={updateProductSubmitHandler}
                            >
                                <h1>Edit Category</h1>

                                <div>
                                    <FormatColorTextIcon />
                                    <input
                                        type="text"
                                        placeholder="Product Name"
                                        required
                                        value={product?.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
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
}

export default UpdateCategories