import React from 'react'
import SelectItem from './SelectItem'

const CustomerItemOptions = (props) => {
    return (
      <div>
        <SelectItem
          onSelect={props.onSelect}
        />
      </div>
    );
}

export default CustomerItemOptions
