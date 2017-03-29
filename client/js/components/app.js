import React, { Component } from 'react';
import thunk from 'redux-thunk'
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(actions.getCheck())
  }

  render() {

    console.log(this.props)
    return (
      <h2>{this.props.libraries[0]}</h2>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
  return { libraries: []}
}

export default connect(mapStateToProps)(App);
