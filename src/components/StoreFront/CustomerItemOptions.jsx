import React from 'react'
import SelectItem from './SelectItem'

const CustomerItemOptions = (props) => {
    let {onSelect} = props
    return (
      <div>
        <SelectItem
          onSelect={onSelect}
        />
      </div>
    );
}

export default CustomerItemOptions
