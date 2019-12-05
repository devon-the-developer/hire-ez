import React from 'react'
import RemoveItem from './RemoveItem'

const ManagerItemOptions = (props) => {
    return (
        <div>
            <RemoveItem currentItemKey={props.currentItemKey} onReload={props.onReload}/>
        </div>
    )
}

export default ManagerItemOptions
