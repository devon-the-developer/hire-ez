import React from 'react'
import { Row, Col } from 'react-simple-flex-grid'
import ManagerItemOptions from '../StoreAdmin/ManagerItemOptions'
import CustomerItemOptions from '../StoreFront/CustomerItemOptions'

const AvailableItem = (props) => {
    let {item, onSelection, onReload, storeManager} = props

    return (
      <div className="inventory-item" id={item.key}>
        <Row gutter={10} align="middle">
          <Col span={4}>
            <img
              src={item.imageUrl}
              style={{ borderRadius: "25px" }}
              width="130px"
              height="130px"
              alt=""
            />
          </Col>
          <Col span={4}>
            <p>
              Item Name: {item.name}
              <br />
              Type: {item.type}
              <br />
              Key: {item.key}
            </p>
          </Col>
          <Col span={4}>
            {storeManager ? (
              <ManagerItemOptions
                currentItemKey={item.key}
                onReload={onReload}
              />
            ) : (
              <CustomerItemOptions
                onSelect={() => {
                    onSelection(item.key)
                    console.log("item.key: ", item.key)
                }}
              />
            )}
          </Col>
        </Row>
      </div>
    );
}

export default AvailableItem
