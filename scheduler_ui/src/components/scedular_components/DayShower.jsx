import React from 'react';

const DayShower = ({day, events, key}) => {
    return (
        <li className="cd-schedule__group" key={key}>
            <div className="cd-schedule__top-info"><span>{day}</span></div>
            <ul>
                {events.map((item, index) => <li className="cd-schedule__event">
                    <a data-start={item.data_start} data-end={item.data_end}
                       style={{backgroundColor:"blueviolet", margin:"20px",
                           borderRadius:"20px"}}
                       >
                        {item.names.map((name, i) => <em className="cd-schedule__name">{name}</em>)}

                    </a>

                </li>)}

            </ul>
        </li>
    );
};

export default DayShower;