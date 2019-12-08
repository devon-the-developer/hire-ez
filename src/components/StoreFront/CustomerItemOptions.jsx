import React from 'react'
import HireItem from './HireItem'

const CustomerItemOptions = (props) => {
    return (
      <div>
        <HireItem
          onSelect={props.onSelect}
        />
      </div>
    );
}

export default CustomerItemOptions
