import React from 'react';
import { Table, Tag, Typography, Button } from 'antd';

const { Title, Paragraph } = Typography;

// Columns definition
const columns = [
  {
    title: 'City (Airport)',
    dataIndex: 'route',
    key: 'route',
  },
  {
    title: 'Flight Frequency',
    dataIndex: 'frequency',
    key: 'frequency',
  },
  {
    title: 'Flight Schedules',
    dataIndex: 'days',
    key: 'days',
    render: days => (
      <div style={{ display: 'flex', gap: 4 }}>
        {days.map(day => (
          <Tag 
            color="#1890ff" 
            style={{ 
              width: 32, 
              textAlign: 'center', 
              padding: 0 
            }}
            key={day}
          >
            {day}
          </Tag>
        ))}
      </div>
    )
  },
];

// Data source
const dataSource = [
  {
    key: '1',
    route: 'Addis Ababa (ADD) to/from Bahir Dar (BJR)',
    frequency: '7 Days a week',
    days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  },
  {
    key: '2',
    route: 'Addis Ababa (ADD) to/from Gondar (GDQ)',
    frequency: '7 Days a week',
    days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  },
  {
    key: '3',
    route: 'Addis Ababa (ADD) to/from Lalibela (LLI)',
    frequency: '7 Days a week',
    days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  },
  {
    key: '4',
    route: 'Addis Ababa (ADD) to/from Kombolcha (DSE)',
    frequency: '7 Days a week',
    days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  },
];

const FlightSchedule = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ marginBottom: 16 }}>
        Ethiopian Domestic Flight Schedule
      </Title>
      
      <Paragraph style={{ marginBottom: 24 }}>
        Ethiopian’s domestic route network is spread all over the country bringing provincial 
        and administrative cities within easy reach of the capital and the region’s commercial 
        centers. In the Amhara region there is a daily flight from Addis Ababa to major tourist 
        cities Bahir Dar, Gondar, Lalibela and Dessie.
      </Paragraph>

      <Table 
        columns={columns} 
        dataSource={dataSource}
        pagination={false}
        bordered
        scroll={{ x: true }}
        style={{ marginBottom: 24 }}
      />

<Paragraph style={{ 
  marginTop: 32,
  textAlign: 'center',
  backgroundColor: '#f8f9fa',
  padding: 40,
  borderRadius: 12,
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
}}>
  <Title 
    level={4} 
    style={{ 
      color: '#1a1a1a',
      fontWeight: 600,
      letterSpacing: '-0.25px',
      marginBottom: 24,
      fontSize: '1.4rem',
      lineHeight: 1.3
    }}
  >
    Book Your Trip to Ethiopia with Ethiopian Airlines<br />
    <span style={{ 
      fontSize: '1rem',
      fontWeight: 400,
      color: '#4d4d4d',
      display: 'block',
      marginTop: 8
    }}>
      Serving 125+ Destinations Worldwide
    </span>
  </Title>
  <Button 
    type="primary"
    size="large"
    href="https://www.ethiopianairlines.com/aa" 
    target="_blank"
    rel="noopener noreferrer"
    style={{ 
      marginTop: 8,
      padding: '0 40px',
      height: 48,
      fontSize: 16,
      fontWeight: 600,
      letterSpacing: '0.25px',
      background: '#003893',
      border: 'none',
      borderRadius: 8,
      boxShadow: '0 4px 6px rgba(0, 56, 147, 0.2)',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase'
    }}
    className="hover-scale"
  >
    Book Flight Now
  </Button>
</Paragraph>
    </div>
  );
};

export default FlightSchedule;