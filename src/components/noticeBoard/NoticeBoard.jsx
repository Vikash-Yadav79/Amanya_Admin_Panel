import React, { useState } from 'react';
import { List, Typography, Button, Input, Modal, Form, Select, DatePicker, Table, Space, Row, Col, Card } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import './NoticeBoard.css';

const { Title, Text } = Typography;
const { Option } = Select;

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setCurrentNotice(null);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    const newNotice = {
      ...values,
      startDate: values.startDate.format('YYYY-MM-DD HH:mm:ss'),
      endDate: values.endDate.format('YYYY-MM-DD HH:mm:ss'),
      key: isEditMode ? currentNotice.key : notices.length,
    };

    if (isEditMode) {
      setNotices(notices.map(notice => (notice.key === currentNotice.key ? newNotice : notice)));
    } else {
      setNotices([...notices, newNotice]);
    }

    setIsModalVisible(false);
    setIsEditMode(false);
    setCurrentNotice(null);
    form.resetFields();
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleEdit = (record) => {
    setCurrentNotice(record);
    form.setFieldsValue({
      ...record,
      startDate: moment(record.startDate),
      endDate: moment(record.endDate),
    });
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setNotices(notices.filter(notice => notice.key !== key));
  };

  const filteredNotices = notices.filter(notice =>
    Object.values(notice).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const columns = [
    { title: 'Notice Title', dataIndex: 'noticeTitle', key: 'noticeTitle' },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
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

  const totalNotices = notices.length;
  const activeNotices = notices.filter(notice => notice.status === 'enable').length;
  const completedNotices = notices.filter(notice => notice.status === 'disable').length;
  const pendingNotices = notices.filter(notice => notice.status !== 'disable' && notice.status !== 'enable').length;

  return (
    <div className="notice-board-container">
      <Title level={2}>Notice Board</Title>
      
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={6}>
          <Card className="custom-card active-projects" title="Total Notices" bordered={false}>
            <Title level={2} className="card-number">{totalNotices}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card completed-projects" title="Active Notices" bordered={false}>
            <Title level={2} className="card-number">{activeNotices}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card pending-tasks" title="Completed Notices" bordered={false}>
            <Title level={2} className="card-number">{completedNotices}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card project-budget" title="Pending Notices" bordered={false}> 
            <Title level={2} className="card-number">{pendingNotices}</Title>
          </Card>
        </Col>
      </Row>

      <div className="notice-board-header">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
          className="add-notice-button"
        >
          Add Notice
        </Button>
        <Input
          placeholder="Search notices"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <Table columns={columns} dataSource={filteredNotices} />

      <Modal
        title={isEditMode ? "Edit Notice" : "Add Notice"}
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
            name="noticeTitle"
            label="Notice Title"
            rules={[{ required: true, message: 'Please enter the notice title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select the start date!' }]}
          >
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select the end date!' }]}
          >
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select placeholder="Select status">
              <Option value="enable">Enable</Option>
              <Option value="disable">Disable</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select the category!' }]}
          >
            <Select placeholder="Select category">
              <Option value="Development">Development</Option>
              <Option value="HR">HR</Option>
              <Option value="Marketing">Marketing</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NoticeBoard;
