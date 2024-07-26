import React from 'react';
import { List, Typography, Button } from 'antd';

const { Title, Text } = Typography;

const NoticeBoard = () => {
  const noticesData = [
    { key: '1', title: 'Server Maintenance', date: '2024-07-01', content: 'The server will be down for maintenance on July 1st.' },
    { key: '2', title: 'New Policy Update', date: '2024-07-15', content: 'Please review the new policy updates on the internal portal.' },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Notice Board</Title>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={noticesData}
        renderItem={item => (
          <List.Item
            key={item.key}
            actions={[
              <Button type="link">Read More</Button>,
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={item.date}
            />
            <Text>{item.content}</Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default NoticeBoard;
