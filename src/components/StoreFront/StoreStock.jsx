import React, { Fragment } from 'react'
import getFirebase from '../../fire'
import Inventory from '../Inventory'
let firebase = getFirebase()

const StoreStock = () => {

    return (
      <Fragment>
        <Inventory />
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </Fragment>
    );
}

export default StoreStock
