import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import { getAllItems, removeItemFromInventory } from '../../logic/database/DBHandler'
import AddItem from './AddItem'

const Inventory = () => {
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

    const handleRemoveObject = async (itemKey) => {
        await removeItemFromInventory(itemKey)
        setLoading(true)
    }

    const handleOnFinish = () => {
        setAddItemTabOpen(false)
        setLoading(true)
    }

    return (
      <Fragment>
        <div className="inventory">
          {loading
            ? "Loading..."
            : inventory.map((item, index) => (
                <div className="inventory-item" key={index}>
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
                        <button
                            style={{ float: "right" }}
                            className="redButton"
                            onClick={() => handleRemoveObject(item.key)}
                        >
                        Remove Item
                        </button>
                        </Col>
                    </Row>
                </div>
              ))}
        </div>
        {!addItemTabOpen ? (
          <button onClick={() => setAddItemTabOpen(true)}>Add Item</button>
        ) : (
          <AddItem onFinish={() => handleOnFinish()} />
        )}
      </Fragment>
    );
}

export default Inventory
