import { createStore } from "vuex";
// import axios from "axios";

export default createStore({
    state: {
        user: {}
    },
    mutations: {
        SET_USER(state, user) {
            state.user =user;
        }
    }
})