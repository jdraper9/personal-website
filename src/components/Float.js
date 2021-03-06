import React from 'react';

class Float extends React.Component {
  componentWillUnmount() {
    this.props.updatePageCallback();
  }

  render() {
    if (this.props.selected !== null) {
      if (this.props.side === 'left') {
        const stackItems = this.props.info.stack.map((stack, i) => (
          <li className="list-item" key={i}>
            {stack}
          </li>
        ));

        return (
          <div className="in-float">
            <h2>About</h2>
            <p
              className="u-margin-bottom-big list-item"
              style={{ paddingLeft: '6px' }}
            >
              {this.props.info.about}
            </p>
            <h2>Tech Stack</h2>
            <ul style={{ paddingLeft: '6px' }} className="lists">
              {stackItems}
            </ul>
          </div>
        );
      } else if (this.props.side === 'right') {
        const topicItems = this.props.info.topics.map((topic, i) => (
          <li className="list-item" key={i}>
            {topic}
          </li>
        ));
        return (
          <div className="in-float">
            <h2>Topics</h2>
            <ul
              className="lists u-margin-bottom-medium"
              style={{ paddingRight: '7px' }}
            >
              {topicItems}
            </ul>
            <h2>Code</h2>
            <a
              className={
                this.props.darkMode
                  ? 'link u-margin-bottom-medium list-item'
                  : 'link-light u-margin-bottom-medium list-item'
              }
              style={{ paddingRight: '9px' }}
              href={this.props.info.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              &#8627; Github
            </a>
            <h2>To visit</h2>
            <p className="list-item" style={{ paddingRight: '7px' }}>
              Click on the 'planet'
            </p>
          </div>
        );
      }
    } else {
      return <div></div>;
    }
  }
}

export default Float;
