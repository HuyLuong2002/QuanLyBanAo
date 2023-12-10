import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Profile from "./pages/Profile/Profile";
import Order from "./pages/Order/Order";
import ProtectedRoute from "./route/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction";
import store from './store';
import Dashboard from "./Admin/Dashboard";
import ProductList from "./Admin/ProductList";
import NewProduct from "./Admin/NewProduct";
import UpdateProduct from "./Admin/UpdateProduct";
import OrderList from "./Admin/OrderList";
import UsersList from "./Admin/UsersList";
import UpdateUser from "./Admin/UpdateUser";
import ProcessOrder from "./Admin/ProcessOrder";
import Supplier from "./Admin/Supplier";
import Categories from "./Admin/Categories";
import UpdateSupplier from "./Admin/UpdateSupplier";
import UpdateCategories from "./Admin/UpdateCategories";
import Recovery from "./pages/Account/Recovery";

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        }
        ></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route
          path="/paymentgateway"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/myorder" element={<Order />}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/recovery" element={<Recovery />}></Route>
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }></Route>

      {/* admin route */}
      <Route
        exact
        path="/admin/dashboard"
        element={
          <Dashboard />
        }
      />
      <Route
        exact
        path="/admin/products"
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/admin/product"
        element={
          <ProtectedRoute>
            <NewProduct />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/admin/product/:id"
        element={
          <ProtectedRoute>
            <UpdateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/admin/orders"
        element={
          <ProtectedRoute>
            <OrderList />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/admin/order/:id"
        element={
          <ProtectedRoute>
            <ProcessOrder />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/admin/users"
        element={
          <ProtectedRoute>
            <UsersList />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/admin/user/:id"
        element={
          <ProtectedRoute>
            <UpdateUser />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/admin/suppliers"
        element={
          <ProtectedRoute>
            <Supplier />
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/admin/supplier/:id"
        element={
          <ProtectedRoute>
            <UpdateSupplier />
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/admin/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/admin/category/:id"
        element={
          <ProtectedRoute>
            <UpdateCategories />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

function App() {

  useEffect(() => {
    const handleLoadUser = async () => {
      await store.dispatch(loadUser());
    }

    handleLoadUser()
  }, [])

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;