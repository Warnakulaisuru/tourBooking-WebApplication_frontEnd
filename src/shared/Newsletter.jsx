import React, { useState } from 'react';
import './newsletter.css';
import { Container, Row, Col } from 'reactstrap';
import maleTourist from '../assets/images/male-tourist.png';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    // Regular expression for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = () => {
    if (email) {
      if (validateEmail(email)) {
        // Here you can add the logic to send the email
        // For example, you could use an API to send the email
        setMessage('Thank you for subscribing!');
        // Reset the email input
        setEmail('');
      } else {
        setMessage('Please enter a valid email address.');
      }
    } else {
      setMessage('Please enter an email address.');
    }
  };

  return (
    <section className='newsletter'>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="newsletter__content">
              <h2>Subscribe now to get useful traveling information.</h2>
              <div className='newsletter__input'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className='btn newsletter__btn'
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>
              {message && <p className="newsletter__message">{message}</p>}
              <p>
                Lanka is the place where you can revive yourself with full of adventures, discoveries and authentic travel experiences you have never experienced before.
              </p>
            </div>
          </Col>
          <Col lg='6'>
            <div className='newsletter__img'>
              <img src={maleTourist} alt='Male Tourist' />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
