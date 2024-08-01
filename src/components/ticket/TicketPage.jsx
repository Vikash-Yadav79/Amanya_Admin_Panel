import React, { useState } from 'react';
import { List, Typography, Button, Input, Modal, Form, Upload, Table, Space, Row, Col, Card, Select } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import './TicketPage.css';

const { Title } = Typography;
const { Option } = Select;

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setCurrentTicket(null);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    const newTicket = {
      ...values,
      key: isEditMode ? currentTicket.key : tickets.length,
    };

    if (isEditMode) {
      setTickets(tickets.map(ticket => (ticket.key === currentTicket.key ? newTicket : ticket)));
    } else {
      setTickets([...tickets, newTicket]);
    }

    setIsModalVisible(false);
    setIsEditMode(false);
    setCurrentTicket(null);
    form.resetFields();
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleEdit = (record) => {
    setCurrentTicket(record);
    form.setFieldsValue(record);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setTickets(tickets.filter(ticket => ticket.key !== key));
  };

  const filteredTickets = tickets.filter(ticket =>
    Object.values(ticket).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const summaryData = {
    totalTickets: tickets.length,
    activeTickets: tickets.filter(ticket => ticket.status === 'Enable').length,
    completedTickets: tickets.filter(ticket => ticket.status === 'Close').length,
    pendingTickets: tickets.filter(ticket => ticket.status === 'Pending').length,
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Mobile Number', dataIndex: 'mobileNumber', key: 'mobileNumber' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Query', dataIndex: 'query', key: 'query' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="ticket-page-container">
      <Title level={2} className="ticket-page-title">Ticket Summary</Title>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={6}>
          <Card className="summary-card" title="Total Tickets" bordered={false}>
            <Title level={2} className="card-number">{summaryData.totalTickets}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="summary-card active-tickets" title="Active Tickets" bordered={false}>
            <Title level={2} className="card-number">{summaryData.activeTickets}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="summary-card completed-tickets" title="Completed Tickets" bordered={false}>
            <Title level={2} className="card-number">{summaryData.completedTickets}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="summary-card pending-tickets" title="Pending Tickets" bordered={false}>
            <Title level={2} className="card-number">{summaryData.pendingTickets}</Title>
          </Card>
        </Col>
      </Row>
      <div className="ticket-page-header">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          className="add-ticket-button"
        >
          Add Ticket
        </Button>
        <Input
          placeholder="Search tickets"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <Table columns={columns} dataSource={filteredTickets} />

      <Modal
        title={isEditMode ? "Edit Ticket" : "Add Ticket"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => form.submit()}
          >
            {isEditMode ? "Update" : "Submit"}
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mobileNumber"
            label="Mobile Number"
            rules={[
              { required: true, message: 'Please enter your mobile number!' },
              { pattern: /^[0-9]+$/, message: 'Mobile number must be numeric!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please enter the subject!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="query"
            label="Query"
            rules={[{ required: true, message: 'Please enter your query!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select 
              placeholder="Select status"
              className="status-select"
              dropdownClassName="status-dropdown"
            >
              <Option value="Enable">Enable</Option>
              <Option value="Disable">Disable</Option>
              <Option value="Process">Process</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Close">Close</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="screenshot"
            label="Screenshot"
          >
            <Upload
              accept=".png, .jpg, .jpeg, .pdf"
              beforeUpload={() => false}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Screenshot</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TicketPage;
