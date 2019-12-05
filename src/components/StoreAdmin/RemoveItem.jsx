import React from 'react'
import { removeItemFromInventory } from '../../logic/database/DBHandler'

const RemoveItem = (props) => {

    const handleRemoveObject = async (itemKey) => {
        await removeItemFromInventory(itemKey)
        props.onReload()
    }

    return (
        <button style={{ float: "right" }}
            className="redButton"
            onClick={() => handleRemoveObject(props.currentItemKey)}
        >
            Remove Item
        </button> 
    )
}

export default RemoveItem
