import {ADD_COUNT, ADD_TO_CART} from "./mutation-type";
export default {
    [ADD_COUNT](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        state.cartList.push(payload)
    }
}