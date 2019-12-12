import React, { Fragment } from 'react'
import getFirebase from '../../fire'
import Inventory from '../Inventory/Inventory'
let firebase = getFirebase()

const StoreStock = () => {

    return (
      <Fragment>
        <Inventory storeManager={false} />
        <div className="optionsBox">
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
        </div>
      </Fragment>
    );
}

export default StoreStock
