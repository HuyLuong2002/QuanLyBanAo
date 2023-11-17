import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { MdSwitchAccount } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import { useState } from "react";
import { logout } from "../../actions/userAction";

const { Option } = Select;

const SpecialCase = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);

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
  }

  const hanleEdit = (e) => {
    e.preventDefault()
    setEdit(true)
  }

  return (
    <div className="fixed top-52 right-2 z-20 hidden md:flex flex-col gap-2">
      <Link to="#" onClick={showDrawer}>
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
          {products?.length > 0 && (
            <p className="absolute top-1 right-2 bg-primeColor text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {products.length}
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
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter user name',
                    },
                  ]}
                >
                  <Input placeholder="Please enter user name" value={user.lastName} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="url"
                  label="Url"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter url',
                    },
                  ]}
                >
                  <Input
                    style={{
                      width: '100%',
                    }}
                    addonBefore="http://"
                    addonAfter=".com"
                    placeholder="Please enter url"
                    value={user.email}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="owner"
                  label="Owner"
                  rules={[
                    {
                      required: true,
                      message: 'Please select an owner',
                    },
                  ]}
                >
                  <Select placeholder="Please select an owner">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Type"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the type',
                    },
                  ]}
                >
                  <Select placeholder="Please choose the type">
                    <Option value="private">Private</Option>
                    <Option value="public">Public</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="approver"
                  label="Approver"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the approver',
                    },
                  ]}
                >
                  <Select placeholder="Please choose the approver">
                    <Option value="jack">Jack Ma</Option>
                    <Option value="tom">Tom Liu</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="dateTime"
                  label="DateTime"
                  rules={[
                    {
                      required: true,
                      message: 'Please choose the dateTime',
                    },
                  ]}
                >
                  <DatePicker.RangePicker
                    style={{
                      width: '100%',
                    }}
                    getPopupContainer={(trigger) => trigger.parentElement}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: 'please enter url description',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="please enter url description" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        }

        <Button onClick={Logout}>Logout</Button>
      </Drawer>
    </div>
  );
};

export default SpecialCase;
