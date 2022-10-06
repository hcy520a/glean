import {
    defineStore
} from 'pinia'

export const useloginStore = defineStore({
    id: 'message', // id必填，且需要唯一
    state: () => {
        return {
            count: 0
        }
    },
    // actions 用来修改 state
    actions: {

    }
})
