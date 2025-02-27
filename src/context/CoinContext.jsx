import { createContext, useEffect, useState } from "react"

export const CoinContext = createContext();

const CoinContextProvider = (props) =>{

        const[allCoin, setAllCoin] = useState([]);
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
              
              fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
                .then(res => res.json())
                .then(res => setAllCoin(res))  
                // (response  > res))
                .catch(err => console.error(err));

        }

    useEffect(()=>{
        fetchAllCoin();

    }, [currency])
    
    
        const contextValue = {
            allCoin, currency, setCurrency

        }
            return (
                <CoinContext.Provider value={contextValue}>
                 {props.children}
                </CoinContext.Provider>
            )    

}

export default CoinContextProvider;