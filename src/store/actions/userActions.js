
import { contactService } from "../../services/contact.service";
import { userService } from "../../services/user.service";
import { saveContact } from "./contactActions";




export function addTransactions(contact,amount){
    return async (dispatch,getState)=>{
        try{
         let transaction =  await userService.addTransactions(contact,amount)
         dispatch({type:'UPDATE_CONTACT',contact:transaction.contact})
         dispatch({type:'SET_LOGGEDIN_USER',loggedInUser:transaction.user})
        //  saveContact(contact)
        //  saveContact(currUser)
        }catch(err){
            console.log(err)
        }
    }
}

export  function login(userName){
    return async (dispatch)=>{
      let user = await userService.login(userName)
      console.log(user)
    dispatch({type:'SET_LOGGEDIN_USER',loggedInUser:user})
    }
}

export function signout(){
    return async (dispatch)=>{
        await userService.signout()
        dispatch({type:'SIGN_OUT'})
    }
}

export function signup(currUser){
    return async (dispatch)=>{
       let user = await userService.signup(currUser)
       dispatch({type:'SET_LOGGEDIN_USER',loggedInUser:user})
    }
   
}


export function setLoggedInUser(){
    return async (dispatch)=>{
        let loggedInUser = await userService.getLoggedInUser()
        dispatch({type:'SET_LOGGEDIN_USER',loggedInUser})
    }
}