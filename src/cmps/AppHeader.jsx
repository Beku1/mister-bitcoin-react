import { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'


class _AppHeader extends Component {
  render() {
      let {loggedInUser} = this.props
    return (
      <header className="flex space-between">
        <NavLink to="/" ><div className="flex header-title"><img src={require('../assets/imgs/logo.png')} alt=""/><h1 className="logo">Mister-BitCoin </h1></div></NavLink>
        <div className="navbar flex space-between">
            
          <NavLink to="/"><p className=" header-title">Home</p></NavLink>
          <NavLink to="/contact"><p className=" header-title">Contacts</p></NavLink>
          <NavLink to="/statistic"><p className=" header-title">Statistic</p></NavLink>
          <NavLink to="/signup"><p className="header-title">{loggedInUser ? 'Logout' : 'Signup'}</p></NavLink>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  }
}

export const AppHeader = connect(mapStateToProps)(_AppHeader)
