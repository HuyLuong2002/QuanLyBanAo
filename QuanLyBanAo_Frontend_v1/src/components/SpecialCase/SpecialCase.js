import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from "react";
import { logout } from "../../actions/userAction";
import { useAlert } from "react-alert";
import axios from "axios";
import { getCurrentUserCart } from "../../actions/cartAction";

const { Option } = Select;

const SpecialCase = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const alert = useAlert();
  // const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { totalItem, totalPrices, cartItems } = useSelector((state) => state.cart);


  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const showDrawer = (event) => {
    event.preventDefault();
    console.log("user: ", user);
    if (!user)
      navigate('/signin')
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setEdit(false);
  };

  const Logout = () => {
    dispatch(logout())
    setOpen(false);
    alert.success(`Logged out successfully`);
  }

  const hanleEdit = (e) => {
    e.preventDefault()
    setEdit(true)
  }

  console.log("cart Item: ", cartItems)

  useEffect(() => {
    dispatch(getCurrentUserCart());
  }, [dispatch]);

  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
      <Link to={user ? "#" : "/signin"} onClick={showDrawer}>
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer">
          <div className="flex justify-center items-center">
            <MdSwitchAccount className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Profile</p>
        </div>
      </Link>
      <Link to="/cart">
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <RiShoppingCart2Fill className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />

            <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
          </div>
          <p className="text-xs font-semibold font-titleFont">Buy Now</p>
          {cartItems?.length > 0 && (
            <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {cartItems.length}
            </p>
          )}
        </div>
      </Link>

      <Drawer
        title="My Profile"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            {
              edit ? <>
                <Button onClick={onClose} type="primary" className="bg-blue-600">
                  Update
                </Button>
                <Button onClick={() => setEdit(false)}>Cancel</Button></>
                : <Button onClick={hanleEdit} type="primary" className="bg-blue-600">
                  Edit
                </Button>
            }
          </Space>
        }
      >
        {
          user && <Form layout="vertical" hideRequiredMark>
            <Row gutter={16} >
              <Col span={12}>
                <Form.Item
                  name="First Name"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter First Name name',
                    },
                  ]}
                >
                  <Input disabled={!edit} placeholder="Please enter First name" value={user?.firstName} defaultValue={user?.firstName} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Last Name"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Last Name name',
                    },
                  ]}
                >
                  <Input disabled={!edit} placeholder="Please enter Last name" value={user?.lastName} defaultValue={user?.lastName} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="Email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Email',
                    },
                  ]}
                >
                  <Input disabled={true}
                    style={{
                      width: '100%',
                    }}
                    placeholder="Email"
                    value={user?.email}
                    defaultValue={user?.email}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="Sex"
                  label="Sex"
                  rules={[
                    {
                      required: true,
                      message: 'Please select an Sex',
                    },
                  ]}
                >
                  <Select disabled={!edit} placeholder="Please select an Sex" value={user?.sex} defaultValue={user?.sex}>
                    <Option value="xiao">MALE</Option>
                    <Option value="mao">FEMALE</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Address',
                    },
                  ]}
                >
                  <Input disabled={!edit} placeholder="Please enter Address" value={user?.address} defaultValue={user?.address} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Telephone"
                  label="Telephone"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Telephone',
                    },
                  ]}
                >
                  <Input disabled={!edit} placeholder="Please enter Telephone" value={user?.tel} defaultValue={user?.tel} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        }

        <div className="flex gap-4">
          <Link to="/myorder">
            <Button className="w-24" onClick={() => setOpen(false)}>My orders</Button>
          </Link>
          <Button className="w-24" onClick={Logout}>Logout</Button>
        </div>
      </Drawer>
    </div>
  );
};

export default SpecialCase;
