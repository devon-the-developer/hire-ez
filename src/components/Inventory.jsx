import React, { Fragment, useState, useEffect } from 'react'
import { Row, Col } from "react-simple-flex-grid";
import "react-simple-flex-grid/lib/main.css";
import { getAllItems } from '../logic/database/DBHandler'
import AddItem from './StoreAdmin/AddItem'
import HireItems from './StoreFront/HireItems'
import ManagerItemOptions from './StoreAdmin/ManagerItemOptions'
import CustomerItemOptions from './StoreFront/CustomerItemOptions';

const Inventory = (props) => {

    let [inventory, setInventory] = useState([])
    let [loading, setLoading] = useState(true)
    let [addItemTabOpen, setAddItemTabOpen] = useState(false)
    let [itemHireList, setItemHireList] = useState([])


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
        if (selectedItem.className === "inventory-item"){
            selectedItem.className = "selected-item"
            let newHireList = itemHireList
            newHireList.push(selectedItemKey)
            // let newHireList = [prevHireList + selectedItemKey]
            setItemHireList(newHireList)
        } else {
            selectedItem.className = "inventory-item"
            let prevHireList = itemHireList
            let newHireList = prevHireList.filter(itemKey => itemKey !== selectedItemKey)
            setItemHireList(newHireList)
        }
        console.log({itemHireList})
    }

    return (
      <Fragment>
        <div className="inventory">
          {loading
            ? "Loading..."
            : inventory.map((item, index) =>
                item.hireReceipt ? (
                  <div className="unavailable-item" id={item.key} key={index}>
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
                        <p style={{ float: "right" }}>This item is hired out</p>
                      </Col>
                    </Row>
                  </div>
                ) : (
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
                        {props.storeManager ? (
                          <ManagerItemOptions
                            currentItemKey={item.key}
                            onReload={() => handleReloadItems()}
                          />
                        ) : (
                          <CustomerItemOptions
                            onSelect={() => handleItemSelection(item.key)}
                          />
                        )}
                      </Col>
                    </Row>
                  </div>
                )
              )}
        </div>
        {props.storeManager ? (
          !addItemTabOpen ? (
            <button onClick={() => setAddItemTabOpen(true)}>Add Item</button>
          ) : (
            <AddItem onFinish={() => handleOnFinish()} />
          )
        ) : (
          <HireItems hireList={itemHireList} />
        )}
      </Fragment>
    );
}

export default Inventory
