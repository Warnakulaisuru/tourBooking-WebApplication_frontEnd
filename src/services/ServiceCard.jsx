import React from 'react';
import { Link } from 'react-router-dom';
import "./service-card.css";

const ServiceCard = ({ item }) => {
    const { imgUrl, title, desc, link } = item;
    return (
        <div className="service__item">
            <div className="service__img">
                <Link to={link}>
                    <img src={imgUrl} alt={title} />
                </Link>
            </div>
            <h5>{title}</h5>
            <p>{desc}</p>
        </div>
    );
}

export default ServiceCard;
