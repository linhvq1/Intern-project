import commonStore from "./commonStore";
import scheduleStore from "./scheduleStore";

class RootStore {
  constructor() {
    this.commonStore = new commonStore(this);
    this.scheduleStore = new scheduleStore(this);
  }
}

const rootStore = new RootStore();
export default rootStore;
