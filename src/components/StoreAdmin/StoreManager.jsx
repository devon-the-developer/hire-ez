import React, { Fragment } from 'react'
import Inventory from './Inventory'
import getFirebase from '../../fire'

let firebase = getFirebase()

const StoreManager = () => {

    return (
        <Fragment>
            <Inventory />
            <button onClick={() => firebase.auth().signOut()}>Sign out</button>
        </Fragment>
    )
}

export default StoreManager