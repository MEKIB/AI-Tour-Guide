import React from 'react';
import { Row, Col, Typography, Space, Card } from 'antd';
import 'antd/dist/antd.min.js';
// Import placeholder images or your actual images
import LakeZengenaImage from '../../../assets/Lake-Zegena.jpg'; // Replace with your image paths
import LakeTirbaImage from '../../../assets/Lake-tribe.jpg';
import WanzayeHotspringImage from '../../../assets/lake-wanzaye.jpg';
import LakeHayqImage from '../../../assets/lake-hayq.jpg';
import BlueNileFallsImage from '../../../assets/blue-nile.jpg';
import LakeTanaReserveImage from '../../../assets/lake-tana1.jpg';

const attractions = [
  {
    title: 'Lake Zengena',
    description:
      'Lake Zenegna is one of the Crater Lakes in Ethiopia which is endowed with a large variety of bird species and wildlife.',
    image: LakeZengenaImage,
  },
  {
    title: 'Lake Tirba',
    description:
      'Lake Tirba is one of the few crater lakes that dot around the Awi Zone of the Amhara Regional State.',
    image: LakeTirbaImage,
  },
  {
    title: 'Wanzaye Hotspring',
    description:
      'Wanzaye Filweha/hot spring/ is one of the nearby and closest natural hot springs near the regional capital Bahir Dar. The hot spring has a curative role for local communities.',
    image: WanzayeHotspringImage,
  },
  {
    title: 'Lake Hayq',
    description:
      'Best known for its crystal clear water, Lake Hayq is one of the lakes found outside of the Ethiopian Great Rift Valley system.',
    image: LakeHayqImage,
  },
  {
    title: 'Blue Nile Falls',
    description:
      'The Blue Nile looks like a sluggish beast as it meanders out of Lake Tana, but not far out of Bahir Dar you’ll see the Nile in a very different mood.',
    image: BlueNileFallsImage,
  },
  {
    title: 'Lake Tana Biosphere Reserve',
    description:
      'Lake Tana Biosphere Reserve is a hotspot of biodiversity, internationally known as an Important Bird Area, and is of global importance for agricultural genetic diversity.',
    image: LakeTanaReserveImage,
  },
];

const LakesAndWaterfallSites = () => {
  return (
    <Space direction="vertical" size="middle" align="center">
      <Typography.Title level={3}>Natural Attractions</Typography.Title>
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

export default LakesAndWaterfallSites;