import React, { Fragment, useState, useEffect } from 'react'
import getFirebase from '../fire'
import { addItemToInventory, getAllItems } from "../logic/database/DBHandler";

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

    const handleAddObjectClick = async() => {
       await addItemToInventory();
       setLoading(true)
    }

    console.log(loading)
    console.log("Inventory: ", inventory);
    return (
        <Fragment>
            <h1>Home</h1>
            <h2>Store Inventory:</h2>
            <br />
            {loading ? "Loading..." : inventory.map((item, index) => ( <p key={index}>
                Item Name: {item.name} Key: {item.key}
             </p>))}
            <button onClick={() => handleAddObjectClick()} >Add Object</button>
            <button onClick={() => firebase.auth().signOut()}>Sign out</button>
            <p>Currently using {React.version}</p>
        </Fragment>
    )
}


export default Home