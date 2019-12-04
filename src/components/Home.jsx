import React, { Fragment, useState, useEffect } from 'react'
import './Home.css'
import StoreManager from './StoreAdmin/StoreManager'
import StoreStock from './StoreFront/StoreStock'
import { isUserStoreManager } from '../logic/database/DBHandler'

const Home = () => {
    let [isStoreManager, setIsStoreManager] = useState(false)

    useEffect(() => {
        let isSubscribed = true
        let checkIfManager = async() => {
            let isManager = await isUserStoreManager()
            console.log({isManager})
            if(isSubscribed) {
                setIsStoreManager(isManager)
            }
        }
        checkIfManager()
        
        return () => isSubscribed = false
    }, [])

    return (
      <div style={{ margin: "50px" }}>
        <h1>Home</h1>
        <h2>Store Inventory:</h2>
        <br />
        {isStoreManager ? <StoreManager /> : <StoreStock />}
      </div>
    );
}


export default Home