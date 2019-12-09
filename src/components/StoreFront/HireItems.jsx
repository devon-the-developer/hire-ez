import React from 'react'

const HireItems = (props) => {
    return (
        <div>
            <button onClick={() => console.log(props.hireList)} >Hire Selected Items</button>
        </div>
    )
}

export default HireItems
