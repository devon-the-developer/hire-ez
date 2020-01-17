import React from 'react'

const UnavailableItem = (props) => {
    let {item} = props
    return (
      <div
        className="flex flex-col items-center content-between w-64 h-auto max-h-1/4 bg-yellow-100 border border-yellow-200 m-2 p-4 rounded-lg shadow-lg sm:w-1/3 md:w-1/3 lg:w-64 "
        id={item.key}
      >
        <img src={item.imageUrl} className="rounded-lg w-32 h-32" alt="" />
        <p className="my-2 font-thin">
          Item Name: {item.name}
          <br />
          Type: {item.type}
          <br />
          Key: {item.key}
        </p>
        <p className="border-solid border-gray-800 border rounded my-2 bg-yellow-500 px-4 py-1 font-medium uppercase">
          Currently Rented
        </p>
      </div>
    );
}

export default UnavailableItem
