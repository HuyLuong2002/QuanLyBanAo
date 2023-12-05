import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, message } from 'antd';
import { useState } from "react";
import { logout, updatePassword, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { getCurrentUserCart } from "../../actions/cartAction";
import axios from "axios";
import "./SpecialCase.css"

const { Option } = Select;

const SpecialCase = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const alert = useAlert();
  // const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [openPw, setOpenPw] = useState(false)
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [newConfirmPass, setNewConfirmPass] = useState('')
  const [messageApi, contextHolder] = message.useMessage();

  const [formData, setFormData] = useState({
    id: user?.id || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    dateOfBirth: user?.dateOfBirth,
    sex: user?.sex || 'MALE', // Set a default value if needed
    address: user?.address || '',
    tel: user?.tel || '',
  });


  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const showDrawer = (event) => {
    event.preventDefault();
    console.log("user: ", user);
    if (!user)
      navigate('/signin')
    setOpen(true);
  };

  const warning = (message) => {
    messageApi.open({
      type: 'warning',
      content: message,
    });
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

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleUpdateProfile = async () => {
    if (formData.id === "")
      formData.id = user.id
    if (formData.firstName === "")
      formData.firstName = user.firstName
    if (formData.lastName === "")
      formData.lastName = user.lastName
    if (formData.email === "")
      formData.email = user.email
    if (formData.address === "")
      formData.address = user.address
    if (formData.sex === "")
      formData.sex = user.sex
    if (formData.tel === "")
      formData.tel = user.tel
    if (formData.dateOfBirth === "")
      formData.dateOfBirth = user.dateOfBirth

    dispatch(updateProfile(formData))
    // await axios.put(`localhost:8081/api/v1/auth/profile`, formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' } 
    // });
    console.log("formData: ", formData);
    alert.success("Profile updated")
    setEdit(false)
    setOpen(false)
  }

  const handleUpdatePass = () => {
    const oldPassUser = JSON.parse(localStorage.getItem('pass'))
    console.log("oldPassUser: ", oldPassUser);
    if(!oldPass) {
      alert.error('Please enter old password')
      return
    }
    if(!newPass) {
      alert.error("Please enter new password")
      return
    }
    if(!newConfirmPass) {
      alert.error("Please enter confirm password")
      return
    }

    if(oldPassUser !== oldPass) {
      alert.error("Old password is incorrect")
      return
    }
    if(newPass !== newConfirmPass) {
      alert.error("Confirm password is incorrect")
      return
    }
    dispatch(updatePassword(newPass));
    localStorage.setItem('pass', JSON.stringify(newPass));
    alert.success("Password updated successfully")
    setOpenPw(false)
  }

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
                <Button onClick={() => handleUpdateProfile()} type="primary" className="bg-blue-600">
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
                      message: 'Please enter First Name',
                    },
                  ]}
                >
                  <Input disabled={!edit} placeholder="Please enter First name"
                    onChange={(e) => handleInputChange('firstName', e.target.value)} value={user?.firstName} defaultValue={user?.firstName} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Last Name"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Last Name',
                    },
                  ]}
                >
                  <Input disabled={!edit} placeholder="Please enter Last name" onChange={(e) => handleInputChange('lastName', e.target.value)} value={user?.lastName} defaultValue={user?.lastName} />
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
                  <Select
                    disabled={!edit}
                    placeholder="Please select a Sex"
                    value={formData.sex}
                    defaultValue={user?.sex}
                    onChange={(value) => handleInputChange('sex', value)}
                  >
                    <Option value="MALE">MALE</Option>
                    <Option value="FEMALE">FEMALE</Option>
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
                  <Input disabled={!edit} placeholder="Please enter Address" onChange={(e) => handleInputChange('address', e.target.value)} value={user?.address} defaultValue={user?.address} />
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
                  <Input disabled={!edit} placeholder="Please enter Telephone" onChange={(e) => handleInputChange('tel', e.target.value)} value={user?.tel} defaultValue={user?.tel} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        }

        <hr className="mb-4" />

        <div className="flex justify-between gap-4">
          {
            openPw ? (
              <div className="flex gap-4">
              <Button className="w-auto" onClick={() => handleUpdatePass()}>Update</Button>
              <Button className="w-auto" onClick={() => setOpenPw(false)}>Cancel</Button>
              </div>
            ) : 
            <Button className="w-auto" onClick={() => setOpenPw(true)}>Change Password</Button>
          }
          <div>
            <Link to="/myorder">
              <Button className="w-24" onClick={() => setOpen(false)}>My orders</Button>
            </Link>
            <Button className="w-24 ml-4" onClick={Logout}>Logout</Button>
          </div>
        </div>

        {
          openPw && (
            <div className="mt-4">
              <Col span={12}>
                <Form.Item
                  name="Old Password"
                  label="Old Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please Old Password',
                    },
                  ]}
                >
                  <Input placeholder="Old Password" onChange={(e) => setOldPass(e.target.value)} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="New Password"
                  label="New Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter New Password',
                    },
                  ]}
                >
                  <Input placeholder="New Password" onChange={(e) => setNewPass(e.target.value)} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="Confirm New Password"
                  label="Confirm New Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter Confirm New Password',
                    },
                  ]}
                >
                  <Input placeholder="Confirm New Password" onChange={(e) => setNewConfirmPass(e.target.value)} />
                </Form.Item>
              </Col>
            </div>
          )
        }
      </Drawer>
    </div>
  );
};

export default SpecialCase;
