import React from 'react';
import emailjs from 'emailjs-com';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      formEmailSent: false,
    };
  }

  handleChange = (type, e) => {
    switch (type) {
      case 'name':
        this.setState({ name: e.target.value });
        break;
      case 'email':
        this.setState({ email: e.target.value });
        break;
      case 'message':
        this.setState({ message: e.target.value });
        break;
      default:
        return;
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'default_service',
        'template_CkvbncnH',
        {
          from_name: this.state.name,
          senderEmail: this.state.email,
          message: this.state.message,
        },
        // hide
        'user_5MzVlirkJroVQv65bVsCD'
      )
      .then((res) => {
        console.log('email submitted');
        this.setState({ formEmailSent: true });
      })
      .catch((err) => console.error('failed to email message'));
  };

  render() {
    return (
      <div
        className={
          this.props.darkMode ? 'contact-container' : 'contact-container-light'
        }
      >
        <div className="contact-form-container">
          {!this.state.formEmailSent && (
            <form className="contact-form" autoComplete="off">
              <h2 style={{ letterSpacing: '.2em' }}>let's get in touch :)</h2>
              <input
                className="form-input"
                type="text"
                name="name"
                value={this.state.name}
                placeholder="name"
                onChange={(e) => this.handleChange('name', e)}
                style={{
                  color: 'rgba(0,0,0,.6)',
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: '.1em',
                  fontSize: '1.05rem',
                  onFocus: "this.value=''",
                }}
              ></input>
              <input
                className="form-input"
                type="email"
                name="email"
                value={this.state.email}
                placeholder="email"
                onChange={(e) => this.handleChange('email', e)}
                style={{
                  color: 'rgba(0,0,0,.6)',
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: '.1em',
                  fontSize: '1.05rem',
                }}
              ></input>
              <textarea
                className="form-message"
                type="text"
                name="message"
                value={this.state.message}
                placeholder="message"
                onChange={(e) => this.handleChange('message', e)}
                style={{
                  color: 'rgba(0,0,0,.6)',
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: '.1em',
                  fontSize: '1.05rem',
                  overflow: 'auto',
                }}
              ></textarea>
              <input
                className="form-submit"
                type="submit"
                value="send"
                onClick={this.handleSubmit}
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  letterSpacing: '.15em',
                  color: 'rgba(0,0,0,.6)',
                }}
              />
            </form>
          )}
          {this.state.formEmailSent && (
            <div
              className="email-confirm"
              style={{ animation: 'appear .8s ease-in' }}
            >
              <p>Thanks! I'll get back to you as soon as I can</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Contact;
