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
      <Fragment>
        <div className="header">
          <h1>Hire EZ</h1>
        </div>
        {isStoreManager ? <StoreManager /> : <StoreStock />}
        <p style={{textAlign: "center"}}>Currently using React Version {React.version}</p>
      </Fragment>
    );
}


export default Home