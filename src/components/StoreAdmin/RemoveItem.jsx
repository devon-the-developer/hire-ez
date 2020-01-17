import React from 'react'
import { removeItemFromInventory } from '../../logic/database/DBHandler'

const RemoveItem = (props) => {

    const handleRemoveObject = async (itemKey) => {
        await removeItemFromInventory(itemKey)
        props.onReload()
    }

    return (
        <button 
            className="border-solid border-gray-800 border rounded my-2 bg-red-500 px-4 py-1 font-medium uppercase"
            onClick={() => handleRemoveObject(props.currentItemKey)}
        >
            Remove Item
        </button> 
    )
}

export default RemoveItem
