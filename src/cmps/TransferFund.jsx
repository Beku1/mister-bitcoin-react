import { Component } from 'react';
import { connect } from 'react-redux';
import { addTransactions } from '../store/actions/userActions';
export class _TransferFund extends Component {
  state = {
    coins: '',
  };
  handleChange = ({ target }) => {
    // const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState({ coins: value });
  };
  onTransferFunds = async (ev) => {
    ev.preventDefault();
    const { loggedInUser, to , history } = this.props;
    const { coins } = this.state;
    await this.props.addTransactions(to, coins);
  };
  render() {
    const { to } = this.props;
    const { coins } = this.state;
    return (
      <div className="transfer-fund flex column container">
   
        <form
          onSubmit={this.onTransferFunds}
          className="contact-edit-form flex "
        >
          <input
            type="number"
            value={coins}
            onChange={this.handleChange}
            name="coins"
            id="coins"
            placeholder="Amount..."
          />
          <button>Transfer</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
    addTransactions,
};

export const TransferFund = connect(
  mapStateToProps,
  mapDispatchToProps
)(_TransferFund);