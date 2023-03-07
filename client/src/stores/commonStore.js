import { makeAutoObservable } from "mobx";
import { UserRequest } from "../requests";

class CommonStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = false;
  isShowRoomModal = false;

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
        .catch((err) => reject());
    });
  };
}

export default CommonStore;
