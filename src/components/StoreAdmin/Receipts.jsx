import React, { useState, useEffect } from 'react'
import { getReceiptList } from '../../logic/database/DBHandler'

const Receipts = () => {
    let [loading, setLoading] = useState(true)
    let [receiptsList, setReceiptsList] = useState([])
    
    useEffect(() => {
        let isSubscribed = true
        const loadCurrentReceipts = async() => {
            let allReceipts = await getReceiptList()
            console.log({allReceipts})
            if (isSubscribed) {
                setReceiptsList(allReceipts)
                setLoading(false)
            }
        }

        loadCurrentReceipts()

        return () => isSubscribed = false
    }, [loading])

    console.log({receiptsList})

    return (
      <div className="inventory">
        {loading
            ? <p style={{textAlign: "center"}}>Loading...</p>
            : receiptsList.map(item => (
                <div className="receipt-item">
                    <p>Receipt Code: {item.key}</p>
                    <p>Hired By User: {item.hireToUser}</p>
                    <ul>
                        Items Hired: <br /> <br />
                        {item.itemsHired.map(hiredItem => (
                            <li>{hiredItem}</li>
                        ))}
                    </ul>
                </div>
            ))}
      </div>
    );
}

export default Receipts
