import React, { useState } from 'react'
import { 
    InputGroup, 
    Form,
    FormControl 
} from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";



export default props => {
    const { startDate, endDate, updateStartDate, updateEndDate } = props
    return (
        <Form.Group >
            <InputGroup className="mb-3" size="md">
                <InputGroup.Prepend>
                    <InputGroup.Text>Start date</InputGroup.Text>
                    <DatePicker 
                        selected={startDate} 
                        onChange={date => updateStartDate(date)} 
                        dateFormat="dd/MM/yyyy"
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}    
                    />
                </InputGroup.Prepend>
            </InputGroup>
            <InputGroup className="mb-3" size="md">
                <InputGroup.Prepend>
                <InputGroup.Text>End date</InputGroup.Text>
                    <DatePicker 
                        selected={endDate} 
                        onChange={date => updateEndDate(date)} 
                        dateFormat="dd/MM/yyyy"
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}  
                        minDate={startDate}
                    />
                </InputGroup.Prepend>          
            </InputGroup>
        </Form.Group>
        
        
    );
};