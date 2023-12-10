import React, { useEffect, useState } from 'react';
import './sidebar.css';
import logo from '../assets/images/orebiLogo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddIcon from '@material-ui/icons/Add';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import RateReviewIcon from '@material-ui/icons/RateReview';
import CategoryIcon from '@material-ui/icons/Category';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { logout } from '../actions/userAction';
import { useAlert } from 'react-alert';

const Sidebar = () => {
    const [datauser, setDatausertauser] = useState({})
    const location = useLocation();
    const alert = useAlert()
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const { error, loading, isAuthenticated, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Logout = () => {
        dispatch(logout())
        alert.success(`Logged out successfully`);
    }

    useEffect(() => {
        if (!user) {
            navigate('/signin');
            return;
        }
    }, [user, navigate])

    return (
        <div className="sidebar">
            <Link to="/">
                <img className='' src={logo} alt="Ecommerce" />
            </Link>

            {
                user && user?.roles && user?.roles[0].name === 'ADMIN' && (
                    <Link to="/admin/dashboard" className={lastSegment === "dashboard" ? 'text-[#ff6347]' : ""}>
                        <p>
                            <DashboardIcon /> Dashboard
                        </p>
                    </Link>
                )
            }
            <Link to="#" className={lastSegment === "products" ? 'text-[#ff6347]' : ""}>
                <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ImportExportIcon />}>
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                        </Link>

                        <Link to="/admin/product">
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/admin/orders" className={lastSegment === "orders" ? 'text-[#ff6347]' : ""}>
                <p>
                    <ListAltIcon />
                    Orders
                </p>
            </Link>
            {
                user && user?.roles && user?.roles[0].name === 'ADMIN' && (
                    <>
                        <Link to="/admin/users" className={lastSegment === "users" ? 'text-[#ff6347]' : ""}>
                            <p>
                                <PeopleIcon /> Users
                            </p>
                        </Link>
                        <Link to="/admin/suppliers" className={lastSegment === "suppliers" ? 'text-[#ff6347]' : ""}>
                            <p>
                                <RateReviewIcon />
                                Suppliers
                            </p>
                        </Link>
                        <Link to="/admin/categories" className={lastSegment === "categories" ? 'text-[#ff6347]' : ""}>
                            <p>
                                <CategoryIcon />
                                Category
                            </p>
                        </Link>
                    </>
                )
            }
            <Button onClick={Logout}>Logout</Button>
        </div>
    );
};

export default Sidebar;
