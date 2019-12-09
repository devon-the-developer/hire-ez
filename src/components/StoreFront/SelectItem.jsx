import React, { useState } from 'react'

const SelectItem = (props) => {

    let [itemSelected, setItemSelected] = useState(false)
    let buttonClass = itemSelected ? "redButton" : null
    return (
        <div>
            <button className={buttonClass} style={{ float: "right" }} onClick={() => { 
                setItemSelected(!itemSelected)
                props.onSelect()}
                }>
                {!itemSelected ? "Select Item" : "Deselect Item"}
            </button>
        </div>
    )
}

export default SelectItem
