import React from 'react'
import { Row, Col } from 'react-simple-flex-grid'

const UnavailableItem = (props) => {
    let {item} = props
    return (
      <div className="unavailable-item" id={item.key}>
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
            <p style={{ float: "right" }}>This item is hired out</p>
          </Col>
        </Row>
      </div>
    );
}

export default UnavailableItem
