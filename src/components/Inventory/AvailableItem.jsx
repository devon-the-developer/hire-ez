import React from 'react'
import ManagerItemOptions from '../StoreAdmin/ManagerItemOptions'
import CustomerItemOptions from '../StoreFront/CustomerItemOptions'

const AvailableItem = (props) => {
    let {item, onSelection, onReload, storeManager} = props

    return (
      <div
        className="flex flex-col items-center content-between w-64 h-auto max-h-1/4 bg-white m-2 p-4 rounded-lg shadow-lg sm:w-1/3 md:w-1/3 lg:w-64 "
        id={item.key}
      >
        <img src={item.imageUrl} className="rounded-lg w-32 h-32" alt="" />
        <p className="my-2 font-thin">
          Item Name: <span className="font-normal">{item.name}</span>
          <br />
          Type: <span className="font-normal">{item.type}</span>
          <br />
          Key: <span className="font-normal">{item.key}</span>
        </p>
        {storeManager ? (
          <ManagerItemOptions currentItemKey={item.key} onReload={onReload} />
        ) : (
          <CustomerItemOptions
            onSelect={() => {
              onSelection(item.key);
              console.log("item.key: ", item.key);
            }}
          />
        )}
      </div>
    );
}

export default AvailableItem
