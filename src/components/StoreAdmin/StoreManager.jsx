import React, { Fragment, useState } from 'react'
import Inventory from '../Inventory/Inventory'
import getFirebase from '../../fire'
import CurrentReceipts from './CurrentReceipts'

let firebase = getFirebase()

const StoreManager = () => {
    let [currentTab, setCurrentTab] = useState("Inventory")

    return (
      <Fragment>
        <div className="nav">
          <button className="navButton" onClick={() => setCurrentTab("Inventory")}>
            Inventory
          </button>
          <button className="navButton" onClick={() => setCurrentTab("Receipts")}>
            Receipts
          </button>
        </div>
        {currentTab === "Inventory" ? (
          <Inventory storeManager={true} />
        ) : (
          <CurrentReceipts />
        )}
        <div className="optionsBox">
          <button onClick={() => firebase.auth().signOut()}>Sign out</button>
        </div>
      </Fragment>
    );
}

export default StoreManager