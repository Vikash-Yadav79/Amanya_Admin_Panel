import React from 'react';
import { Table, Typography, Space, Button } from 'antd';

const { Title } = Typography;

const Requirements = () => {
  const requirementsData = [
    { key: '1', requirement: 'New Laptop', status: 'Pending' },
    { key: '2', requirement: 'Projector Repair', status: 'Completed' },
  ];

  const columns = [
    { title: 'Requirement', dataIndex: 'requirement', key: 'requirement' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">Update</Button>
          <Button type="link" danger>Remove</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Requirements</Title>
      <Table columns={columns} dataSource={requirementsData} />
    </div>
  );
};

export default Requirements;
