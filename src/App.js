import React, {useState} from 'react';
import './App.css';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


function App() {

  const [value, setValue] = useState('one');
  const handleChange= (event, value) => {
    setValue(value);
}
  return (
    <div className="App">
      
      <AppBar position="static">
        <Toolbar>
          
          <Typography>
            Welcome to personal trainer!
          </Typography>
       
        </Toolbar>
        <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="Customers"/>
                <Tab value="two" label="Trainings"/>
            </Tabs>

      </AppBar>
      {value ==='one' && <div> <Customers/></div>}
        {value ==='two' && <div> <Trainings/></div>}
     
</div>
  );
}

export default App;