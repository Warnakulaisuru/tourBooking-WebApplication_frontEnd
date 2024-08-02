import React from 'react'
import './common-section.css'

import {Container, Row, Col} from 'reactstrap';

const CommonSection = ({title}) => {
  return (
    <secton className='common__section'>
        <Container>
            <Row>
                <Col lg='12'>
                    <h1>{title}</h1>
                </Col>
            </Row>
        </Container>
    </secton>
  )
}

export default CommonSection