import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Customers() {
    const [trainings, setTrainings] = useState([]);

    
useEffect(() => fetchData(), []);

const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
   .then(response => response.json())
   .then(data => setTrainings(data.content))
}

const columns = [
    { field: 'date', sortable: true, filter: true, width: 180, cellRenderer: (data) => {
        return data ? (new Date(data.value)).toLocaleDateString() : '';  } },
    { field: 'duration', sortable: true, filter: true, width: 180   },
    { field: 'activity', sortable: true, filter: true, width: 180   },

  ];

  return (
      <div>
    <h2 style= {{textAlign: 'left', margin: '10px'}}>Trainings</h2>
    <div className="ag-theme-material"
        style={{height: '700px', margin: 'auto'}} >
            
        <AgGridReact 
            columnDefs={columns} 
            rowData={trainings}>
        </AgGridReact>

    
    </div>
    </div>

   
)

}