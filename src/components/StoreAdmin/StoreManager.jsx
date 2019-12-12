import React, { Fragment } from 'react'
import Inventory from '../Inventory/Inventory'
import getFirebase from '../../fire'

let firebase = getFirebase()

const StoreManager = () => {

    return (
      <Fragment>
        <Inventory storeManager={true} />
        <div className="optionsBox">
          <button onClick={() => firebase.auth().signOut()}>Sign out</button>
        </div>
      </Fragment>
    );
}

export default StoreManager