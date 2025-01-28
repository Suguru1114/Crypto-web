import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import add_user from '../../assets/add_user.png'
import { CoinContext } from '../../context/CoinContext'

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext)
  
  const currecyHandler = (event)=>{
    switch (event.target.value){
      case "aud": {
        setCurrency({name: "aud", symbol: "$"});
        break;
      }case "eur": {
        setCurrency({name: "eur", symbol: "€"});
        break;
      }
        case "jpy": {
          setCurrency({jpy: "eur", symbol: "¥"});
          break;
      }  
      default:{
          setCurrency({name: "aud", symbol: "$"});
          break;
      }
    }
  }

  return (
    <div className='navbar'>
        <img src={logo} alt="Logo" className='logo'/>
        <ul>
            <li>Home</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>

        </ul>

        <div className="nav-right">
            <select onChange={currecyHandler}>
        {/* 6;38 */}
                <option value="aud">AUD</option>
                <option value="eur">EUR</option>
                <option value="jpy">JPY</option>

            </select>
            <button>Sign up <img src={add_user} art="" /></button>
        </div>
    </div>
  )
}

export default Navbar
