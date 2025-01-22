import React from 'react';
import { Row, Col, Typography, Space, Card } from 'antd';
import 'antd/dist/antd.min.js';
import image from '../../../assets/family.jpg'; 

const attractions = [
  {
    title: 'Blue Nile Falls',
    description: 'The Blue Nile looks like a sluggish beast as it meanders out of Lake Tana, but not far out of Bahir Dar you’ll see the Nile in a very different mood.',
    image: image, 
  },
  {
    title: 'Shonke Village',
    description: 'The Shonke Village is an Old and mesmerizing mountain with a 900 years unabated settlement with enthralling homes and alleyways.',
    image: image, 
  },
  {
    title: 'Fasil Ghebbi - the Camelot of Africa',
    description: "It’s often called the ‘Camelot of Africa’, a description that does the royal city a disservice: Camelot is legend, where as Gonder is reality.",
    image: image, 
  },
  {
    title: 'The Rock Hewn Churches of Lalibela',
    description: 'Lalibela is a place where history and mystery frozen in stone, its soul alive with the rites and awe of Christianity at its most ancient and unbending.',
    image: image, 
  },
  {
    title: 'The Semien Mountains National Park',
    description: 'Famous for its dramatic highland scenery and endemic wildlife, the Semien Mountains National Park constitutes a world heritage site.',
    image: image, 
  },
  {
    title: 'Lake Tana Monasteries',
    description: 'Lake Tana is the pioneer place in Ethiopia in relation to Christianity as it was the sheltering place for the holy family during the first century AD.',
    image: image, 
  },
];

const Attractions = () => {
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

export default Attractions;