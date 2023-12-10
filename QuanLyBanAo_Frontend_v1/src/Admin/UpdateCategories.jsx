import React, {Fragment, useEffect, useState} from 'react'
import {useAlert} from 'react-alert';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import MetaData from '../components/layout/MetaData';
import Sidebar from './Sidebar';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import {Button} from '@material-ui/core';
import {getCategoryDetails, updateCategory} from "../actions/categoryAction";
import {clearErrors, getCategories} from "../actions/productAction";
import {UPDATE_CATEGORY_RESET} from "../constants/categoryConstant";

const UpdateCategories = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {id} = useParams();

    const {error, category} = useSelector((state) => state.categoryDetails);

    const {loading, error: updateError, isUpdated} = useSelector((state) => state.category);

    const [name, setName] = useState("");
    const categoryId = id;
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Category Updated Successfully');
            navigate('/admin/categories');
            dispatch({type: UPDATE_CATEGORY_RESET});
        }

        dispatch(getCategoryDetails(categoryId));
    }, [dispatch, alert, error, navigate, isUpdated, categoryId, updateError]);

    const updateCategorySubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('name', name);

        dispatch(updateCategory(categoryId, myForm));
    };

    return (
        <Fragment>
            {loading ? (
                <Loader/>
            ) : (
                <Fragment>
                    <MetaData title="Edit Category"/>
                    <div className="dashboard">
                        <Sidebar/>
                        <div className="newProductContainer">
                            <form
                                className="createProductForm"
                                encType="multipart/form-data"
                                onSubmit={updateCategorySubmitHandler}
                            >
                                <h1 className='test'>Edit Category</h1>

                                <div className='test3'>
                                    <FormatColorTextIcon/>
                                    <input
                                        type="text"
                                        placeholder="Category Name"
                                        required
                                        value={name ? name : category?.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>


                                <Button className='test2' id="createProductBtn" type="submit" disabled={loading ? true : false}>
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