import React, { Fragment, useState, useEffect } from 'react'
import getFirebase from '../fire'
import './Home.css'
import { addItemToInventory, removeItemFromInventory, getAllItems } from "../logic/database/DBHandler";

let firebase = getFirebase()

const Home = () => {
    let [inventory, setInventory] = useState([])
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        let randomfunc = async () => {
            let allItems = await getAllItems()
            console.log("allItems", allItems)
            await setInventory(allItems)
            setLoading(false);
        }

        randomfunc()

    }, [loading])

    const handleAddObject = async() => {
       await addItemToInventory();
       setLoading(true)
    }

    const handleRemoveObject = async(objectKey) => {
        await removeItemFromInventory(objectKey)
        setLoading(true)
    }

    console.log(loading)
    console.log("Inventory: ", inventory);
    return (
      <div style={{ margin: "50px" }}>
        <h1>Home</h1>
        <h2>Store Inventory:</h2>
        <br />
        <div className="inventory">
            {loading
                ? "Loading..."
                : inventory.map((item, index) => (
                    <Fragment>
                    <p className="inventory-item" key={index}>
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
        <br />
        <button onClick={() => handleAddObject()}>Add Object</button>
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
        <p>Currently using {React.version}</p>
      </div>
    );
}


export default Home