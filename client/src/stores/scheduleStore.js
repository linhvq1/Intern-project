import { makeAutoObservable } from "mobx";
import { UserRequest } from "../requests";

class scheduleStore {
  constructor() {
    makeAutoObservable(this);
  }
  schedules = [];
  selectedTrip = {};

  setSelectedTrip = (data) => {
    this.selectedTrip = data;
  };

  getScheduleList = () => {
    return new Promise((resolve, reject) => {
      UserRequest.getScheduleList()
        .then((res) => {
          this.schedules = res.data || [];
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  };

  searchScheduleList = (body) => {
    return new Promise((resolve, reject) => {
      UserRequest.searchScheduleList(body)
        .then((res) => {
          this.schedules = res.data || [];
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  };

  updateSchedule = (id, body) => {
    return new Promise((resolve, reject) => {
      UserRequest.updateSchedule(id, body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  };

  createSchedule = (body) => {
    return new Promise((resolve, reject) => {
      UserRequest.createSchedule(body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  };

  deleteSchedule = (id) => {
    return new Promise((resolve, reject) => {
      UserRequest.deleteSchedule(id)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  };
}

export default scheduleStore;
