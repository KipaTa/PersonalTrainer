import React from "react";
import lodash from 'lodash';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

export default function TrainingCharts() {
    const [trainings, setTrainings] = React.useState([]);


    function fetchData() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => { setTrainings(lodash(data)
            .groupBy(trainings => trainings.activity)
            .map((value, key) => (
            {activity: key, total: lodash.sumBy(value, 'duration')}
            ))
            .value());
            })
    }

    React.useEffect(() => fetchData(), []);

    return (
        <div className="App">
            <div>
             <h2>Activity chart</h2>   
            </div>
            <BarChart width={500} height={400} data={trainings}>
                <XAxis dataKey="activity"/>
                <YAxis label={{value: 'Duration (min)', position: 'insideLeft', angle: 270 }}/>
                <Bar dataKey="total" fill='purple'/>
            </BarChart>
        </div>
    )
}