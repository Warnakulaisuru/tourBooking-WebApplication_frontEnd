import React from 'react';
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';

import carImg from '../assets/images/pngegg.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const serviceData = [
    {
        imgUrl: guideImg,
        title: "Best Tour Guide",
        desc: "You can choose tour guide in our company for your Tour",
        link: '/tourGuide'
    },
    {
        imgUrl: carImg,
        title: "Vehicals",
        desc: "If you're want to change your tour vehical ?",
        link: '/vehicals'
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "Customize tour for your time and bought",
        link: '/customization'
    }
];

const ServiceList = () => {
  return (
   <>
    {serviceData.map((item, index) => (
        <Col lg="3" key={index}>
            <ServiceCard item={item} />
        </Col>
    ))}
   </>
  );
};

export default ServiceList;
