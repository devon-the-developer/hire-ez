import React, { Fragment, useState, useEffect } from 'react'
import "react-simple-flex-grid/lib/main.css";
import { getAllItems } from '../../logic/database/DBHandler'
import AddItem from '../StoreAdmin/AddItem'
import HireItems from '../StoreFront/HireItems'
import UnavailableItem from './UnavailableItem';
import AvailableItem from './AvailableItem';

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
        <div className="flex flex-wrap justify-center content-start width-full p-3 min-h-screen bg-gray-100 lg:justify-center">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            inventory.map((item, index) =>
              item.hireReceipt ? (
                <UnavailableItem item={item} index={index} key={index} />
              ) : (
                <AvailableItem
                  item={item}
                  index={index}
                  onSelection={handleItemSelection}
                  onReload={handleReloadItems}
                  storeManager={props.storeManager}
                  key={index}
                />
              )
            )
          )}
          {props.storeManager ? (
            !addItemTabOpen ? (
              <button
                className="font-semibold text-xl uppercase border-2 border-green-700 w-64 h-32 bg-green-400 m-2 p-4 rounded-lg shadow-lg sm:w-1/3 md:w-1/3 lg:w-64 hover:bg-green-300"
                onClick={() => setAddItemTabOpen(true)}
              >
                Add Item
              </button>
            ) : (
              <AddItem onFinish={() => handleOnFinish()} />
            )
          ) : (
            <HireItems hireList={itemHireList} onFinish={handleReloadItems} />
          )}
        </div>
      </Fragment>
    );
}

export default Inventory
