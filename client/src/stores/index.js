import commonStore from "./commonStore";
import userStore from "./userStore";

class RootStore {
  constructor() {
    this.commonStore = new commonStore(this);
    this.userStore = new userStore(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
