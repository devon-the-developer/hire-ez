import React from 'react'

const RemoveReceipt = (props) => {
    return (
        <button className="redButton" onClick={()=> props.onClick()}>Remove Receipt</button>
    )
}

export default RemoveReceipt
