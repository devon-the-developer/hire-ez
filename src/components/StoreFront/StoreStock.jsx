import React, { Fragment } from 'react'
import getFirebase from '../../fire'
import Inventory from '../Inventory'
let firebase = getFirebase()

const StoreStock = () => {

    return (
      <Fragment>
        <Inventory storeManager={false} />
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
      </Fragment>
    );
}

export default StoreStock
