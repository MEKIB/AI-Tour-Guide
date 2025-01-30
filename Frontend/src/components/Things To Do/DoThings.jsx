import React from 'react';
import { Row, Col, Typography, Space, Card } from 'antd';
import 'antd/dist/antd.min.js';
import Biking from '../../assets/Biking.jpg'
import Fishing from '../../assets/Fishing.jpg'
import community from '../../assets/community.jpg'
import Hiking from '../../assets/Hiking and trekking.jpg'
import horseback from '../../assets/horseback.jpg'
import bird from '../../assets/Bird watching.jpg'

const attractions = [
  {
    title: 'Horseback Riding',
    description: 
      'With the decoration, they put in their horse, and with a heated and fierce horse galloping event hosted annually attending the horsing events in the Amhara region is a lifetime experience.',
    image: horseback, 
  },
  {
    title: 'Community Tourism',
    description: 
      'With the unique welcoming culture and attribute of the Amhara people, community tourism is one of the special experience one has to do in this part of Ethiopia.',
    image: community, 
  },
  {
    title: 'Biking',
    description: 
      'Thanks to pristine new roads developing in Ethiopia, the Amhara region is now an exciting destination for cyclists with tough climbs, friendly people, and endless views.',
    image: Biking, 
  },
  {
    title: 'Fishing',
    description: 
      'Fishing in the Amhara region is moving back in time to the period of the Ancient Egyptians. Discover Amhara and be in awe of how old fishing is in this part of Ethiopia.',
    image: Fishing, 
  },
  {
    title: 'Bird Watching',
    description: 
      'Host some of the rare and endemic bird species like Lammergeyer and Ankober Serin, birding in this part of Ethiopia will make your binocular restive.',
    image: bird, 
  },
  {
    title: 'Hiking and Trekking',
    description: 
      'The region that dominated by mountainous topography and vistas, the Amhara region retains world class destinations for Hiking and trekking.',
    image: Hiking, 
  },
];

const ThingsToDo= () => {
  return (
    <Space direction="vertical" size="middle" align="center">
      <Typography.Title level={3}>The Most Popular Attractions</Typography.Title>
      <Row gutter={[16, 16]}>
        {attractions.map((attraction, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card
              hoverable
              cover={<img alt={attraction.title} src={attraction.image} style={{ height: 200 }} />}
            >
              <h3>{attraction.title}</h3>
              <p>{attraction.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </Space>
  );
};

export default ThingsToDo;