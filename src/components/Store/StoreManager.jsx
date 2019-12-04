import React, { Fragment } from 'react'
import Inventory from './Inventory'
import getFirebase from './../../fire'

let firebase = getFirebase()

const StoreManager = () => {

    return (
        <Fragment>
            <Inventory />
            <button onClick={() => firebase.auth().signOut()}>Sign out</button>
            <p>Currently using React Version {React.version}</p>
        </Fragment>
    )
}

export default StoreManager