import React, { Fragment } from 'react'
import './Home.css'

import StoreManager from './Store/StoreManager'

const Home = () => {

    return (
      <div style={{ margin: "50px" }}>
        <h1>Home</h1>
        <h2>Store Inventory:</h2>
        <br />
        <StoreManager />
      </div>
    );
}


export default Home