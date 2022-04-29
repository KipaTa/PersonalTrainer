import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
        date: '', activity: '', duration: '', customer: ''
    })

    const handleClickOpen = () => {
        setTraining({...training, duration:'', customer: props.customer.links[0].href})
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value })
    }

    const addTraining = () => {
        props.addTraining(training);
        handleClose();
    }

    return (
    <div>
    <Button style={{margin: 10}} variant="outlined" onClick={handleClickOpen}>Add training</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
        
        <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            onChange={event => handleInputChange(event)}
            label="Date (YYYY-MM-DD)"
            fullWidth
        />
        <TextField
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={event => handleInputChange(event)}
            label="Activity"
            fullWidth
        />
         <TextField
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={event => handleInputChange(event)}
            label="Duration"
            fullWidth
        />
         
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addTraining}>Save</Button>
        </DialogActions>
    </Dialog>
    </div>
    );
}
