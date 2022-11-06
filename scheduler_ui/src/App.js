import './App.css';
import MainScheduler from "./components/scedular_components/MainScheduler";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Loader from "./components/Loader/Loader";
import {Button} from "@mui/material";


function App() {

    const [eventGroups, setEventGroups] = useState([
        {
            day: "Monday", events: [
                {names: ["Abs Circuit", "bjb"], data_start: "08:30", data_end: "10:30"},
                {names: ["Rowing Workout", "mk"], data_start: "11:00", data_end: "12:30"},
                {names: ["Yoga Level 1", "nk"], data_start: "13:00", data_end: "16:30"},
            ]
        },

    ])
    const [isLoading, setLoading] = useState(true);

    const handler = () => {
        setLoading(true);
        axios.get("http://127.0.0.1:8000/api/v1/scheduler/")
            .then((res) => {
                setEventGroups(res.data)
                console.log(res.data)
                setLoading(false);
            });
    }

    useEffect(() =>{
        handler();
    }, [])
    return (
        <div className="App">

            <div style={{flex:2, display:"flex", justifyContent:"center"}}>
                <Button  onClick={() => handler()}>Update scheduler</Button>
            </div>
            <div style={{flex:10}}>
                {
                    isLoading?
                        <div style={{display:"flex", justifyContent:"center", marginTop: "50px"}}><Loader /></div>:
                        <MainScheduler eventGroups={eventGroups}></MainScheduler>
                }
            </div>



        </div>
    );
}

export default App;
