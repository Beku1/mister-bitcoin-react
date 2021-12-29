import  { Component } from 'react'
import { ContactList } from '../cmps/ContactList'
import { contactService } from '../services/contact.service.js'
import { ContactFilter } from '../cmps/ContactFilter'
import { loadContacts,removeContact,setFilterBy, } from '../store/actions/contactActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


 class _ContactPage extends Component {

   
    // state={
    //     pagination:1,
    //     maxPage:null
    // }

    async componentDidMount(){
        await this.props.loadContacts()
        // let contactLength = this.props.contacts.length
        // console.log((contactLength/10).toFixed(0))
        // this.setState({maxPage:(contactLength/10).toFixed(0)})
    }

    componentWillUnmount(){
        this.setState({contacts:null})
    }
    
    // changePage=(inc)=>{
        // this.setState({pagination:this.pagination+inc})
    // }


    onChangeFilter = (filterBy) => {
        this.props.setFilterBy(filterBy)
        this.props.loadContacts()
    }



    render() {
        let {contacts} = this.props
        if(!contacts) return <div>Loading...</div>
        return (
            <section className="contacts "> 
            <div className='contacts-header flex space-between'>
                <ContactFilter onChangeFilter={this.onChangeFilter} />
            <Link to='/contact/edit'><div className='add-contact link-button'> + </div></Link>
                </div>
                <ContactList contacts={contacts} />
                {}
               {/* <button>Next Page</button>  */}
               {/* <button>Previous Page</button> */}
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.contactModule.contacts,
    }
}

const mapDispatchToProps={
    loadContacts,
    removeContact,
    setFilterBy
}

export const ContactPage = connect(mapStateToProps,mapDispatchToProps)(_ContactPage)
