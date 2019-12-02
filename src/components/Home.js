import React, { Fragment } from 'react'
import getFirebase from '../fire'
import { addItemToInventory } from "../logic/database/DBHandler";

let firebase = getFirebase()

 const Home = () => {
    return (
        <Fragment>
            <h1>Home</h1>
            <br />
            <button onClick={() => addItemToInventory()} >Add Object</button>
            <button onClick={() => firebase.auth().signOut()}>Sign out</button>
        </Fragment>
    )
}


export default Home