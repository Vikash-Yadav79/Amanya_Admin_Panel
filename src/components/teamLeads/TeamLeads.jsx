import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Button, Modal, Form, Input, Table, Select, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../api'; // Ensure this is the correct path
import './TeamLeads.css';

const { Title } = Typography;
const { Option } = Select;

const TeamLeads = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [teamLeads, setTeamLeads] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editingTeamLead, setEditingTeamLead] = useState(null);

  useEffect(() => {
    fetchTeamLeads();
  }, []);

  const fetchTeamLeads = async () => {
    try {
      const response = await api.get('get-all-teamleads');
      setTeamLeads(response.data.teamLeads);
    } catch (error) {
      message.error('Failed to fetch team leads');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setEditingTeamLead(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    if (editingTeamLead) {
      await updateTeamLead(editingTeamLead.id, values);
    } else {
      await addTeamLead(values);
    }
    fetchTeamLeads();
    setIsModalVisible(false);
  };

  const addTeamLead = async (teamLead) => {
    try {
      await api.post('create-teamlead', teamLead);
      message.success('Team lead added successfully');
    } catch (error) {
      message.error('Failed to add team lead');
    }
  };

  const updateTeamLead = async (id, teamLead) => {
    try {
      await api.put(`update-teamlead/${id}`, teamLead);
      message.success('Team lead updated successfully');
    } catch (error) {
      message.error('Failed to update team lead');
      console.error('Update error:', error); 
    }
  };

  const deleteTeamLead = async (id) => {
    try {
      await api.delete(`delete-teamlead/${id}`);
      message.success('Team lead deleted successfully');
      fetchTeamLeads();
    } catch (error) {
      message.error('Failed to delete team lead');
    }
  };

  const handleEdit = (teamLead) => {
    setIsModalVisible(true);
    setEditingTeamLead(teamLead);
    form.setFieldsValue(teamLead);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredTeamLeads = teamLeads.filter(teamLead =>
    Object.values(teamLead).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const totalActiveTeamLeads = teamLeads.filter(teamLead => teamLead.status === 'enable').length;
  const totalInactiveTeamLeads = teamLeads.filter(teamLead => teamLead.status === 'disable').length;

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
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => deleteTeamLead(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      <Title level={2} className="team-lead-page-title">Team Lead Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Total Team Leads" bordered={false}>
            <Title level={2} className="card-number">{teamLeads.length}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Total Active Team Leads" bordered={false}>
            <Title level={2} className="card-number">{totalActiveTeamLeads}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Total Inactive Team Leads" bordered={false}>
            <Title level={2} className="card-number">{totalInactiveTeamLeads}</Title>
          </Card>
        </Col>
      </Row>

      <Row justify="space-between" align="middle" style={{ margin: '16px 0' }}>
        <Button className="btn-secondary" icon={<PlusOutlined />} onClick={showModal}>
          Add Team Lead
        </Button>
        <Input
          placeholder="Search team leads"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </Row>

      <Table columns={columns} dataSource={filteredTeamLeads} />

      <Modal
        title={<div className="modal-title">Add Team Lead</div>}
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
              <Form.Item name="pincode" label="Pincode" rules={[{ required: true, message: 'Please enter the pincode!' }]}>
                <Input placeholder="Enter pincode" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="city" label="City" rules={[{ required: true, message: 'Please enter the city!' }]}>
                <Input placeholder="Enter city" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="state_id" label="State" rules={[{ required: true, message: 'Please enter the state!' }]}>
                <Select placeholder="Select state">
                  <Option value="1">State 1</Option>
                  <Option value="2">State 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="country_id" label="Country" rules={[{ required: true, message: 'Please enter the country!' }]}>
                <Select placeholder="Select country">
                  <Option value="101">Country 1</Option>
                  <Option value="102">Country 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="bio" label="Bio" rules={[{ required: true, message: 'Please enter bio!' }]}>
                <Input placeholder="Enter bio" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamLeads;
