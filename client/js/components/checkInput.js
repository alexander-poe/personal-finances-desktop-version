import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions'

class CheckInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '000',
      description: 'Intel',
      upload: 'photo',
      reoccuring: false
    }
    this.sendCheck = this.sendCheck.bind(this);
    this._amount = this._amount.bind(this);
    this._description = this._description.bind(this);
    this._upload = this._upload.bind(this);
    this._reoccuring = this._reoccuring.bind(this);
  }

  _amount(e) {
    this.setState({amount: e.target.value})
  }

  _description(e) {
    this.setState({description: e.target.value})
  }

  _upload(e) {
    this.setState({upload: e.target.value})
  }

  _reoccuring(e) {
    if (e.target.value === 'on') {
      this.setState({reoccuring: true})
    }
  }

  sendCheck(e) {
    e.preventDefault();
    this.props.dispatch(actions.addCheck(this.state.amount, this.state.description, 'photo.png', true))
    setTimeout(() => {this.props.dispatch(actions.getCheck())}, 3000);
  }
  render() {
    return (
      <div className="checkInput">
        <form>
          amount: <input
            type="text"
            onChange={this._amount}
            placeholder="$5000"
          />
          <br/>
          description: <input
            type="text"
            onChange={this._description}
            placeholder="Intel"
          />
          <br/>
          upload: <input
            onChange={this._upload}
            type="file"
          />
          <br/>
          reoccuring: <input
            onChange={this._reoccuring}
            type="checkbox"
          />
          <input
            type="submit"
            onClick={this.sendCheck}
          />
        </form>
      </div>
    )
  }
}

export default connect()(CheckInput);
