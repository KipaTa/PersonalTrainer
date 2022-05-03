import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import { CSVLink } from "react-csv";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    
    
useEffect(() => fetchData(), []);

const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
   .then(response => response.json())
   .then(data => setCustomers(data.content))
}

const saveCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(customer)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
}

const updateCustomer = (customer, link) => {
    fetch(link, {
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(customer) 
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
 }

 const deleteCustomer = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, {method: 'DELETE'})
      .then (res => fetchData() )
      .catch(err => console.error(err))
      setOpen(true);
    }
  }

  function addTraining(training){
    fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
    })
        .then(res => fetchData())
        .catch(err => console.error(err))
}

  const handleClose = () => {
    setOpen(false);
   };

const columns = [
   
    { width: 100, headerName: '', field:'links.0.href', cellRenderer:row=> <Button variant="contained" size="small" color="secondary" onClick={()=> deleteCustomer(row.value)}>Delete</Button>},
    { width: 100, cellRenderer:row =><EditCustomer updateCustomer={updateCustomer} customer={row.data} /> },
    { width: 150, cellRenderer:row =><AddTraining addTraining={addTraining} customer= {row.data}/> },
    { field: 'firstname', sortable: true, filter: true, width: 180 },
    { field: 'lastname', sortable: true, filter: true, width: 180 },
    { field: 'streetaddress', sortable: true, filter: true, width: 180 },
    { field: 'postcode', sortable: true, filter: true, width: 180 },
    { field: 'city', sortable: true, filter: true, width: 180   },
    { field: 'email', sortable: true, filter: true, width: 180  },
    { field: 'phone', sortable: true, filter: true, width: 180  }  
  ];

  return (
      <div>
        
          <h2 style= {{textAlign: 'center', margin: '10px'}}>Customers</h2>
                <AddCustomer saveCustomer={saveCustomer}/>
                
    <div className="ag-theme-material"
        style={{height: '600px', margin: 'auto'}} >
        <CSVLink data={customers} >Download as CSV</CSVLink>
        <AgGridReact 
            columnDefs={columns} 
            rowData={customers}>
        </AgGridReact>
        <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Customer deleted"
        />
      </div>
    
    </div>
    </div>
   
)

}