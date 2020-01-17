import React, { Fragment, useState } from 'react'
import Inventory from '../Inventory/Inventory'
import getFirebase from '../../fire'
import Receipts from './Receipts/Receipts'

let firebase = getFirebase()

const StoreManager = () => {
    let [currentTab, setCurrentTab] = useState("Inventory")

    return (
      <Fragment>
        <div className="width-full bg-teal-600 flex justify-between items-center">
          <h1 className="font-extrabold text-2xl text-white p-6">Hire EZ</h1>
          <div className="font-bold text-xl text-white mx-4">
            <button className="font-semibold px-3" onClick={() => setCurrentTab("Inventory")}>
              Inventory
            </button>
            <button className="font-semibold mx-2 px-3" onClick={() => setCurrentTab("Receipts")}>
              Receipts
            </button>
            <button className="bg-red-600 hover:bg-red-400 text-red-100 rounded-lg px-3 py-1 border border-red-800 font-bold" onClick={() => firebase.auth().signOut()}>Sign out</button>
          </div>
        </div>
        {currentTab === "Inventory" ? (
          <Inventory storeManager={true} />
        ) : (
          <Receipts />
        )}
      </Fragment>
    );
}

export default StoreManager