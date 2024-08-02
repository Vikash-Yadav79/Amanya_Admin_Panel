import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Button, Modal, Form, Input, Table, Select, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../api'; // Ensure this is the correct path
import './ManagerDashboard.css';

const { Title } = Typography;
const { Option } = Select;

const ManagerDashboard = () => {
   const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [managers, setManagers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editingManager, setEditingManager] = useState(null);

  useEffect(() => {
    fetchManagers();
  }, []);

  const fetchManagers = async () => {
    try {
      const response = await api.get('get-all-manager');
      setManagers(response.data.managers);
    } catch (error) {
      message.error('Failed to fetch managers');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setEditingManager(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    if (editingManager) {
      await updateManager(editingManager.id, values);
    } else {
      await addManager(values);
    }
    fetchManagers();
    setIsModalVisible(false);
  };

  const addManager = async (manager) => {
    try {
      await api.post('create-manager', manager);
      message.success('Manager added successfully');
    } catch (error) {
      message.error('Failed to add manager');
    }
  };

  const updateManager = async (id, manager) => {
    try {
      await api.put(`update-manager/${id}`, manager);
      message.success('Manager updated successfully');
    } catch (error) {
      message.error('Failed to update manager');
      console.error('Update error:', error); 
    }
  };

  const deleteManager = async (id) => {
    try {
      await api.delete(`delete-manager/${id}`);
      message.success('Manager deleted successfully');
      fetchManagers();
    } catch (error) {
      message.error('Failed to delete manager');
    }
  };

  const handleEdit = (manager) => {
    setIsModalVisible(true);
    setEditingManager(manager);
    form.setFieldsValue(manager);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredManagers = managers.filter(manager =>
    Object.values(manager).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const totalActiveManagers = managers.filter(manager => manager.status === 'enable').length;
  const totalInactiveManagers = managers.filter(manager => manager.status === 'disable').length;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'first_name',
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
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => deleteManager(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      <Title level={2} className="manager-page-title">Manager Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Total Managers" bordered={false}>
            <Title level={2} className="card-number">{managers.length}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Total Active Managers" bordered={false}>
            <Title level={2} className="card-number">{totalActiveManagers}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Total Inactive Managers" bordered={false}>
            <Title level={2} className="card-number">{totalInactiveManagers}</Title>
          </Card>
        </Col>
      </Row>

      <Row justify="space-between" align="middle" style={{ margin: '16px 0' }}>
        <Button className="btn-secondary" icon={<PlusOutlined />} onClick={showModal}>
          Add Manager
        </Button>
        <Input
          placeholder="Search managers"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </Row>

      <Table columns={columns} dataSource={filteredManagers} />

      <Modal
        title={<div className="modal-title">Add Manager</div>}
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
              <Form.Item name="country_id" label="Country ID" rules={[{ required: true, message: 'Please enter the country ID!' }]}>
                <Input placeholder="Enter country ID" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="state_id" label="State ID" rules={[{ required: true, message: 'Please enter the state ID!' }]}>
                <Input placeholder="Enter state ID" />
              </Form.Item>
            </Col>
            <Col span={8}>
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
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status!' }]}>
                <Select placeholder="Select status">
                  <Option value="enable">Enable</Option>
                  <Option value="disable">Disable</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerDashboard;
