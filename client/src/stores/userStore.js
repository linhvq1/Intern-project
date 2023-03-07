import { makeAutoObservable } from "mobx";
import { UserRequest } from "../requests";

class userStore {
  constructor() {
    makeAutoObservable(this);
  }
  users = [];
  getUser = () => {
    return new Promise((resolve, reject) => {
      UserRequest.getUser()
        .then((res) => {
          this.users = res.data || [];
          resolve(res.data);
        })
        .catch((err) => reject());
    });
  };
}

export default userStore;
