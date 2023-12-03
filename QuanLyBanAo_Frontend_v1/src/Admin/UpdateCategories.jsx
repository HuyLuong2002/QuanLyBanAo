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

    const { loading, categories } = useSelector((state) => state.categories);

    const [name, setName] = useState('');

    useEffect(() => {
        
    }, []);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

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
                                        value=""
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