import { makeAutoObservable } from "mobx";
import { UserRequest } from "../requests";

class scheduleStore {
  constructor() {
    makeAutoObservable(this);
  }
  schedules = [];
  getScheduleList = () => {
    return new Promise((resolve, reject) => {
      UserRequest.getScheduleList()
        .then((res) => {
          this.schedules = res.data || [];
          resolve(res.data);
        })
        .catch((err) => reject());
    });
  };

  searchScheduleList = (body) => {
    return new Promise((resolve, reject) => {
      UserRequest.searchScheduleList(body)
        .then((res) => {
          this.schedules = res.data || [];
          resolve(res.data);
        })
        .catch((err) => reject());
    });
  };
}

export default scheduleStore;
