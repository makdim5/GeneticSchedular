import React from 'react';

const generate_times = (start_hour, end_hour, step_in_minutes) => {
    let times = [];
    function add_in(value) {
        return value < 10 ? "0" : "";
    }

    for (let hour = start_hour, minutes = 0; hour <= end_hour;  ){
        times.push(`${add_in(hour) + hour}:${add_in(minutes) + minutes}`);
        minutes += step_in_minutes;
        if(hour === end_hour ) break;
        if (minutes > 59){
            minutes = 0;
            hour += 1;
        }
    }

    return times;
}

const TimeLine = () => {
    const times = generate_times(8, 23, 30)
    return (
        <div className="cd-schedule__timeline">
            <ul>
                {times.map((item, index) => <li key={index}><span>{item}</span></li>)}
            </ul>
        </div>
    );
};

export default TimeLine;