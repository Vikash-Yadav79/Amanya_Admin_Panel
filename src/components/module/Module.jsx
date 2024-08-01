import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Button, Modal, Form, Input, Table, Select, message } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../api'; // Ensure this is the correct path
import './Module.css';

const { Title } = Typography;
const { Option } = Select;

const Module = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [modules, setModules] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editingModule, setEditingModule] = useState(null);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await api.get('get-all-module');
      setModules(response.data.modules);
    } catch (error) {
      message.error('Failed to fetch modules');
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    setEditingModule(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    if (editingModule) {
     await updateModule(editingModule.id, values);
    } else {
      await addModule(values);
    }
    fetchModules();
    setIsModalVisible(false);
  };
  
  const addModule = async (module) => {
    try {
      await api.post('create-module', module);
      message.success('Module added successfully');
    } catch (error) {
      message.error('Failed to add module');
    }
  };

  const updateModule = async (id, module) => {
    try {
           await api.put(`update-module/${id}`, module);
      message.success('Module updated successfully');
    } catch (error) {
      message.error('Failed to update module');
      console.error('Update error:', error); 
    }
  };
  const deleteModule = async (id) => {
    try {
      await api.delete(`delete-module/${id}`);
      message.success('Module deleted successfully');
      fetchModules();
    } catch (error) {
      message.error('Failed to delete module');
    }
  };

  const handleEdit = (module) => {
    setIsModalVisible(true);
    setEditingModule(module);
    form.setFieldsValue(module);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredModules = modules.filter(module =>
    Object.values(module).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const totalActiveModules = modules.filter(module => module.status === 'enable').length;
  const totalInactiveModules = modules.filter(module => module.status === 'disable').length;

  const columns = [
    {
      title: 'Module Name',
      dataIndex: 'module_name',
      key: 'module_name',
    },
    {
      title: 'Module Short Name',
      dataIndex: 'module_short_name',
      key: 'module_short_name',
    },
    {
      title: 'Module URL',
      dataIndex: 'module_url',
      key: 'module_url',
    },
    {
      title: 'Module List URL',
      dataIndex: 'module_list_url',
      key: 'module_list_url',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => deleteModule(record.id)}>Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      <Title level={2} className="module-page-title">Module Management</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Total Modules" bordered={false}>
            <Title level={2} className="card-number">{modules.length}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Total Active Modules" bordered={false}>
            <Title level={2} className="card-number">{totalActiveModules}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card hover-card" title="Total Inactive Modules" bordered={false}>
            <Title level={2} className="card-number">{totalInactiveModules}</Title>
          </Card>
        </Col>
      </Row>

      <Row justify="space-between" align="middle" style={{ margin: '16px 0' }}>
        <Button className="btn-secondary" icon={<PlusOutlined />} onClick={showModal}>
          Add Module
        </Button>
        <Input
          placeholder="Search modules"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </Row>

      <Table columns={columns} dataSource={filteredModules} />

      <Modal
        title={<div className="modal-title">Add Module</div>}
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
              <Form.Item name="module_name" label="Module Name" rules={[{ required: true, message: 'Please enter the module name!' }]}>
                <Input placeholder="Enter module name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="module_short_name" label="Module Short Name" rules={[{ required: true, message: 'Please enter the module short name!' }]}>
                <Input placeholder="Enter module short name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item name="module_url" label="Module URL" rules={[{ required: true, message: 'Please enter the module URL!' }]}>
                <Input placeholder="Enter module URL" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="module_list_url" label="Module List URL" rules={[{ required: true, message: 'Please enter the module list URL!' }]}>
                <Input placeholder="Enter module list URL" />
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

export default Module;
