import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Button, Modal, Form, Input, Select, DatePicker, Upload, Table } from 'antd';
import { PlusOutlined, UploadOutlined, SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import './ProjectDashboard.css';

const { Title, Text } = Typography;
const { Option } = Select;

const ProjectDashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [projects, setProjects] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://amanyademo.in.net/api/get-all-project');
        setProjects(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching projects:', error.response?.data?.error || error.message);
        setProjects([]); // Fallback to empty array on error
      }
    };

    // const fetchCustomers = async () => {
    //   try {
    //     const response = await axios.get('https://amanyademo.in.net/api/get-all-project');
    //     setCustomers(Array.isArray(response.data) ? response.data : []);
    //   } catch (error) {
    //     console.error('Error fetching customers:', error.response?.data?.error || error.message);
    //     setCustomers([]); // Fallback to empty array on error
    //   }
    // };

    fetchProjects();
    // fetchCustomers();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    try {
      await axios.post('https://amanyademo.in.net/api/create-project', values);
      setProjects([...projects, { ...values, key: projects.length }]);
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error adding project:', error.response?.data?.error || error.message);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredProjects = projects.filter(project =>
    Object.values(project).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    {
      title: 'Customer Name',
      dataIndex: 'customer_name',
      key: 'customer_name',
    },
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'project_name',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Project Status',
      dataIndex: 'project_status',
      key: 'project_status',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      <Title level={2} className="ticket-page-title">Project Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Active Projects" bordered={false}>
            <Title level={2} className="card-number">120</Title>
            <Text type="success" className="card-percentage">+15% this month</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Completed Projects" bordered={false}>
            <Title level={2} className="card-number">45</Title>
            <Text type="success" className="card-percentage">+10% this month</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Pending Tasks" bordered={false}>
            <Title level={2} className="card-number">85</Title>
            <Text type="danger" className="card-percentage">-5% this month</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Project Budget" bordered={false}>
            <Title level={2} className="card-number">Rs150,000</Title>
            <Text type="warning" className="card-percentage">+8% this month</Text>
          </Card>
        </Col>
      </Row>

      <Row justify="space-between" align="middle" style={{ margin: '16px 0' }}>
        <Button className="btn-secondary" icon={<PlusOutlined />} onClick={showModal}>
          Add Project
        </Button>
        <Input
          placeholder="Search projects"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </Row>

      <Table columns={columns} dataSource={filteredProjects} />

      <Modal
        title={<div className="modal-title">Add Project</div>}
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
        <Form form={form} onFinish={handleFormSubmit} layout="vertical" className="custom-form">
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="customer_id" label="Customer" rules={[{ required: true, message: 'Please select a customer!' }]}>
                <Select placeholder="Select a customer">
                  {customers.map(customer => (
                    <Option key={customer.id} value={customer.id}>{customer.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="project_name" label="Project Name" rules={[{ required: true, message: 'Please enter the project name!' }]}>
                <Input placeholder="Enter project name" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please enter the price!' }]}>
                <Input placeholder="Enter price" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="deadline" label="Deadline" rules={[{ required: true, message: 'Please select the deadline!' }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="requirement_type" label="Requirement Type" rules={[{ required: true, message: 'Please select the requirement type!' }]}>
                <Select placeholder="Select requirement type">
                  <Option value="App">App</Option>
                  <Option value="Website">Website</Option>
                  <Option value="Both">Both</Option>
                  <Option value="CRM">CRM</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="refferal_website" label="Referral Website">
                <Input placeholder="Enter referral website" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="upload" label="Upload Screenshot">
            <Upload>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectDashboard;
