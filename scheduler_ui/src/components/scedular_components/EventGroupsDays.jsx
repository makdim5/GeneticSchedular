import React from "react";
import DayShower from "./DayShower";


const EventGroupsDays = ({eventGroups}) => {
    return (
        <div className="cd-schedule__events">

            <ul>
                {eventGroups.map((item, index) =>
                    <DayShower day={item.day} events={item.events} key={index}/>)}
            </ul>

        </div>
    );
};

export default EventGroupsDays;