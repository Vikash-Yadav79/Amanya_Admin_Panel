import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Button, Modal, Form, Input, Select, Table } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import './CustomerDashboard.css';

const { Title, Text } = Typography;
const { Option } = Select;

const CustomerDashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [customerSummary, setCustomerSummary] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    new: 0
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('https://amanyademo.in.net/api/get-all-customer'); // Ensure this URL is correct
      console.log('API Response:', response.data);
      
      if (response.data && response.data.customer && Array.isArray(response.data.customer)) {
        const customerList = response.data.customer;
        setCustomers(customerList);

        // Calculate summary details
        const total = customerList.length;
        const active = customerList.filter(customer => customer.status === 'enable').length;
        const inactive = customerList.filter(customer => customer.status === 'disable').length;
        const newCustomers = customerList.filter(customer => new Date(customer.created_at) > new Date(Date.now() - 30*24*60*60*1000)).length; // Example: new customers in the last 30 days
        
        setCustomerSummary({ total, active, inactive, new: newCustomers });
      } else {
        console.error('Unexpected response format:', response.data);
        setCustomers([]);
        setCustomerSummary({ total: 0, active: 0, inactive: 0, new: 0 });
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values) => {
    const newCustomer = { ...values, key: customers.length };
    setCustomers([...customers, newCustomer]);
    form.resetFields();
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    Object.values(customer).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact Details',
      dataIndex: 'contact_details',
      key: 'contact_details',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Card title="Total Customers" bordered={false}>
            <Text strong>{customerSummary.total}</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Active Customers" bordered={false} style={{ backgroundColor: '#e0f7fa' }}>
            <Text strong>{customerSummary.active}</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Inactive Customers" bordered={false} style={{ backgroundColor: '#ffebee' }}>
            <Text strong>{customerSummary.inactive}</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="New Customers" bordered={false} style={{ backgroundColor: '#f1f8e9' }}>
            <Text strong>{customerSummary.new}</Text>
          </Card>
        </Col>
      </Row>

      <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
        <Button className="btn-secondary" icon={<PlusOutlined />} onClick={showModal}>
          Add Customer
        </Button>
        <Input
          placeholder="Search customers"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </Row>

      <Table columns={columns} dataSource={filteredCustomers} rowKey="id" />

      <Modal
        title="Add Customer"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>
        ]}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: 'Please enter the first name!' }]}>
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: 'Please enter the last name!' }]}>
            <Input placeholder="Enter last name" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter the email!' }]}>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item name="contact_details" label="Contact Details" rules={[{ required: true, message: 'Please enter the contact details!' }]}>
            <Input placeholder="Enter contact details" />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status!' }]}>
            <Select placeholder="Select status">
              <Option value="enable">Enable</Option>
              <Option value="disable">Disable</Option>
            </Select>
          </Form.Item>
          <Form.Item name="website" label="Website">
            <Input placeholder="Enter website" />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input placeholder="Enter address" />
          </Form.Item>
          <Form.Item name="additional_address" label="Additional Address">
            <Input placeholder="Enter additional address" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerDashboard;
