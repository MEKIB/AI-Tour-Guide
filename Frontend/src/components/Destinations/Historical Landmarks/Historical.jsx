import React from 'react';
import { Row, Col, Typography, Space, Card } from 'antd';
import 'antd/dist/antd.min.js';
import GuzaraCastleImage from '../../../assets/Guzara.jpg'; 
import YismaNigusImage from '../../../assets/Yisma.jpg';
import AyiteyefAdarashImage from '../../../assets/Ayiteyef.jpg';
import MaqedelaRidgeImage from '../../../assets/Maqedela.jpg';
import ShonkeVillageImage from '../../../assets/Shonke.jpg';
import AnkoberLodgeImage from '../../../assets/Ankober.jpg';
const attractions = [
  {
    title: 'Guzara Castle',
    description:
      'Guzara is a place which ushers a new period of urban development and permanent seat construction for the Ethiopian empire during the medieval period.',
    image: GuzaraCastleImage,
  },
  {
    title: 'Yisma Nigus',
    description:
      'Yisma Nigus is one of the iconic places in Ethiopia in relation to the Battle of Adwa. A museum dedicated to the history of the area is recently installed.',
    image: YismaNigusImage,
  },
  {
    title: 'Ayiteyef Adarash (Dining Hall)',
    description:
      'Ayiteyef is one of the big historical dining halls in Ethiopia. The dining hall can accommodate 3000 guests at one time and as its name implies, the king, the nobles, the clergy, and the ordinary people were served equally in the hall.',
    image: AyiteyefAdarashImage,
  },
  {
    title: 'Maqedela Ridge',
    description:
      'Meqedela Amba is a place where the aspiration and the zeal of Emperor Tewodros for the modernization of Ethiopia came to an end.',
    image: MaqedelaRidgeImage,
  },
  {
    title: 'Shonke Village',
    description:
      'The Shonke Village is an old and mesmerizing mountain with a 900-year unabated settlement with enthralling homes and alleyways.',
    image: ShonkeVillageImage,
  },
  {
      title: 'Ankober Lodge',
      description: 'The medieval town of Ankober is one of the best accomplished day trip destinations in the vicinity of Addis Ababa.',
      image: AnkoberLodgeImage,
  }
];

const Historical = () => {
  return (
    <Space direction="vertical" size="middle" align="center">
      <Typography.Title level={3}>Historical Sites</Typography.Title>
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

export default Historical;