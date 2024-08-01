import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Button, Modal, Form, Input, Table, Select, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../api'; // Replace with the correct path to your API module
import './SeniorSalesExcutive.css';

const { Title } = Typography;
const { Option } = Select;

const SeniorSalesExcutive = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [executives, setExecutives] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editingExecutive, setEditingExecutive] = useState(null);

  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    try {
      const response = await api.get('get-all-executives');
      setExecutives(response.data.executives);
    } catch (error) {
      message.error('Failed to fetch executives');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setEditingExecutive(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    if (editingExecutive) {
      await updateExecutive(editingExecutive.id, values);
    } else {
      await addExecutive(values);
    }
    fetchExecutives();
    setIsModalVisible(false);
  };

  const addExecutive = async (executive) => {
    try {
      await api.post('create-executive', executive);
      message.success('Senior Sales Executive added successfully');
    } catch (error) {
      message.error('Failed to add executive');
    }
  };

  const updateExecutive = async (id, executive) => {
    try {
      await api.put(`update-executive/${id}`, executive);
      message.success('Senior Sales Executive updated successfully');
    } catch (error) {
      message.error('Failed to update executive');
    }
  };

  const deleteExecutive = async (id) => {
    try {
      await api.delete(`delete-executive/${id}`);
      message.success('Senior Sales Executive deleted successfully');
      fetchExecutives();
    } catch (error) {
      message.error('Failed to delete executive');
    }
  };

  const handleEdit = (executive) => {
    setIsModalVisible(true);
    setEditingExecutive(executive);
    form.setFieldsValue(executive);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredExecutives = executives.filter(executive =>
    Object.values(executive).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const totalActiveExecutives = executives.filter(executive => executive.status === 'enable').length;
  const totalInactiveExecutives = executives.filter(executive => executive.status === 'disable').length;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile_number',
      key: 'mobile_number',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <span>
          {text === 'enable' ? 'Enabled' : 'Disabled'}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => deleteExecutive(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      <Title level={2} className="dashboard-page-title">Senior Sales Executive Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Total Executives" bordered={false}>
            <Title level={2} className="card-number">{executives.length}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Total Active Executives" bordered={false}>
            <Title level={2} className="card-number">{totalActiveExecutives}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Total Inactive Executives" bordered={false}>
            <Title level={2} className="card-number">{totalInactiveExecutives}</Title>
          </Card>
        </Col>
      </Row>

      <Row justify="space-between" align="middle" style={{ margin: '16px 0' }}>
        <Button className="btn-secondary" icon={<PlusOutlined />} onClick={showModal}>
          Add Senior Sales Executive
        </Button>
        <Input
          placeholder="Search executives"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </Row>

      <Table columns={columns} dataSource={filteredExecutives} />

      <Modal
        title={<div className="modal-title">Add Senior Sales Executive</div>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>
        ]}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical" className="custom-form">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: 'Please enter the first name!' }]}>
                <Input placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: 'Please enter the last name!' }]}>
                <Input placeholder="Enter last name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="age" label="Age" rules={[{ required: true, message: 'Please enter the age!' }]}>
                <Input placeholder="Enter age" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please enter the gender!' }]}>
                <Input placeholder="Enter gender" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter the email!' }]}>
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="mobile_number" label="Mobile Number" rules={[{ required: true, message: 'Please enter the mobile number!' }]}>
                <Input placeholder="Enter mobile number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="marital_status" label="Marital Status" rules={[{ required: true, message: 'Please enter the marital status!' }]}>
                <Input placeholder="Enter marital status" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="qualification" label="Qualification" rules={[{ required: true, message: 'Please enter the qualification!' }]}>
                <Input placeholder="Enter qualification" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="designation" label="Designation" rules={[{ required: true, message: 'Please enter the designation!' }]}>
                <Input placeholder="Enter designation" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="blood_group" label="Blood Group" rules={[{ required: true, message: 'Please enter the blood group!' }]}>
                <Input placeholder="Enter blood group" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter the address!' }]}>
                <Input placeholder="Enter address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="country_id" label="Country" rules={[{ required: true, message: 'Please enter the country!' }]}>
                <Select placeholder="Select country">
                  <Option value="101">India</Option>
                  {/* Add more options here */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="state_id" label="State" rules={[{ required: true, message: 'Please enter the state!' }]}>
                <Select placeholder="Select state">
                  <Option value="38">Uttar Pradesh</Option>
                  {/* Add more options here */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter the city!' }]}>
                <Input placeholder="Enter city" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="pincode" label="Pincode" rules={[{ required: true, message: 'Please enter the pincode!' }]}>
                <Input placeholder="Enter pincode" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="bio" label="Bio" rules={[{ required: true, message: 'Please enter the bio!' }]}>
                <Input placeholder="Enter bio" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please enter the username!' }]}>
                <Input placeholder="Enter username" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter the password!' }]}>
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default SeniorSalesExcutive;
