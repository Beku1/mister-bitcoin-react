import { ContactPreview } from './ContactPreview'


export function ContactList({contacts}) {

     return (
            <ul className='contact-ul'>
               {contacts.map(contact=>
           <li className='clean-list contact-list flex' key={contact._id}>
            <ContactPreview contact={contact}  />
           </li>
            )}
           </ul>
        )
}
