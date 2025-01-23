import { createContext, useState } from "react"

export const CoinContext = createContext();

const CoinContextProvider = (props) =>{

        const[allcoin, setAllCoin] = useState([]);
        const[currency, setCurrency] = useState({
            name : "aud",
            symbol: "$"
        })

        const fetchAllCoin = async() =>{
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  'x-cg-demo-api-key': 'CG-CW31D1RBcGpgVji15keqgvkL	'
                }
              };
              
              fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud', options)
                .then(res => res.json())
                .then(res => setAllCoin(response))
                .catch(err => console.error(err));

        }

        const contextValue = {

        }
            return (
                <CoinContext.Provider value={contextValue}>
                 {props.children}
                </CoinContext.Provider>
            )    

}

export default CoinContextProvider;