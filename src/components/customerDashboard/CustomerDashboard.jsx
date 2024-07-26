// src/components/customerDashboard/CustomerDashboard.jsx
import React from 'react';
import { Card, Col, Row, Typography } from 'antd';

const { Title, Text } = Typography;

const CustomerDashboard = () => {
  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card className="custom-card" title="Total Customers" bordered={false}>
            <Title level={2}>500</Title>
            <Text type="success">+20% this month</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card" title="New Customers" bordered={false}>
            <Title level={2}>60</Title>
            <Text type="success">+25% this month</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card" title="Returning Customers" bordered={false}>
            <Title level={2}>200</Title>
            <Text type="danger">-10% this month</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card" title="Customer Satisfaction" bordered={false}>
            <Title level={2}>85%</Title>
            <Text type="success">+5% this month</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerDashboard;
