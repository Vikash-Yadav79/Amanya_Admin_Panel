import React from 'react';
import { Card, Col, Row, Typography, Button, Modal, Form, Input, Select, DatePicker, Upload, Table } from 'antd';
import { PlusOutlined, UploadOutlined, SearchOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const { Option } = Select;

const CommonCode = () => {
    // const [searchText, setSearchText] = useState('');
    // const handleSearch = (e) => {
    //     setSearchText(e.target.value);
    //   };
  return (
    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
       <Title level={2} className="ticket-page-title">Customer Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card className="custom-card active-projects" title="Active Projects" bordered={false}>
            <Title level={2} className="card-number">120</Title>
            <Text type="success" className="card-percentage">+15% this month</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card completed-projects" title="Completed Projects" bordered={false}>
            <Title level={2} className="card-number">45</Title>
            <Text type="success" className="card-percentage">+10% this month</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card pending-tasks" title="Pending Tasks" bordered={false}>
            <Title level={2} className="card-number">85</Title>
            <Text type="danger" className="card-percentage">-5% this month</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card className="custom-card project-budget" title="Project Budget" bordered={false}>
            <Title level={2} className="card-number">$150,000</Title>
            <Text type="warning" className="card-percentage">+8% this month</Text>
          </Card>
        </Col>
      </Row>
      {/* <Row justify="space-between" align="middle" style={{ margin: '20px 0' }}>
        <Button className="btn-secondary" icon={<PlusOutlined />} onClick={showModal}>
          Add Customer
        </Button>
        <Input
          placeholder="Search projects"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: 300 }}
        />
      </Row> */}
      </div>
  )
}

export default CommonCode