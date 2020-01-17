import React, { useState } from 'react'
import { addItemToInventory } from '../../logic/database/DBHandler'
 
const AddItem = (props) => {
    let [name, setName] = useState(null)
    let [type, setType] = useState(null)
    let [image, setImage] = useState(null)
    let [error, setError] = useState(null)

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        console.log({name, type, image})
        try {
            await addItemToInventory(name, type, image)
            props.onFinish()
        } catch (err) {
            setError(err)
            console.log(err)
        }
    }

    return (
      <div className="font-medium text-lg uppercase border-2 border-green-700 w-64 h-auto bg-green-400 m-2 p-4 rounded-lg shadow-lg lg:w-1/5 ">
        {error ? (
          <p>{error.message}</p>
        ) : (
          <form>
            <label>
              <strong>Name: </strong>
              <input
                type="text"
                onChange={e => setName(e.target.value)}
              ></input>
            </label>
            <br />
            <label>
              <strong>Type: </strong>
              <br />
              <input
                type="text"
                onChange={e => setType(e.target.value)}
              ></input>
            </label>
            <br />
            <label>
              <strong>Image: </strong>
              <br /> 
              <input
                type="file"
                onChange={e => setImage(e.target.files[0])}
              ></input>
            </label>
            <br />
            <br />
            <button className="border border-green-900 bg-green-700 px-4 py-2 rounded-lg hover:bg-green-500" disabled={!name || !type} onClick={handleSubmitForm}>
              Add This Object
            </button>
          </form>
        )}
      </div>
    );
}

export default AddItem