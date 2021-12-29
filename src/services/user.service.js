import { storageService } from './storageService'
import { contactService } from './contact.service'


export const userService = {
  signup,
  addTransactions,
  signout,
  login,
  getLoggedInUser,
}

function getLoggedInUser() {
  return storageService.load('loggedInUser')
}

async function login(userName) {
  const contacts = await contactService.getContacts()
  let currUser = contacts.find((contact) => contact.name.toLowerCase() === userName.toLowerCase())
  if (currUser) {
      storageService.store('loggedInUser', currUser)
      return currUser
    }
  else throw new Error('Invalid user')
}

async function signout() {
  return storageService.store('loggedInUser',null)
}

async function signup(user) {
  const contacts = await contactService.getContacts()
  if (contacts.some((contact) => contact.name.toLowerCase() === user.name.toLowerCase()))
    throw new Error('Name Taken')
  else if (contacts.some((contact) => contact.email === user.email))
    throw new Error('Email Taken')
  else {
    let currUser = await contactService.saveContact(user)
    storageService.store('loggedInUser', currUser)
   return currUser
  }
}

async function addTransactions(contact,amount) {
    let user = await getLoggedInUser()
    if(user.coins<amount || !amount) throw new Error('Not Enough Coins')
    user.transactions.push({toId:contact._id,to:contact.name,at:Date.now(),amount})
    user.coins -= amount
    contact.coins += amount
    await contactService.saveContact(user)
    await contactService.saveContact(contact)
    storageService.store('loggedInUser',user)
    return {user,contact}
}
