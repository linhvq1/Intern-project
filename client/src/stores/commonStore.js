import { makeAutoObservable } from "mobx";
import { UserRequest } from "../requests";

class CommonStore {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = false;
}

export default CommonStore;
