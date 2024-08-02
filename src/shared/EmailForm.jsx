import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './emailform.css';

const EmailForm = () => {
  const [buttonText, setButtonText] = useState('Send Email');

  const handleSubmit = (event) => {
    event.preventDefault();
    setButtonText('Sending...');

    const serviceID = 'default_service';
    const templateID = 'template_iq62pya';

    emailjs.sendForm(serviceID, templateID, event.target, 'SLxAa0I4lmDE53Q3Q')
      .then(() => {
        setButtonText('Send Email');
        alert('Sent!');
      }, (err) => {
        setButtonText('Send Email');
        alert(JSON.stringify(err));
      });
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <div className="input">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" />
      </div>
      {/* <div className="field">
        <label htmlFor="reply_to">Reply To</label>
        <input type="text" name="reply_to" id="reply_to" />
      </div> */}
      <input type="submit" id="button" value={buttonText} />
    </form>
  );
};

export default EmailForm;
