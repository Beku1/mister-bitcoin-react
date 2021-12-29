import React from 'react'
import './assets/scss/global.scss'
import { AppHeader } from './cmps/AppHeader'
import { Statistic } from './pages/Statistic'
import { ContactPage } from './pages/ContactPage'
import { Home } from './pages/Home'
import {ContactDetails} from './pages/ContactDetails'
import { ContactEdit } from './pages/ContactEdit'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { connect } from 'react-redux'
import { Signup } from './pages/Signup'
import { setLoggedInUser } from './store/actions/userActions'

class _App extends React.Component {

    componentDidMount(){
      this.props.setLoggedInUser()
    }

  render() {
    return (
      <Router>
        <div>
          <AppHeader />
          <main>
            <Switch>       
              <Route component={Signup} path='/signup'/>
              <Route component={Statistic} path='/statistic' />
              <Route component={ContactEdit} path='/contact/edit/:id?'/>
              <Route component={ContactDetails} path="/contact/:id"/>
              <Route component={ContactPage} path='/contact' /> 
              <Route component={Home} path='/' />
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}


const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  setLoggedInUser,
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);

