
import { storageService } from "./storageService";
import { userService } from "./user.service";

export const contactService = {
  getContacts,
  getContactById,
  deleteContact,
  saveContact,
  getEmptyContact,
  getUser
}

const STORAGE_KEY = 'contacts'



const defContacts = [
  {
    "_id": "5a56640269f443a5d64b32ca",
    "name": "Ochoa Hyde",
    "email": "ochoahyde@renovize.com",
    "phone": "+1 (968) 593-3824",
    "coins": "40",
    "transactions":[]
  },
  {
    "_id": "5a5664025f6ae9aa24a99fde",
    "name": "Hallie Mclean",
    "email": "halliemclean@renovize.com",
    "phone": "+1 (948) 464-2888",
    "coins": "60",
    "transactions":[]
  },
  {
    "_id": "5a56640252d6acddd183d319",
    "name": "Parsons Norris",
    "email": "parsonsnorris@renovize.com",
    "phone": "+1 (958) 502-3495",
    "coins": "178",
    "transactions":[]
  },
  {
    "_id": "5a566402ed1cf349f0b47b4d",
    "name": "Rachel Lowe",
    "email": "rachellowe@renovize.com",
    "phone": "+1 (911) 475-2312",
    "coins": "122",
    "transactions":[]
  },
  {
    "_id": "5a566402abce24c6bfe4699d",
    "name": "Dominique Soto",
    "email": "dominiquesoto@renovize.com",
    "phone": "+1 (807) 551-3258",
    "coins": "33",
    "transactions":[]
  },
  {
    "_id": "5a566402a6499c1d4da9220a",
    "name": "Shana Pope",
    "email": "shanapope@renovize.com",
    "phone": "+1 (970) 527-3082",
    "coins": "123",
    "transactions":[]
  },
  {
    "_id": "5a566402f90ae30e97f990db",
    "name": "Faulkner Flores",
    "email": "faulknerflores@renovize.com",
    "phone": "+1 (952) 501-2678",
    "coins": "444",
    "transactions":[]
  },
  {
    "_id": "5a5664027bae84ef280ffbdf",
    "name": "Holder Bean",
    "email": "holderbean@renovize.com",
    "phone": "+1 (989) 503-2663",
    "coins": "56",
    "transactions":[]
  },
  {
    "_id": "5a566402e3b846c5f6aec652",
    "name": "Rosanne Shelton",
    "email": "rosanneshelton@renovize.com",
    "phone": "+1 (968) 454-3851",
    "coins": "45",
    "transactions":[]
  },
  {
    "_id": "5a56640272c7dcdf59c3d411",
    "name": "Pamela Nolan",
    "email": "pamelanolan@renovize.com",
    "phone": "+1 (986) 545-2166",
    "coins": "12",
    "transactions":[]
  },
  {
    "_id": "5a5664029a8dd82a6178b15f",
    "name": "Roy Cantu",
    "email": "roycantu@renovize.com",
    "phone": "+1 (929) 571-2295",
    "coins": "22",
    "transactions":[]
  },
  {
    "_id": "5a5664028c096d08eeb13a8a",
    "name": "Ollie Christian",
    "email": "olliechristian@renovize.com",
    "phone": "+1 (977) 419-3550",
    "coins": "1234",
    "transactions":[]
  },
  {
    "_id": "5a5664026c53582bb9ebe9d1",
    "name": "Nguyen Walls",
    "email": "nguyenwalls@renovize.com",
    "phone": "+1 (963) 471-3181",
    "coins": "1000",
    "transactions":[]
  },
  {
    "_id": "5a56640298ab77236845b82b",
    "name": "Glenna Santana",
    "email": "glennasantana@renovize.com",
    "phone": "+1 (860) 467-2376",
    "coins": "555",
    "transactions":[]
  },
  {
    "_id": "5a56640208fba3e8ecb97305",
    "name": "Malone Clark",
    "email": "maloneclark@renovize.com",
    "phone": "+1 (818) 565-2557",
    "coins": "40",
    "transactions":[]
  },
  {
    "_id": "5a566402abb3146207bc4ec5",
    "name": "Floyd Rutledge",
    "email": "floydrutledge@renovize.com",
    "phone": "+1 (807) 597-3629",
    "coins": "69",
    "transactions":[]
  },
  {
    "_id": "5a56640298500fead8cb1ee5",
    "name": "Grace James",
    "email": "gracejames@renovize.com",
    "phone": "+1 (959) 525-2529",
    "coins": "222",
    "transactions":[]
  },
  {
    "_id": "5a56640243427b8f8445231e",
    "name": "Tanner Gates",
    "email": "tannergates@renovize.com",
    "phone": "+1 (978) 591-2291",
    "coins": "108",
    "transactions":[]
  },
  {
    "_id": "5a5664025c3abdad6f5e098c",
    "name": "Lilly Conner",
    "email": "lillyconner@renovize.com",
    "phone": "+1 (842) 587-3812",
    "coins": "200",
    "transactions":[]
  },{
    "_id": "1a1111c1abdad1f1e11c",
    "name": "Ilya Cohen",
    "email": "IlyaCohen@gmail.com",
    "phone": "+972 (54) 088-0112 ",
    "coins": "299",
    "transactions":[]
  }
];

let contacts = _loadContacts()

function sort(arr) {
  return arr.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1;
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    }

    return 0;
  })
}

function getContacts(filterBy = null) {
  return new Promise((resolve, reject) => {
    const loggedInUser = userService.getLoggedInUser()
    let contactsToReturn 
    if(loggedInUser) contactsToReturn = contacts.filter((contact)=>contact._id!==loggedInUser._id)
    else contactsToReturn = contacts
    if (filterBy && filterBy.term) {
      contactsToReturn = filter(filterBy.term)
    }
    resolve(sort(contactsToReturn))
  })
}

function getContactById(id) {
  return new Promise((resolve, reject) => {
    
  
    const contact = contacts.find(contact => contact._id === id)
    contact ? resolve(contact) : reject(`Contact id ${id} not found!`)
  })
}

function deleteContact(id) {
  return new Promise((resolve, reject) => {
    const index = contacts.findIndex(contact => contact._id === id)
    if (index !== -1) {
      contacts.splice(index, 1)
    }
    storageService.store(STORAGE_KEY,contacts)
    resolve(contacts)
  })
}

function _updateContact(contact) {
  return new Promise((resolve, reject) => {
    const index = contacts.findIndex(c => contact._id === c._id)
    if (index !== -1) {
      contacts[index] = contact
    }
    storageService.store(STORAGE_KEY,contacts)
    resolve(contact)
  })
}

function _addContact(contact) {
  return new Promise((resolve, reject) => {
    contact._id = _makeId()
    contacts.push(contact)
    storageService.store(STORAGE_KEY,contacts)
    resolve(contact)
  })
}

async function  getUser(){
 return await getContactById('1a1111c1abdad1f1e11c')
}

function saveContact(contact) {
  return contact._id ? _updateContact(contact) : _addContact(contact)
}

function getEmptyContact() {
  return {
    name: '',
    email: '',
    phone: ''
  }
}

function filter(term) {
  
  term = term.toLocaleLowerCase()
  return contacts.filter(contact => {
    return contact.name.toLocaleLowerCase().includes(term) ||
      contact.phone.toLocaleLowerCase().includes(term) ||
      contact.email.toLocaleLowerCase().includes(term)
  })
}


function _loadContacts(){
if(storageService.load(STORAGE_KEY) && storageService.load(STORAGE_KEY).length>0 ) return storageService.load(STORAGE_KEY)
else return defContacts
}


function _makeId(length = 10) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}


