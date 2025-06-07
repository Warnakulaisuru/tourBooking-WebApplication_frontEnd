import React from "react";
import "../styles/home.css";

import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img01.jpg";
import heroImg02 from "../assets/images/hero-img02.jpg";
import heroVideo from "../assets/images/IMG_5548.MOV";
import worldImg from "../assets/images/world.png";
import experienceImg from '../assets/images/experience.png';

import Subtitle from "./../shared/Subtitle";

// import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featureed-tours/FeaturedTourList";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/Testimonial/Testimonials";
// import Newsletter from "../shared/Newsletter";

const Home = () => {
  return (
    <>
      {/* --hero section start-- */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle Subtitle={"Know Before You Go"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Traveling opens the door to creating {""}
                  <span className="highlight">memories</span>
                </h1>
                <p>
                  This tiny Paradise Island which is on the Indian Ocean is one
                  of the most popular tourist destinations in the world. The
                  World Explorer from 16th of Century “Marco Polo” wrote that
                  Sri Lanka is the finest Island in the whole world and Lonely
                  Planet magazine has ranked Sri Lanka as World’s No 1 travel
                  destination for 2019. Sri Lanka contains a great mixture of
                  unique golden and pristine beaches, dense wildlife, a rich
                  cultural heritage, Over 2500 years old enchanting Ancient
                  Ruins, Colorful festivals, diverse ethnical groups, amazing
                  unbelievable landscapes and the great hospitality from the
                  local people will make you to come back to Sri Lanka. Renowned
                  worldwide, Ceylon Tea is one of Sri Lanka’s prime exports and
                  a visit to a tea plantation and factory to be enlightened
                  about Sri Lanka’s 150 year old tea industry is a must for most
                  tourists.
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
                <video src={heroVideo} alt="" controls />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg02} alt="" />
              </div>
            </Col>
            {/* <center>
              <SearchBar />
            </center> */}
          </Row>
        </Container>
      </section>
      {/* --hero section end-- */}

      <br />

      {/* --featured tour section start-- */}
      <section>
        <Container>
          <Row>
            <Col lg="12 className=" mb-5>
              <Subtitle Subtitle={"Explore"} />
              <h2 className="featured_tour-title">Our featured tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* --featured tour section end-- */}

      <br />

      <sction>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </sction>

      <br/>

      {/* --experience section start-- */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle Subtitle={"Experience"} />

                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p></p>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>1k+</span>
                  <h6>Successfull Trip</h6>
                </div>
                <div className="counter__box">
                  <span>0.5k+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className="counter__box">
                  <span>10</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>
            <Col lg='6'>
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* --experience section end-- */}

      {/* --gallery section start-- */}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
            <Subtitle Subtitle={"Gallery"} />
            <h2 className="galley__title">
              Visit our customers tour gallery
            </h2>
            </Col>
            <Col lg='12'>
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* --gallery section end-- */}

      {/* --testimonial section start-- */}
      <section>
        <Container>
          <Row>
            <Col lg='12'>
            <Subtitle Subtitle={"Fans Love"} />
            <h2 className="testimonial__title">
              What our fans say about us
            </h2>
            </Col>
            <Col lg='12'>
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
      {/* --testimonial section end-- */}
      {/* <Newsletter /> */}
    </>
  );
};

export default Home;
