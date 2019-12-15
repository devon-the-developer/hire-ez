import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-simple-flex-grid'
import { getReceiptList, returnItemsOnReceipt } from '../../../logic/database/DBHandler'
import RemoveReceipt from './RemoveReceipt'

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

    const handleRemoveReceipt = async(receiptKey) => {
        console.log("removing receipt: ", receiptKey)
        await returnItemsOnReceipt(receiptKey)
        console.log("removed")
    }

    return (
      <div className="inventory">
        {loading
            ? <p style={{textAlign: "center"}}>Loading...</p>
            : receiptsList.map((receipt, index) => (
                <div className="receipt-item" key={index}>
                    <Row gutter={20} align="middle">
                        <Col span={6}>
                            <p>Receipt Code: {receipt.key}</p>
                            <p>Hired By User: {receipt.hireToUser}</p>
                            <ul>
                                Items Hired: <br /> <br />
                                {receipt.itemsHired.map((hiredItem, index) => (
                                    <li key={index}>{hiredItem}</li>
                                ))}
                            </ul>
                        </Col>
                        <Col span={6}>
                            <RemoveReceipt onClick={() => handleRemoveReceipt(receipt.key)}/>
                        </Col>
                    </Row>
                </div>
            ))}
      </div>
    );
}

export default Receipts
