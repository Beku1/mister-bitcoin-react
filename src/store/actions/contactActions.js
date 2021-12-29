import { contactService } from "../../services/contact.service";

export function loadContacts(){
    return async (dispatch,getState) =>{
        const {filterBy} = getState().contactModule
        try{
            const contacts = await contactService.getContacts(filterBy)
            dispatch({type:'SET_CONTACTS',contacts})
        }catch(err){
            console.log(err)
        }
    }
}

export function removeContact(contactId){
    return async (dispatch) =>{
        try{
            await contactService.deleteContact(contactId)
            dispatch({type:'REMOVE_CONTACT',contactId})
        }catch(err){
            console.log(err)
        }
    }
}

export function saveContact(contact){
    return async (dispatch)=>{
        try{
            let currContact = await contactService.saveContact(contact)
            if(contact._id) dispatch({type:'UPDATE_CONTACT',contact})
            else dispatch({type:'ADD_CONTACT',currContact})
        }catch(err){

        }
    }
}

export function getEmptyContact(){
    return async ()=>{
        try{
            return contactService.getEmptyContact()
        }catch(err){
            console.log(err)
        }
    }
}

export function setFilterBy(filterBy){
    return async (dispatch)=>{
        dispatch({type:'SET_FILTER_BY',filterBy})
    }
}

export function getContactById(contactId){
    return async ()=>{
        return await contactService.getContactById(contactId)
    }
}


// export function 




// async loadContacts(){
//     const { filterBy } = this.state
//     const contacts = await contactService.getContacts(filterBy)
//     this.setState({contacts})
// }