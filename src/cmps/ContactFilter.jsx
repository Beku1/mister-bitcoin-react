import  { Component } from 'react'

export class ContactFilter extends Component {


    state={
        term:'',
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value 
        this.setState({ [field]: value }, () => {
            this.props.onChangeFilter(this.state)
        })
    }

    render() {
        const {term} = this.state
        return (
            <form className='contact-filter' autoComplete="off" >
                <section className='input-container'>
                    {/* <label htmlFor="term">Search</label> */}
                    <input onChange={this.handleChange} value={term} placeholder='Search' type="text" name="term" id="term" />
                </section>    
           </form>
        )
    }
}
