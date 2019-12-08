import React from 'react'

const HireItem = (props) => {

    return (
        <div>
            <button style={{ float: "right" }} onClick={() => { 
                props.onSelect()}
                }>
                Select Item
            </button>
        </div>
    )
}

export default HireItem
