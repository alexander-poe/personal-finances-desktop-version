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
              const checkTerms = this.props.checkTerms ?
                this.props.checkTerms : null

              return (
                <div className="check">
                  <div className="checkTop">
                    <p>Total: $1000 </p>
                    <p className="right"> Date: 11/11/1111 </p>
                  </div>
                  <div className="checkMid">
                    <p> twenty: $200 </p>
                    <p> thirty: $300 </p>
                    <p> fifty: $500 </p>
                  </div>
                  <div className='checkBottom'>
                    <p> description: for some shhh</p>
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
