import React from 'react';
import '../styling/sass/main.scss';
import SVG from './SVG';
import Float from './Float';
import { floatDetail } from '../constants';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { zoomedOn: null };
  }

  renderFloat = (side) => {
    if (this.state.zoomedOn !== null) {
      let floatInfo = {};
      if (this.state.zoomedOn === 'inner') {
        floatInfo = floatDetail.resourceRepo;
      } else if (this.state.zoomedOn === 'middle') {
        floatInfo = floatDetail.pathfinder;
      } else if (this.state.zoomedOn === 'outer') {
        floatInfo = floatDetail.digiiNote;
      }

      if (side === 'left') {
        return <Float side="left" info={floatInfo.left} />;
      } else if (side === 'right') {
        return <Float side="right" info={floatInfo.right} />;
      }
    } else {
      return null;
    }
  };

  renderTitle = () => {
    if (this.state.zoomedOn !== null) {
      if (this.state.zoomedOn === 'inner') {
        return 'Resource Repository';
      } else if (this.state.zoomedOn === 'middle') {
        return 'Pathfinder Algorithms Visualizer';
      } else if (this.state.zoomedOn === 'outer') {
        return 'digiiNote';
      }
    } else {
      return 'Welcome to James.io';
    }
  };

  getZoomedOn = (dataFromSVG) => {
    console.log(dataFromSVG);
    this.setState({ zoomedOn: dataFromSVG });
  };

  render() {
    return (
      <div>
        <div className="header">
          <h1 className="heading-primary">{this.renderTitle()}</h1>
        </div>

        <main>
          <div className="grid-container">
            <div className="floats col-1-of-3">{this.renderFloat('left')}</div>
            <div className="svg-wrapper col-2-of-3">
              <SVG getZoomedOn={this.getZoomedOn} />
            </div>
            <div className="floats col-1-of-3 right">
              {this.renderFloat('right')}
            </div>
          </div>
        </main>

        {/* <footer>this is a footer</footer> */}
      </div>
    );
  }
}

export default App;
