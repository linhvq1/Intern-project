import commonStore from "./commonStore";

class RootStore{
    constructor() {
        this.commonStore = new commonStore(this)
    }
}

const rootStore = new RootStore();
export default rootStore