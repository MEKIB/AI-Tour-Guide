import React from 'react';
import { Row, Col, Typography, Space, Card } from 'antd';
import 'antd/dist/antd.min.js';
import DebreBirhanSellasie from '../../../assets/DebreBirhanSellasie.jpg';
import AmbaGiorgis from '../../../assets/AmbaGiorgis.jpg';
import DimaGiorgis from '../../../assets/DimaGiorgis.jpg';
import GeneteMaryam from '../../../assets/Genetemaryam.jpg';

const attractions = [
  {
    title: 'Debre Birhane Sellassie',
    description: 
      'Welcome to one of Ethiopia’s most beautiful churches. Appealing as it is on the outside with its stone walls, arched doors and two-tiered thatch roof, it’s the inner sanctuary of Debre Berhan Selassie, with its glorious frescos, that really shines.',
    image: DebreBirhanSellasie, 
  },
  {
    title: 'Zoz Amba Gyorgis',
    description: 
      'Hidden and unexplored, the rock-hewn churches of Zoz Amba Gyorgis flicker a glimpse of idea how Bete Gyorgis in Lalibela seems before the culmination of its construction.',
    image: AmbaGiorgis, 
  },
  {
    title: 'Dima Giorgis Monastery',
    description: 
      'Dima Gyorgis is one of the active and elevated monastery of Ethiopian Orthodox Church long age scholarship and education.',
    image: DimaGiorgis, 
  },
  {
    title: 'Genete Maryam',
    description: 
      'Resemble the Bete Medhaniyalem church of Lalibela, Genete Marayam rock-hewn church is one of architecturally decorated and probably the last rock hewn church to be hewn in Lalibela area.',
    image: GeneteMaryam, 
  },
];

const Religious = () => {
  return (
    <Space direction="vertical" size="middle" align="center">
      <Typography.Title level={3}>Historial and Religious Sites</Typography.Title>
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

export default Religious;