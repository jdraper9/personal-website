import React from 'react';
import profPic from './prof_pic.JPG';

import Loader from 'react-loader-spinner';

class About extends React.Component {
  state = {
    picLoaded: false,
  };

  awaitPic = () => {
    setTimeout(() => {
      this.setState({ picLoaded: true });
    }, 2500);
  };

  render() {
    return (
      <div
        className={
          this.props.darkMode ? 'about-container' : 'about-container-light'
        }
      >
        <div className="about-spacer"></div>
        <div style={{ animation: 'appear 1s ease-in' }}>
          <div className="prof-pic-container">
            <img
              style={this.state.picLoaded ? {} : { display: 'none' }}
              alt="avatar"
              src={profPic}
              className="prof-pic"
              onLoad={this.awaitPic}
            />
            <Loader
              style={
                !this.state.picLoaded
                  ? {
                      position: 'relative',
                      top: '31%',
                      left: '49%',
                      transform: 'translate(-50%, 0%)',
                    }
                  : { display: 'none' }
              }
              type="Rings"
              color="white"
              height={70}
              width={70}
            />
          </div>
          <h2>bio</h2>
          <p className="bio">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim ad
            impedit, eos autem sunt nulla aliquid ipsum fuga at quas
            necessitatibus ipsam delectus totam voluptatibus eum quo perferendis
            porro ipsa.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
