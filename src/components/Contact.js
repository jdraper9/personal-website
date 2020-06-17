import React from 'react';

class Contact extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.darkMode ? 'contact-container' : 'contact-container-light'
        }
      >
        <div className="contact-form-container">
          <form className="contact-form">
            <h2 style={{ letterSpacing: '.2em' }}>let's get in touch :)</h2>
            <input
              className="form-input"
              type="text"
              name="name"
              value="name"
              style={{
                color: 'rgba(0,0,0,.6)',
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: '.1em',
                fontSize: '1.05rem',
              }}
            ></input>
            <input
              className="form-input"
              type="text"
              name="email"
              value="email"
              style={{
                color: 'rgba(0,0,0,.6)',
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: '.1em',
                fontSize: '1.05rem',
              }}
            ></input>
            <textarea
              className="form-message"
              name="message"
              value="message"
              style={{
                color: 'rgba(0,0,0,.6)',
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: '.1em',
                fontSize: '1.05rem',
              }}
            ></textarea>
            <input className="form-submit" type="submit" value="send" />
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
