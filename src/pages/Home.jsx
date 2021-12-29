import { Component } from "react"
import { connect } from 'react-redux'
import { bitcoinService } from "../services/bitcoin.service.js"
import {Transactions} from '../cmps/Transactions'
import { Link } from 'react-router-dom'


 class _Home extends Component {

    state = {
        btcToUsd:null
    }

    async componentDidMount(){
        // if(!this.props.loggedInUser) this.props.history.push('/signup')
         this.getUsd()
    }

    async getUsd(){
        try{
        const usd = await bitcoinService.getRate()
        this.setState({btcToUsd:usd})
        }catch(err){
            console.log('err',err)
        }
       
    }

    render(){
        const {btcToUsd } = this.state
        const {loggedInUser} = this.props
        console.log(loggedInUser)
        if(!loggedInUser) return <h1>Welcome Guest,  <Link to='/signup'> Signup to use the app. </Link></h1>
        return (
            <section className="home container">
                <header><h1>Hello, {loggedInUser.name}</h1></header>
                <div className="home-info flex space-between">
                <div><p className="user-balance-header">Current Balance</p>
                <p >Bitcoins: <span className="user-bitcoin">&#8383; {loggedInUser.coins}</span> </p>
                <p>USD: <span className="user-usd"> {((loggedInUser.coins/btcToUsd)).toLocaleString("en-GB")} $ </span></p>
                </div>
                <div className="btc-to-usd">
                 <p className="btc-to-usd-header">Current BTC USD</p>
                 <h2 className="">{(1/btcToUsd).toLocaleString("en-GB")} $</h2>
              
                 </div>

                </div>
                <div className="home-transactions"> 
                    <Transactions loggedInUser={loggedInUser} btcToUsd={btcToUsd} />
                </div>
               
            </section>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
    }
}


export const Home = connect(mapStateToProps)(_Home)