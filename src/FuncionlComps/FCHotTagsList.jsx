import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Col } from "react-bootstrap";
import { ImFire } from 'react-icons/im';
import Spiner from '../Elements/Spiner';

export default function FCHotTagsList({ tags }) {
  return (
    <ListGroup as="ol" numbered
      style={{ borderRadius: 25 }}
    >
      {tags !== undefined ?
        tags.map((t, i) =>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={i}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
          >
            <Col xs={8} style={{ marginLeft: 10, textAlign: "left" }}>
              <b>{t.TagName}</b>
            </Col>
            <Col xs={4}>
              <ImFire style={{ color: "red", fontSize: 30 }} />
            </Col>

          </ListGroup.Item>
        )
        :
        <Spiner />
      }
    </ListGroup>
  )
}
