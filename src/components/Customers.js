import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Customers() {
    const [customers, setCustomers] = useState([]);

    
useEffect(() => fetchData(), []);

const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
   .then(response => response.json())
   .then(data => setCustomers(data.content))
}

const columns = [
    { field: 'firstname', sortable: true, filter: true, width: 180 },
    { field: 'lastname', sortable: true, filter: true, width: 180   },
    { field: 'streetaddress', sortable: true, filter: true, width: 180   },
    { field: 'postcode', sortable: true, filter: true, width: 180   },
    { field: 'city', sortable: true, filter: true, width: 180   },
    { field: 'email', sortable: true, filter: true, width: 180  },
    { field: 'phone', sortable: true, filter: true, width: 180  }
  ];

  return (
    <div className="ag-theme-material"
        style={{height: '700px', margin: 'auto'}} >
            
        <AgGridReact 
            columnDefs={columns} 
            rowData={customers}>
        </AgGridReact>

    
    </div>

   
)

}