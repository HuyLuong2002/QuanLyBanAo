import React, {Fragment, useEffect, useState} from 'react'
import {useAlert} from 'react-alert';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {clearErrors} from '../actions/productAction';
import Loader from '../components/Loader/Loader';
import MetaData from '../components/layout/MetaData';
import Sidebar from './Sidebar';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import {Button} from '@material-ui/core';
import {UPDATE_SUPPLIER_RESET} from "../constants/supplierConstant";
import {getSupplierDetails, updateSupplier} from "../actions/supplierAction";

const UpdateSupplier = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {id} = useParams();

    const {error, supplier} = useSelector((state) => state.supplierDetails);

    const {loading, error: updateError, isUpdated} = useSelector((state) => state.supplier);

    const [name, setName] = useState(supplier.name);

    const supplierId = id;

    useEffect(() => {
        dispatch(getSupplierDetails(supplierId));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Supplier Updated Successfully');
            navigate('/admin/suppliers');
            dispatch({type: UPDATE_SUPPLIER_RESET});
        }

        // dispatch(getSuppliers());
    }, [dispatch, alert, error, navigate, isUpdated, supplierId, updateError]);

    const updateSupplierSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('name', name);

        dispatch(updateSupplier(supplierId, myForm));
    };

    return (
        <Fragment>
            {loading ? (
                <Loader/>
            ) : (
                <Fragment>
                    <MetaData title="Edit Supplier"/>
                    <div className="dashboard">
                        <Sidebar/>
                        <div className="newProductContainer">
                            <form
                                className="createProductForm"
                                encType="multipart/form-data"
                                onSubmit={updateSupplierSubmitHandler}
                            >
                                <h1>Edit Supplier</h1>

                                <div>
                                    <FormatColorTextIcon/>
                                    <input
                                        type="text"
                                        placeholder="Supplier Name"
                                        required
                                        value={name ? name : supplier?.name}
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

export default UpdateSupplier