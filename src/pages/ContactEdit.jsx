import { Component , createRef} from 'react'
// import { contactService } from '../services/contact.service.js'
import { connect } from 'react-redux'
import { removeContact,saveContact,getContactById ,getEmptyContact} from '../store/actions/contactActions.js'


 class _ContactEdit extends Component {

    state={
        contact:null,
    }


    inputRef = createRef()
    

    async componentDidMount(){

        // let contact = await this.props.getContactById(this.props.match.params.id)
        const contactId = this.props.match.params.id
        const contact = contactId ? await this.props.getContactById(contactId) : await this.props.getEmptyContact()
        
        this.setState({contact})
    }

    handleChange = ({target})=>{
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState=>({contact:{...prevState.contact,[field]:value}}))
    }


    onSaveContact = async (ev)=>{
        ev.preventDefault()
        // await contactService.saveContact({...this.state.contact})
        await this.props.saveContact({...this.state.contact})
        this.goBack()
    }

    removeContact= async ()=>{
        const {contact}  = this.state
        // await contactService.deleteContact(contact._id)
        await this.props.removeContact(contact._id)
        this.goBack('')
    }

    goBack=(to='contact')=>{
        this.props.history.push(`/${to}`)
    }

    
    render() {
        let { contact } = this.state
        if(!contact) return <div>Loading</div>
        return (
            <div className="contact-edit-container flex column">
                <div className="edit-contact-header-buttons flex space-between ">
               <button className='details-link edit-button link-button'  onClick={contact._id ?()=>this.goBack(`contact/${contact._id}`) : ()=>this.goBack(`contact/`)}>&#8592;</button>
               {contact._id &&  <button className="contact-delete edit-button  link-button" onClick={this.removeContact}>Delete</button>}
               </div>
               <div className="contact-edit flex column">
               <h1> {contact._id ? 'Edit Contact' : 'Add contact'}</h1>
               {contact._id && <img className="profile-img" src={`https://robohash.org/set_set5/${contact.name}?size=150x150`} alt=""/>}
              
                <form onSubmit={this.onSaveContact} className="contact-edit-form" >
                    <label htmlFor="name">Name</label>
                    <input ref={this.inputRef} onChange={this.handleChange} value={contact.name} type="text" name="name" id="name" />
                    <label htmlFor="phone">Phone</label>
                    <input onChange={this.handleChange} placeholder="+xx (xxx) xxx-xxxx" value={contact.phone} type="text" name='phone' id="phone"/>
                    <label htmlFor="email">Email</label>
                    <input onChange={this.handleChange} value={contact.email} type="text" name="email" id="email" />

                    <button className="edit-button link-button" >Save</button>
                </form>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = {
    removeContact,
    saveContact,
    getContactById,
    getEmptyContact
}

export const ContactEdit = connect(undefined,mapDispatchToProps)(_ContactEdit)