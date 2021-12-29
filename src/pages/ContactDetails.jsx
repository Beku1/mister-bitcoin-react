import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getContactById } from '../store/actions/contactActions'
import { TransferFund } from '../cmps/TransferFund'
import {Transactions} from '../cmps/Transactions'
import {bitcoinService} from '../services/bitcoin.service'

class _ContactDetails extends Component {
  state = {
    contact: null,
    transfer: null,
    btcToUsd:null
  }


  
  async getUsd(){
    try{
    const rate = await bitcoinService.getRate()
    this.setState({btcToUsd:rate})
    }catch(err){
        console.log('err',err)
    }
   
}

  async componentDidMount() {
    if(!this.props.loggedInUser) this.props.history.push('/signup')
   else {
       this.loadContact()
       this.getUsd()
   }
  }

  onTransfer=()=> {
    this.setState({ transfer: !this.state.transfer })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id)
      this.loadContact()
  }

  async loadContact() {
    let contact = await this.props.getContactById(this.props.match.params.id)
    this.setState({ contact })
  }

  goBack = () => {
    this.props.history.push(`/contact`)
  }

  render() {
    let { contact, transfer ,btcToUsd} = this.state
    let {loggedInUser} = this.props
    if (!contact) return <div>Loading...</div>
   return(
    <section className="contact-details-container">
    {transfer && <TransferFund to={contact} from />}
    {!transfer && (
        <div>
            <div className='link-buttons flex space-between'>
          <Link to={'/contact'} className='details-link link-button'> &#8592;</Link>
          <Link to={`/contact/edit/${contact._id}`} className='details-link edit-link link-button'>Edit</Link>
</div>
          <div className="contact-details">
            <img
              className="profile-img"
              src={`https://robohash.org/set_set5/${contact.name}?size=150x150`}
              alt=""
            />
            <h1> {contact.name}</h1>
            <h3>{contact.phone}</h3>
            <h4>{contact.email}</h4>
          </div>
          {/* <button onClick={this.onTransfer}>Transfer</button> */}
          <div className='contact-transactions flex column'>
              <div className='contact-transfer-modal'>
          <TransferFund to={contact} from />
          </div>
          <Transactions loggedInUser={loggedInUser} contact={contact} btcToUsd={btcToUsd} />
          </div>
        </div>          
      )  
    }  </section>)
  }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
    }
}

const mapDispatchToProps = {
  getContactById,
}

export const ContactDetails = connect(
    mapStateToProps,
  mapDispatchToProps
)(_ContactDetails)
