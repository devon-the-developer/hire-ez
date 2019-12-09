import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import { getAllItems } from '../logic/database/DBHandler'
import AddItem from './StoreAdmin/AddItem'
import HireItems from './StoreFront/HireItems'
import ManagerItemOptions from './StoreAdmin/ManagerItemOptions'
import CustomerItemOptions from './StoreFront/CustomerItemOptions';

const Inventory = (props) => {

    console.log()

    let [inventory, setInventory] = useState([])
    let [loading, setLoading] = useState(true)
    let [addItemTabOpen, setAddItemTabOpen] = useState(false)


    useEffect(() => {
        let isSubscribed = true
        let loadInventoryItems = async () => {
            let allItems = await getAllItems()
            console.log("allItems", allItems)
            if(isSubscribed){ 
                await setInventory(allItems)
                setLoading(false)
            }
        }

        loadInventoryItems()

        return () => isSubscribed = false

    }, [loading])

    const handleOnFinish = () => {
        setAddItemTabOpen(false)
        setLoading(true)
    }

    const handleReloadItems = () => {
        setLoading(true)
    }

    const handleItemSelection = (selectedItemKey) => {

        console.log("recieved selected key: " + selectedItemKey)
        let selectedItem = document.getElementById(selectedItemKey)
        console.log({selectedItem})
        selectedItem.className = selectedItem.className === "inventory-item" ? "selected-item" : "inventory-item"

    }

    return (
      <Fragment>
        <div className="inventory">
          {loading
            ? "Loading..."
            : inventory.map((item, index) => (
                <div className="inventory-item" id={item.key} key={index}>
                    <Row gutter={10} align="middle">
                        <Col span={4}>
                            <img
                                src={item.imageUrl}
                                style={{ borderRadius: "25px" }}
                                width="130px"
                                height="130px"
                                alt=""
                            />
                        </Col>
                        <Col span={4}>
                            <p>
                                Item Name: {item.name}
                                <br /> 
                                Type: {item.type}
                                <br />
                                Key: {item.key}
                            </p>
                        </Col>
                        <Col span={4}>
                        {props.storeManager ? 
                            <ManagerItemOptions currentItemKey={item.key} onReload={() => handleReloadItems()} /> 
                            :
                            <CustomerItemOptions onSelect={() => handleItemSelection(item.key)}  />
                         }
                        </Col>
                    </Row>
                </div>
              ))}
        </div>
        {props.storeManager ? (!addItemTabOpen ? (
          <button onClick={() => setAddItemTabOpen(true)}>Add Item</button>
        ) : (
           <AddItem onFinish={() => handleOnFinish()} /> 
        )) : <HireItems />}
      </Fragment>
    );
}

export default Inventory
