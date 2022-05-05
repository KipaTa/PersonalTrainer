import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function Calendar() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);

const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
   .then(response => response.json())
   .then(data => setTrainings(data))
}



    return (
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
            center: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
         
        events={trainings.map((training) => {
            const calendar = {};
            calendar.date = training.date;
            calendar.title = [
                training.activity + ': ' +
                training.customer.firstname + ' ' +
                training.customer.lastname
              ];
            return calendar;
        })}
      />
    )
  
}