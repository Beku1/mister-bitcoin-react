import axios from 'axios'
import { storageService } from './storageService.js'


export const  bitcoinService={
    getRate,
    getMarketPrice,
    getTradeVolume
}

async function getRate(){
    try{
    let rate=  await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`)
   return  rate.data
    }catch(err){
        console.log('error',err)
       
    }
  
  
}

async function getMarketPrice() {
    try{
        if(storageService.load('marketPrice')) return storageService.load('marketPrice')
        let res = await axios(
      'https://api.blockchain.info/charts/market-price?timespan=2months&format=json&cors=true'
    );
    storageService.store('marketPrice',res.data)
    
    return res.data;
    }catch(err){
        console.log('Coudlnt get Market price',err)
    }
    
  }

  async function getTradeVolume(){
      try{
          if(storageService.load('tradeVolume')) return storageService.load('tradeVolume')
          let res = await axios(
          'https://api.blockchain.info/charts/trade-volume?timespan=2months&format=json&cors=true'
        )
      storageService.store('tradeVolume',res.data)
      return res.data
      }catch(err){
        console.log('Coudlnt get Trage volume',err)
    }
  }
