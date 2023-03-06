import {makeAutoObservable} from 'mobx'

class CommonStore{
    constructor() {
        makeAutoObservable(this);
    }

    isLoading = false
    isShowRoomModal = false

    setIsShowRoomModal = state =>{
        this.isShowRoomModal = state
    }

    setLoadingProgress = state =>{
        this.isLoading = state
    }
}

export default CommonStore