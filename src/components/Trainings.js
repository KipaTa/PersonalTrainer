import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import'ag-grid-community/dist/styles/ag-grid.css';
import'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar';

export default function Customers() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = React.useState(false);

    
useEffect(() => fetchData(), []);

const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
   .then(response => response.json())
   .then(data => setTrainings(data))
}

const deleteTraining= (id) => {
    if (window.confirm('Are you sure?')) {
      fetch("https://customerrest.herokuapp.com/api/trainings/" + id, {method: 'DELETE'})
      .then (res => fetchData() )
      .catch(err => console.error(err))
      setOpen(true);
    }
  }

const handleClose = () => {
    setOpen(false);
   };

const columns = [
    { width: 100, headerName: '', field:'links.0.href', cellRenderer:row=> <Button 
        variant="contained" size="small" color="secondary" onClick={()=> deleteTraining(row.data.id)}>Delete</Button>},
    { field: 'date', sortable: true, filter: true, width: 180, cellRenderer: (data) => {
        return data ? (new Date(data.value)).toLocaleDateString() : '';  } },
    { field: 'duration', sortable: true, filter: true, width: 180   },
    { field: 'activity', sortable: true, filter: true, width: 180   },
    { headerName: 'Lastname', field: 'customer.lastname', sortable: true, filter: true, width: 180   },
    { headerName: 'Firstname', field: 'customer.firstname', sortable: true, filter: true, width: 180   }
   

  ];

  return (
      <div>
    <h2 style= {{textAlign: 'center', margin: '10px'}}>Trainings</h2>
    <div className="ag-theme-material"
        style={{height: '700px', margin: 'auto'}} >
            
        <AgGridReact 
            columnDefs={columns} 
            rowData={trainings}>
        </AgGridReact>
        <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Training deleted"
        />
      </div>
    
    </div>
    </div>

   
)

}