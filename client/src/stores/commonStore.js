import {makeAutoObservable} from 'mobx'

class CommonStore{
    constructor() {
        makeAutoObservable(this);
    }

    isLoading = false

    setLoadingProgress = state =>{
        this.isLoading = state
    }
}

export default CommonStore