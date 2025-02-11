import React, { useEffect, useState, useContext } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

function Coin() {

  const {coinId} = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const {currency} = useContext(CoinContext);

  const fetchCoinData = async ()=>{
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
    }

    const fetchHistoricalData = async ()=>{
      const options = {method: 'GET', headers: {accept: 'application/json'}};

      fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
        .then(res => res.json())
        .then(res => setHistoricalData(res))
        .catch(err => console.error(err));

    }

    useEffect(()=>{
      fetchCoinData();
      fetchHistoricalData();
     },[currency])

if(coinData&&historicalData){
  return (
    <div className='coin'>
      <div className='coin-name'>
        <img src={coinData.image?.large} alt=" "/>
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
        <LineChart historicalData={historicalData}/>

    <div className="coin-info">
      <ul>
        <li>Crypto Market Rank</li>
        <li>{coinData.market_cap_rank}</li>
      </ul>
      <ul>
        <li>Current Price</li>
        <li>
        {currency.symbol} {coinData.market_data?.current_price?.[currency.name]?.toLocaleString() || "N/A"}
        </li>
      </ul>
      <ul>
        <li>24 Hour high</li>
        <li>
        {currency.symbol} {coinData.market_data?.high_24h?.[currency.name]?.toLocaleString() || "N/A"}
        </li>
      </ul>
      <ul>
        <li>24 Hour low</li>
        <li>
        {currency.symbol} {coinData.market_data?.low_24h?.[currency.name]?.toLocaleString() || "N/A"}
        </li>
      </ul>

    </div>


    </div>
   )
}else{
  return (
    <div className='spinner'>
      <div className='spin'></div>

    </div>
   ) 
  }  
}

export default Coin
