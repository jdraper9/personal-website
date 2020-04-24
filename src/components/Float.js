import React from 'react';

function Float(props) {
  if (props.side === 'left') {
    const stackItems = props.info.stack.map((stack) => <li>{stack}</li>);

    return (
      <div className="in-float">
        <h2> About</h2>
        <p className="u-margin-bottom-big">{props.info.about}</p>
        <h2>Tech Stack</h2>
        <ul className="lists">{stackItems}</ul>
      </div>
    );
  } else if (props.side === 'right') {
    const topicItems = props.info.topics.map((topic) => <li>{topic}</li>);
    return (
      <div className="in-float">
        <h2>Topics</h2>
        <ul className="lists u-margin-bottom-medium">{topicItems}</ul>
        <h2>Code</h2>
        <a className="link u-margin-bottom-medium" href={props.info.github}>
          Github
        </a>
        <h2>To visit</h2>
        <p>Click on the 'planet'</p>
      </div>
    );
  }
}

export default Float;
