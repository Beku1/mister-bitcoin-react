
import { Link } from 'react-router-dom'

export function ContactPreview({contact}){

        return (
          <section className="contact-preview-container">
            <Link to={`/contact/${contact._id}`} className='link-preview'>
            <div className="contact-preview-container flex">
              <img className="profile-preview" src={`https://robohash.org/set_set5/${contact.name}?size=150x150`} alt=""/>
              <div className='profile-info flex'>
              <p className='contact-name'>{contact.name}</p>
              <p className='contact-email'>{contact.email}</p>
              </div>
            </div>
            </Link>
            </section>
        )
}

