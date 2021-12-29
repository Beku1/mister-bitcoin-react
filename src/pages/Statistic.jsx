import { Component } from 'react'
import { ChartMarketPrice } from '../cmps/ChartMarketPrice'
import { ChartTransactions } from '../cmps/ChartTransactions'
import { bitcoinService } from '../services/bitcoin.service.js';


export  class Statistic extends Component {


    state={
        transData:null,
        priceData:null
    }

    async componentDidMount(){
        this.setState({transData:await bitcoinService.getTradeVolume(),priceData:await bitcoinService.getMarketPrice()})
        
        // let data = await bitcoinService.getTradeVolume()
        // console.log(data);
        // this.setState({transData:data})
        // let priceData = await bitcoinService.getMarketPrice()
        // let date = transData.values[0].x
        // console.log()

    }


    render() {
        let {transData,priceData} = this.state
        if(!transData) return <div>Loading...</div>
        return (
            <div>
                <div>
<ChartTransactions transData={transData}/>
                </div>
                <div>
<ChartMarketPrice price={priceData}/>
                </div>
            </div>
        )
    }
}
