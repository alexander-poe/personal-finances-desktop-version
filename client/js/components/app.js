import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import CheckInput from './checkInput';
import CheckFront from './checkFront';
import TransactionInput from './transactionInput';
import Header from './header'
import * as actions from '../../actions/actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: false,
      switchClass: false
    }
    this.toggleInput = this.toggleInput.bind(this);
    this.switcher = this.switcher.bind(this);
    this.deleteCheck = this.deleteCheck.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.getTransactions());
    this.props.dispatch(actions.getCheck())
    this.props.dispatch(actions.getCheckJoin());
    this.props.dispatch(actions.getCheckTerm());
  }

  deleteCheck() {
    this.props.dispatch(actions.deleteCheck())
  }

  switcher() {
    this.setState({switchClass: !this.state.switchClass})
  }

  toggleInput() {
    this.setState({input: !this.state.input})
  }
  render() {
    let total = 0;
    let total20 = 0;
    let total30 = 0;
    let total50 = 0;
    const totalAccounts = this.props.checkTerms ?
      this.props.checkTerms.checkTerms.map((amount, idx) => {
        total += amount.twenty + amount.thirty + amount.fifty
        total20 += amount.twenty;
        total30 += amount.thirty;
        total50 += amount.fifty;
      })
      : null;
    const switchStatus = this.state.switchClass ? 'flip-container-switch' : null;
    const allRenderedChecks =
         this.props.checkJoin ?
            this.props.checkJoin.checkJoin.map((check, idx) => {
              console.log(check.datedeposited)
              if (!check.deleted) {
                return (
                  <div
                    key={idx}
                    id="flip-container"
                    className={switchStatus}
                  >
                  	<div className="flipper">
                  		<div className="front">
                        <div key={idx} id="card">
                          <CheckFront
                            index={check.idx}
                            amount={check.amount}
                            date={check.datedeposited}
                            description={check.description}
                            twenty={check.twenty}
                            thirty={check.thirty}
                            fifty={check.fifty}
                          />
                        </div>
                  		</div>
                  		<div className="back">
                        <div key={idx} id="card">
                          <div key={idx} className="check" id="noPad">
                            <div className="form">
                              <table>
                                <tbody>
                                  <tr>
                                    <th>Date</th>
                                    <th>Account</th>
                                    <th>Transaction</th>
                                    <th>Description</th>
                                  </tr>
                                  {
                                  this.props.termTransactions ?
                                      this.props.termTransactions
                                      .termTransactions.map((trans, idx) => {
                                        if (trans.checktermid === check.id) {
                                          return (
                                          <tr key={idx}>
                                            <td className="dateCol">{new Date(trans.transactiondate).toLocaleDateString()}</td>
                                            <td>{trans.account}</td>
                                            <td>-{trans.transaction}</td>
                                            <td>{trans.description}</td>
                                          </tr>
                                          )
                                        }
                                      })
                                      : null
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                  		</div>
                  	</div>
                  </div>
                )
              }
            }) : null;
    return (
      <div>
        <Header
          checkToggle={this.toggleInput}
          switchClick={this.switcher}
        />
        {this.state.input ? <CheckInput /> : null}
        <div className="checkContainer">
          {allRenderedChecks}
        </div>
        <div className="footer">
          <p>Total Amount: {total}</p>
          <p>Savings[20]: {total20}</p>
          <p>Spendings[30]: {total30}</p>
          <p>Essentials[50]: {total50}</p>
        </div>
        <div className="footerDescription">
          
        </div>
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
    termTransactions: state.termTransactions
  }
}

export default connect(mapStateToProps)(App);
