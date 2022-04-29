import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    
    
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

const columns = [
    { field: 'firstname', sortable: true, filter: true, width: 180 },
    { field: 'lastname', sortable: true, filter: true, width: 180   },
    { field: 'streetaddress', sortable: true, filter: true, width: 180   },
    { field: 'postcode', sortable: true, filter: true, width: 180   },
    { field: 'city', sortable: true, filter: true, width: 180   },
    { field: 'email', sortable: true, filter: true, width: 180  },
    { field: 'phone', sortable: true, filter: true, width: 180  },
    { width: 100, cellRenderer:row =><EditCustomer updateCustomer={updateCustomer} customer={row.data} /> }
  ];

  return (
      <div>
          <h2 style= {{textAlign: 'left', margin: '10px'}}>Customers</h2>
                <AddCustomer saveCustomer={saveCustomer}/>
    <div className="ag-theme-material"
        style={{height: '700px', margin: 'auto'}} >
            
        <AgGridReact 
            columnDefs={columns} 
            rowData={customers}>
        </AgGridReact>

    
    </div>
    </div>
   
)

}