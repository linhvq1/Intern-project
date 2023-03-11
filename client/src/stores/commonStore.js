import { makeAutoObservable } from "mobx";
import { UserRequest } from "../requests";

class CommonStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = false;
  isShowRoomModal = false;
  selectedRoom = {};

  setSelectedRoom = (data) => {
    this.selectedRoom = data;
  };

  setIsShowRoomModal = (state) => {
    this.isShowRoomModal = state;
  };

  setLoadingProgress = (state) => {
    this.isLoading = state;
  };

  zooms = [];
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
}

export default CommonStore;
