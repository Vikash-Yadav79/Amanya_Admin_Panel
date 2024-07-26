// src/components/users/Users.jsx
import React, { useState } from 'react';
import { Table, Button, Input, Typography, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Users = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const usersData = [
    { key: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { key: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    // Add more user data here
  ];

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link">Edit</Button>
          <Button type="link" danger>Delete</Button>
        </Space>
      ),
    },
  ];

  const filteredData = usersData.filter(user =>
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Users</Title>
      <Input
        placeholder="Search users"
        prefix={<SearchOutlined />}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default Users;
