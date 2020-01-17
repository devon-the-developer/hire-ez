import React, { Fragment, useState, useEffect } from 'react'
// import './Home.css'
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
        {isStoreManager ? <StoreManager /> : <StoreStock />}
        <div className="width-full bg-teal-900 p-4">
        <p className="width-full text-center text-teal-100">Currently using React Version {React.version}</p>
        </div>
      </Fragment>
    );
}


export default Home