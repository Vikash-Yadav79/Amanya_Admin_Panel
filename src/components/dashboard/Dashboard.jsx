// src/components/dashboard/Dashboard.js
import React, { useState } from 'react';
import { Layout, Menu, Typography, Badge, Input, Row, Col } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  FileDoneOutlined,
  BellOutlined,
  SearchOutlined,
  PhoneOutlined,
  TeamOutlined,
  ProjectOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import { Routes, Route, useNavigate } from 'react-router-dom';
import logo from '../../assets/company_Logo.jpeg';
import EmployeeDashboard from '../employeeDashboard/EmployeeDashboard';
import ProjectDashboard from '../projectDashboard/ProjectDashboard';
import CustomerDashboard from '../customerDashboard/CustomerDashboard';
import Users from '../users/Users';
import Requirements from '../requirements/Requirements';
import NoticeBoard from '../noticeBoard/NoticeBoard';
import './Dashboard.css';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const [selectedMenu, setSelectedMenu] = useState('1');
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} className="custom-sider" style={{height:"440px"}}>
        <div className="profile-section">
          <img src={logo} alt="Logo" className="logo" />
          <Title level={4} className="profile-name" style={{color:'white'}}>Rahul Singh</Title>
          <Text className="profile-role">Dept Admin</Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          style={{ height: '100%', borderRight: 0 }}
          theme="dark"
          onClick={handleMenuClick}
        >
          <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="/dashboard/project-dashboard" icon={<ProjectOutlined />}>
            Project Dashboard
          </Menu.Item>
          <Menu.Item key="/dashboard/employees" icon={<TeamOutlined />}>
            Employee Dashboard
          </Menu.Item>
          <Menu.Item key="/dashboard/customers" icon={<CustomerServiceOutlined />}>
            Customers Dashboard
          </Menu.Item>
          <Menu.Item key="/dashboard/users" icon={<UserOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="/dashboard/requirements" icon={<FileDoneOutlined />}>
            Requirements
          </Menu.Item>
          <Menu.Item key="/dashboard/notices" icon={<FileDoneOutlined />}>
            Notice Board
          </Menu.Item>
        </Menu>
        <div className="emergency-contact">
          <PhoneOutlined /> Emergency Contact: 7052416399
        </div>
      </Sider>
      <Layout>
        <Header className="custom-header">
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3} style={{ color: 'white', margin: 0 }}>
                Admin Panel
              </Title>
            </Col>
            <Col>
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                style={{ width: 200, borderRadius: '5px' }}
              />
              <Badge count={5} style={{ marginLeft: 20 }}>
                <BellOutlined style={{ fontSize: '24px', color: 'white' }} />
              </Badge>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Routes>
            <Route path="/" element={<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>Welcome to the Dashboard</div>} />
            <Route path="employees" element={<EmployeeDashboard />} />
            <Route path="project-dashboard" element={<ProjectDashboard />} />
            <Route path="customers" element={<CustomerDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="requirements" element={<Requirements />} />
            <Route path="notices" element={<NoticeBoard />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
