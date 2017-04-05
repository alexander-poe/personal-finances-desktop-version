import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import CheckInput from './checkInput';
import TransactionInput from './transactionInput';
import * as actions from '../../actions/actions';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(actions.getCheck())
    this.props.dispatch(actions.getCheckJoin());
    this.props.dispatch(actions.getCheckTerm());
  }

  render() {
    this.props.checkJoin ?
      console.log(this.props.checkJoin, '18') : null;

    const allRenderedChecks =
         this.props.checkJoin ?
            this.props.checkJoin.checkJoin.map((check, idx) => {
              console.log(check)
              const checkTerms = this.props.checkTerms ?
                this.props.checkTerms : null
              return (
                <div key={idx} className="check">
                  <div className="checkTop">
                    <p>Total: ${check.amount} </p>
                    <p className="right"> Date: {check.datedeposited} </p>
                  </div>
                  <div className="checkMid">
                    <p> 20: ${check.twenty} </p> <br />
                    <p> 30: ${check.thirty} </p> <br />
                    <p> 50: ${check.fifty} </p>  <br />
                  </div>
                  <div className='checkBottom'>
                    <p> description: {check.description}</p>
                    <img className="right checkPhoto" src="http://www.getwordtemplates.com/wp-content/uploads/2016/01/payment-receipt-image-7.jpg" />
                  </div>
                </div>
              )
            }) : null
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
    checkJoin: state.checkJoin,
    checkTerms: state.checkTerms,
  }
}

export default connect(mapStateToProps)(App);
