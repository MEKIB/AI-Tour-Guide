import React from 'react';
import { Row, Col, Typography, Space, Card } from 'antd';
import 'antd/dist/antd.min.js';
import SemienMountains from '../../../assets/Semien-Mountains.jpg';
import Lalibela from '../../../assets/Lalibela-1.jpg';
import FasilGhebbi from '../../../assets/Gondar-1.jpg';
import LakeTana from '../../../assets/Lake-Tana.jpg';

const attractions = [
  {
    title: 'The Semien Mountains National Park',
    description: 
      'Famous for its dramatic highland scenery and endemic wildlife, the Semien Mountains National Park constitutes a world heritage site.',
    image: SemienMountains, 
  },
  {
    title: 'The Rock Hewn Churches of Lalibela',
    description: 
      'Lalibela is a place where history and mystery frozen in stone, its soul alive with the rites and awe of Christianity at its most ancient and unbending.',
    image: Lalibela, 
  },
  {
    title: 'Fasil Ghebbi - The Camelot of Africa',
    description: 
      'Often called the "Camelot of Africa", Gonder\'s royal enclosure is a reality of medieval African architecture with castles and churches dating back to the 17th century.',
    image: FasilGhebbi, 
  },
  {
    title: 'Lake Tana Biosphere Reserve',
    description: 
      'A hotspot of biodiversity, internationally known as an Important Bird Area, Lake Tana Biosphere Reserve is of global importance for agricultural genetic diversity.',
    image: LakeTana, 
  },
];

const HeritageSites = () => {
  return (
    <Space direction="vertical" size="middle" align="center">
      <Typography.Title level={3}>Historical & Natural Wonders</Typography.Title>
      <Row gutter={[16, 16]}>
        {attractions.map((attraction, index) => (
          <Col key={index} xs={24} sm={12} md={12} lg={8} xl={6}>
            <Card
              hoverable
              cover={<img 
                alt={attraction.title} 
                src={attraction.image} 
                style={{ height: 240, objectFit: 'cover' }} 
              />}
            >
              <Card.Meta
                title={<Typography.Title level={4}>{attraction.title}</Typography.Title>}
                description={attraction.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </Space>
  );
};

export default HeritageSites;