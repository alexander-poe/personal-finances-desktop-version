import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions'

class TransactionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      account: '20',
      transaction: 0,
      description: 'Intel',
      upload: 'photo',
    }
    this._sendTransaction = this._sendTransaction.bind(this);
    this._account = this._account.bind(this);
    this._transaction = this._transaction.bind(this);
    this._description = this._description.bind(this);
    this._upload = this._upload.bind(this);
  }

  _account(e) {
    this.setState({account: e.target.value})
  }

  _transaction(e) {
    this.setState({transaction: e.target.value})
  }

  _description(e) {
    this.setState({description: e.target.value})
  }

  _upload(e) {
    console.log(this.props.checkId.checkTerms, this.props.id)
    this.setState({upload: e.target.value})
  }

  _sendTransaction(e) {
    e.preventDefault();
    console.log(this.props.checkId, this.props.checkId.checkTerms[1].id)
    let checkId = 0;
    for (let i = 0; i < this.props.checkId.checkTerms.length; i++) {
      if (this.props.id === this.props.checkId.checkTerms[i].checkid) {
        checkId = this.props.checkId.checkTerms[i].id;
        console.log(this.props.checkId.checkTerms[i].id, '45')
        console.log('checkid is ', i ,' got it')
      }
    }
    console.log(checkId)
    this.props.dispatch(actions.addTermTransaction(checkId, this.state.account, this.state.transaction, this.state.description, this.state.photo))
  }

  render() {
    return (
      <div className="transactionInput">
        <form>
          accout: <input
            type="text"
            onChange={this._account}
            placeholder="twenty"
          />
          <br/>
          transaction: <input
            type="text"
            placeholder="$2000"
            onChange={this._transaction}
          />
          <br/>
          description: <input
            type="text"
            onChange={this._description}
            placeholder="Hot Cakes"
          />
          <br/>
          upload: <input
            onChange={this._upload}
            type="file"
          />
          <br/>
          <input
            type="submit"
            onClick={this._sendTransaction}
          />
        </form>
      </div>
    )
  }
}

export default connect()(TransactionInput);
