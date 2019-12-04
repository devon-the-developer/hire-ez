import React, { Fragment, useState, useEffect } from 'react'
import getFirebase from '../../fire'
import { getAllItems } from '../../logic/database/DBHandler'
let firebase = getFirebase()

const StoreStock = () => {
    let [inventory, setInventory] = useState(null)
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        let isSubscribed = true

        let loadInventoryItems = async () => {
            let allItems = await getAllItems()
            console.log("allItems", allItems)
            if (isSubscribed){
                await setInventory(allItems)
                setLoading(false)
            }
        }

        loadInventoryItems()
        
        return () => isSubscribed = false

    }, [loading])

    return (
    <Fragment>
        <div className="inventory">
            {loading
                ? "Loading..."
                : inventory.map((item, index) => (
                    <Fragment key={index}>
                        <p className="inventory-item" >
                            <img src={item.imageUrl} width="150px" height="150px" alt="" />
                            Item Name: {item.name} Key: {item.key}
                        </p>
                    </Fragment>
                ))
            }
        </div>
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
    </Fragment>
    )
}

export default StoreStock
