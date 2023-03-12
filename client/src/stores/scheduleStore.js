import { makeAutoObservable } from "mobx";
import { UserRequest } from "../requests";

class scheduleStore {
  constructor() {
    makeAutoObservable(this);
  }
  schedules = [];
  selectedTrip = {};
  isShowRoomModal = false;
  selectedRoom = {};
  payMethodOption = ["ATM", "Cash", "Online", "Offline"];
  zooms = [];

  setSelectedRoom = (data) => {
    this.selectedRoom = data;
  };

  setIsShowRoomModal = (state) => {
    this.isShowRoomModal = state;
  };

  setLoadingProgress = (state) => {
    this.isLoading = state;
  };

  getZooms = () => {
    return new Promise((resolve, reject) => {
      UserRequest.getZooms()
        .then((res) => {
          this.zooms = res.data || [];
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  };

  searchRoom = (body) => {
    return new Promise((resolve, reject) => {
      UserRequest.searchRoom(body)
        .then((res) => {
          this.zooms = res.data || [];
          resolve(res.data);
        })
        .catch((err) => reject(err));
    });
  };

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
