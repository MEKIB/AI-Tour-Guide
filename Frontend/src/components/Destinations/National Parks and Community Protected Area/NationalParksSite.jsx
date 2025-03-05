import React from 'react';
import { Row, Col, Typography, Space, Card } from 'antd';
import 'antd/dist/antd.min.js';
// Import placeholder images or your actual images
import AbuneYosephImage from '../../../assets/abune-yoseph.jpg'
import SemienMountainsImage from '../../../assets/Semien-Mountains.jpg';
import GunaMountainImage from '../../../assets/Guna.jpg';
import ChokeMountainImage from '../../../assets/Choke.jpg';
import BorenaSayintImage from '../../../assets/Borena.jpg';
import MenzGuassaImage from '../../../assets/Menz-Guassa.jpg';
import AlitashNationalParkImage from '../../../assets/Alitash.jpg';

const attractions = [
    {
        title: 'Abune Yoseph Community Conservation Area',
        description:
            'Considered to be one of the habitats of the elusive Ethiopian wolf, Abune Yoseph mountain is an important biodiversity zone in Amhara Region.',
        image: AbuneYosephImage,
    },
    {
        title: 'The Semien Mountains National Park',
        description:
            'Famous for its dramatic highland scenery and endemic wildlife, The Semien Mountains National Park constitutes a world heritage site.',
        image: SemienMountainsImage,
    },
    {
        title: 'Guna Mountain',
        description:
            'Mount Guna is the source of Gumara, Rib, and other rivers which flow down to the largest lake of Ethiopia; Lake Tana.',
        image: GunaMountainImage,
    },
    {
        title: 'Choke Mountain',
        description:
            'Choke Mountain is a famous bio-diversity rich hotspot area found South of Lake Tana and is always dubbed to be the water tower of Ethiopia.',
        image: ChokeMountainImage,
    },
    {
        title: 'Borena Sayint Worehimeno National Park',
        description:
            'The Borena Sayint National park is an area endowed with unspoiled nature and wilderness. The locals consider the park as a concealing place from aggressors.',
        image: BorenaSayintImage,
    },
    {
        title: 'Menz Guassa Community Conservation Area',
        description:
            'Truly off the beaten track, the 98-sq-km Menz-Guassa Community Conservation Area has one of the smallest but best-protected Afro-alpine habitats in Ethiopia.',
        image: MenzGuassaImage,
    },
    {
        title: 'Alitash National Park',
        description:
            'Called to be the green belt of the desert between Sudan and the northwestern part of Ethiopia, Alitash National Park is the hidden gem of Ethiopia.',
        image: AlitashNationalParkImage,
    },
];

const NationalParkSites = () => {
    return (
        <Space direction="vertical" size="middle" align="center">
            <Typography.Title level={3}>Protected Areas</Typography.Title>
            <Row gutter={[16, 16]}>
                {attractions.map((attraction) => (
                    <Col key={attraction.title} xs={24} sm={12} md={12} lg={8} xl={6}>
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

export default NationalParkSites;