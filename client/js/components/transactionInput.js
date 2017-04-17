import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions'

class TransactionInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      account: 'twenty',
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
    let lwrcase = e.target.value.toLowerCase();
    this.setState({account: lwrcase})
  }

  _transaction(e) {
    this.setState({transaction: e.target.value})
  }

  _description(e) {
    this.setState({description: e.target.value})
  }

  _upload(e) {
    this.setState({upload: e.target.value})
  }

  _sendTransaction(e) {
    e.preventDefault();
    this.props.dispatch(actions.addTermTransaction(this.props.checkid, this.state.account, this.state.transaction, this.state.description, this.state.photo))
  }

  render() {
    console.log(this.props.checkid, 'checkid')
    return (
      <div className={this.props.className}>
        add transaction
        <form>
          account: <select
            onChange={this._account}
            placeholder="twenty"
            >
            <option value="twenty">twenty</option>
            <option value="thirty">thirty</option>
            <option value="fifty">fifty</option>
          </select>
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


const mapStateToProps = state => {
  return {
    checkTerms: state.checkTerms
  }
}

export default connect(mapStateToProps)(TransactionInput);
