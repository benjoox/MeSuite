import React from 'react'
import { 
  FormGroup, 
  Form, 
  Container, 
  Row, 
  Col 
} from 'react-bootstrap';

import TextField from './TextField'
import DateFields from './DateFields';

export default function(props) {
  const { startDate, 
    endDate, 
    updateSearchText, 
    updateFilterField,
    updateStartDate,
    updateEndDate
  } = props

  function onSelect(ev) {
    ev.preventDefault()
    updateFilterField(ev.target.value)
  }
  function onTextChange(ev) {
    ev.preventDefault()
    updateSearchText(ev.target.value)
  }
  
 return (
   <Container>
     <Row>
          <Col md={4}>
          <FormGroup>
            <Form.Control as="select" size="md" onChange={onSelect} value={props.filterField}>
                <option value=''>-- All --</option>
                <option value='date'>Date</option>
                <option value='amount'>Amount</option>
                <option value='category'>Category</option>
                <option value='account'>Account</option>
                <option value='description'>Description</option>
            </Form.Control>
          </FormGroup>
          </Col>
          <Col md={8}>
            {
              props.filterField === 'date' ? 
                <DateFields 
                  startDate={startDate}
                  endDate={endDate}
                  updateStartDate={updateStartDate}
                  updateEndDate={updateEndDate}
                /> 
                : 
                <TextField searchText={props.searchText}  onTextChange={onTextChange}/>
            }
        </Col>
     </Row>
   </Container>
 )   
}
