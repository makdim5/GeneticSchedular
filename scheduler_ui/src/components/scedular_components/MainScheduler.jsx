import React, {useEffect} from 'react';
import TimeLine from "./TimeLine";

import "./assets/css/style.css"

import main from "./assets/js/main.js"

import EventGroupsDays from "./EventGroupsDays";


const MainScheduler = ({eventGroups}) => {

    useEffect(() => {
        main()
    });

    return (
        <div className="cd-schedule cd-schedule--loading margin-top-lg margin-bottom-lg js js-cd-schedule">
            <TimeLine></TimeLine>

            <EventGroupsDays eventGroups={eventGroups}></EventGroupsDays>

        </div>
    );
};

export default MainScheduler;