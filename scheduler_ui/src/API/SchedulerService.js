import axios from "axios";

export default class SchedulerService {
    static getAll() {
        const response = axios.get("http://127.0.0.1:8000/api/v1/scheduler/",
            {

            });
        return response;

    }
}