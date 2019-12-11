import React from 'react'
import { hireItems } from '../../logic/database/DBHandler'

const HireItems = (props) => {

    const handleHireItems = () => {
        console.log(props.hireList);
        if (props.hireList.length === 0) {
            console.log("No items selected")
            return
        }
        hireItems(props.hireList);
    }
    return (
        <div>
            <button onClick={handleHireItems}>Hire Selected Items</button>
        </div>
    )
}

export default HireItems
