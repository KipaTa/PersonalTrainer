import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
    })

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value })
    }

    const addCustomer = () => {
        props.saveCustomer(customer);
        handleClose();
    }

    return (
    <div>
    <Button style={{margin: 5}} variant="contained" onClick={handleClickOpen}>Add Customer</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
        
        <TextField
            autoFocus
            margin="dense"
            name="firstname"
            value={customer.firstname}
            onChange={event => handleInputChange(event)}
            label="Firstname"
            fullWidth
        />
        <TextField
            margin="dense"
            name="lastname"
            value={customer.lastname}
            onChange={event => handleInputChange(event)}
            label="Lastname"
            fullWidth
        />
         <TextField
            margin="dense"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={event => handleInputChange(event)}
            label="Streetaddress"
            fullWidth
        />
         <TextField
            margin="dense"
            name="postcode"
            value={customer.postcode}
            onChange={event => handleInputChange(event)}
            label="Postcode"
            fullWidth
        />
         <TextField
            margin="dense"
            name="city"
            value={customer.city}
            onChange={event => handleInputChange(event)}
            label="City"
            fullWidth
        />
         <TextField
            margin="dense"
            name="email"
            value={customer.email}
            onChange={event => handleInputChange(event)}
            label="Email"
            fullWidth
        />
        <TextField
            margin="dense"
            name="phone"
            value={customer.phone}
            onChange={event => handleInputChange(event)}
            label="Phone"
            fullWidth
        />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addCustomer}>Save</Button>
        </DialogActions>
    </Dialog>
    </div>
    );
}
