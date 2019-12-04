import React, { Fragment, useState, useEffect } from 'react'
import { getAllItems, removeItemFromInventory } from './../../logic/database/DBHandler'
import AddItem from './AddItem'

const Inventory = () => {
    let [inventory, setInventory] = useState([])
    let [loading, setLoading] = useState(true)
    let [addItemTabOpen, setAddItemTabOpen] = useState(false)


    useEffect(() => {
        let loadInventoryItems = async () => {
            let allItems = await getAllItems()
            console.log("allItems", allItems)
            await setInventory(allItems)
            setLoading(false);
        }

        loadInventoryItems()

    }, [loading])

    const handleRemoveObject = async (itemKey) => {
        await removeItemFromInventory(itemKey)
        setLoading(true)
    }

    const handleOnFinish = () => {
        setAddItemTabOpen(false)
        setLoading(true)
    }

    return (<Fragment>
        <div className="inventory">
            {loading
                ? "Loading..."
                : inventory.map((item, index) => (
                    <Fragment>
                        <p className="inventory-item" key={index}>
                            <img src={item.imageUrl} width="150px" height="150px" alt="" />
                            Item Name: {item.name} Key: {item.key}
                            <button
                                style={{ float: "right" }}
                                onClick={() => handleRemoveObject(item.key)}
                            >
                                Remove Item
                        </button>
                        </p>
                    </Fragment>
                ))
            }
        </div>
        { !addItemTabOpen ? <button onClick={() => setAddItemTabOpen(true)}>Add Object</button> : <AddItem onFinish={() => handleOnFinish()} /> }
    </Fragment>
)
}

export default Inventory
