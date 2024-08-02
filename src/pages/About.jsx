import React from "react";
import "../styles/about.css";
import { Link } from "react-router-dom";
import img from "../assets/images/experience.png";
// import Newsletter from "../shared/Newsletter";

const AboutUs = () => {
  return (
    <>
      <div>
        <div className="section">
          <div className="container">
            <div className="title">
              <h1>About Us</h1>
            </div>
            <div className="content">
              <div className="article">
                <h3>
                  Lankawangguo is a Sri Lankan owned and operated company helping
                  visitors discover and enjoy Sri Lanka for over 10 years. Our
                  expertise is unmatched and our knowledge of Sri Lanka is
                  unmatched. Whether you are a solo traveler, a couple on vacation
                  or honeymoon, a group of friends or convention delegates, or
                  visitors looking for an activity or wellness vacation, we take
                  care of all the details for your trip. Whatever your interests,
                  indulgence, extreme sports, trekking or cycling, wildlife,
                  ancient or colonial culture, sightseeing, tropical cuisine or
                  Ayurvedic therapy, we can arrange a tour to delight you from
                  arrival to departure. We can arrange all types of accommodation,
                  from jungle cabanas and private villas to plush boutique
                  retreats and contemporary luxury hotels. We are known for our
                  long-established high service standards and guest commitment.
                  <br />
                  Lankawangguo believes in a better future and thus invests
                  heavily in sustainability and eco-friendly practices.
                </h3>
                <div className="button">
                  <Link to="/tours">Our Tours</Link>
                </div>
              </div>
            </div>
            <div className="image-section">
              <img src={img} alt="About Us" />
            </div>
            <div className="social">
              {/* Uncomment and replace URLs with actual social media links
              <SocialIcon network="facebook" url="https://www.facebook.com/profile.php?id=100063478496773" />&nbsp;
              <SocialIcon network="wechat" url="www.vimeo.com" />&nbsp;
              <SocialIcon network="whatsapp" url="www.vimeo.com" /> */}
            </div>
          </div>
        </div>
        <div></div>
      </div>
      {/* Uncomment if you want to include the Newsletter component
      <Newsletter /> */}
    </>
  );
};

export default AboutUs;
