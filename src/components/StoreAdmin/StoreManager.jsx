import React, { Fragment } from 'react'
import Inventory from '../Inventory/Inventory'
import getFirebase from '../../fire'

let firebase = getFirebase()

const StoreManager = () => {

    return (
        <Fragment>
            <Inventory storeManager={true} />
            <button onClick={() => firebase.auth().signOut()}>Sign out</button>
        </Fragment>
    )
}

export default StoreManager