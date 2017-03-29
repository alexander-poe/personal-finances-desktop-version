import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import CheckInput from './checkInput';
import * as actions from '../../actions/actions';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(actions.getCheck())
  }

  render() {
    const allRenderedChecks =
         this.props.checks ?
            this.props.checks.checks.map((check, idx) => {
              console.log(check.description)
              return (
              <div key={idx}>
                <p>Check:{check.description}</p>
                <p>Amount:{check.amount}</p>
                <p>DepositedDate:{check.datedeposited}</p>
              </div>
              )
            }) : null
            console.log('here', allRenderedChecks)
    return (
      <div>
        <CheckInput />
        {allRenderedChecks}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    libraries: [],
    checks: state.checks,
  }
}

export default connect(mapStateToProps)(App);
