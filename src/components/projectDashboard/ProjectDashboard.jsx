import React, { useState } from 'react';
import { Card, Col, Row, Typography, Button, Modal, Form, Input, Select, DatePicker, Upload, Table } from 'antd';
import { PlusOutlined, UploadOutlined, SearchOutlined } from '@ant-design/icons';
import './ProjectDashboard.css';

const { Title, Text } = Typography;
const { Option } = Select;

const ProjectDashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState('');

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
    const newProject = { ...values, key: projects.length };
    setProjects([...projects, newProject]);
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
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (date) => date.format('YYYY-MM-DD'),
    },
    {
      title: 'Project Status',
      dataIndex: 'projectStatus',
      key: 'projectStatus',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
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
            <Title level={2} className="card-number">$150,000</Title>
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
              <Form.Item name="customer" label="Select Customer" rules={[{ required: true, message: 'Please select a customer!' }]}>
                <Select placeholder="Select a customer">
                  <Option value="Customer A">Customer A</Option>
                  <Option value="Customer B">Customer B</Option>
                  <Option value="Customer C">Customer C</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="projectName" label="Project Name" rules={[{ required: true, message: 'Please enter the project name!' }]}>
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
              <Form.Item name="requirementType" label="Requirement Type" rules={[{ required: true, message: 'Please select the requirement type!' }]}>
                <Select placeholder="Select requirement type">
                  <Option value="App">App</Option>
                  <Option value="Website">Website</Option>
                  <Option value="Both">Both</Option>
                  <Option value="CRM">CRM</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="referralWebsite" label="Referral Website">
                <Input placeholder="Enter referral website" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="referralApp" label="Referral App">
                <Input placeholder="Enter referral app" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="screenshot" label="Screenshot Upload">
                <Upload>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="projectStatus" label="Project Status" rules={[{ required: true, message: 'Please select the project status!' }]}>
                <Select placeholder="Select project status">
                  <Option value="Progress">Progress</Option>
                  <Option value="Running">Running</Option>
                  <Option value="Completed">Completed</Option>
                  <Option value="Close">Close</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status!' }]}>
                <Select placeholder="Select status">
                  <Option value="Enable">Enable</Option>
                  <Option value="Disable">Disable</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item name="requirementText" label="Requirement Text" rules={[{ required: true, message: 'Please enter the requirement text!' }]}>
                <Input.TextArea rows={4} placeholder="Enter requirement text" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectDashboard;
