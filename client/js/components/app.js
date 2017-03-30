import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import CheckInput from './checkInput';
import Header from './header';
import TransactionInput from './transactionInput';
import * as actions from '../../actions/actions';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(actions.getCheck())
    this.props.dispatch(actions.getCheckTerm());
  }

  render() {
    const allRenderedChecks =
         this.props.checks ?
            this.props.checks.checks.map((check, idx) => {
              const checkTerms = this.props.checkTerms ?
                this.props.checkTerms : null

              return (
              <div className="check" key={idx}>
                <p>Check:{check.description}</p>
                <p>Amount:{check.amount}</p>
                <p>DepositedDate:{check.datedeposited}</p>
                <TransactionInput id={check.id} checkId={checkTerms} />
              </div>
              )
            }) : null
    return (
      <div className="app">
        <Header />
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
    checkTerms: state.checkTerms,
  }
}

export default connect(mapStateToProps)(App);
