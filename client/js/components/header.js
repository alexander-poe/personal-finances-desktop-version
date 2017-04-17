import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="header">
          <div
            onClick={this.props.checkToggle}
            className="switchParent"
          >
            <img src="./assets/plus-symbol.png" className="plusIcon" />
            <p className="addCheckToggle">
              add check
            </p>
          </div>
          <div
            onClick={this.props.switchClick}
            className="switchParent">
            <img src="./assets/light-bolt.png" className="switchIcon"/>
            <p className="addCheckToggle">
              toggle
            </p>
          </div>
          <div className="logo">
            <img src="./assets/logo.png" />
          </div>
        </div>
    )
  }
}

export default Header;
