import React, { Component } from 'react';
import thunk from 'redux-thunk';
import { connect } from 'react-redux';
import CheckInput from './checkInput';
import CheckFront from './checkFront';
import TransactionInput from './transactionInput';
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
  }

  componentDidMount() {
    this.props.dispatch(actions.getCheck())
    this.props.dispatch(actions.getCheckJoin());
    this.props.dispatch(actions.getCheckTerm());
  }

  switcher() {
    this.setState({switchClass: !this.state.switchClass})
  }

  toggleInput() {
    this.setState({input: !this.state.input})
  }

  render() {
    const switchStatus = this.state.switchClass ? 'flip-container-switch' : null;
    const allRenderedChecks =
         this.props.checkJoin ?
            this.props.checkJoin.checkJoin.map((check, idx) => {
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
                        <div key={idx} className="check">
                          <TransactionInput id={check.id} />
                        </div>
                      </div>
                		</div>
                	</div>
                </div>
              )
            }) : null
    return (
      <div>
        <p
          onClick={this.toggleInput}
          className="addCheckToggle"
        >
          +
        </p>
        <p
          onClick={this.switcher}
          className="addCheckToggle"
        >
          /
        </p>
        {this.state.input ? <CheckInput /> : null}
        <div className="checkContainer">
          {allRenderedChecks}
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
  }
}

export default connect(mapStateToProps)(App);
