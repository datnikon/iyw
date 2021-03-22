import { createStore } from 'vuex';
import { ADD_ORDER, SET_ORDER } from './mutation-types';
import constants from "../base/constants";
const store = createStore({
  state: {
    orders: [],
  },
  mutations: {
    [ADD_ORDER](state, payload) {
      let index = state.orders.findIndex(x => x._id === payload._id && x.orderSize === payload.orderSize);
      if (index > -1) {
        state.orders[index].orderNumber = payload.orderNumber + state.orders[index].orderNumber;
      } else {
        state.orders.push(payload);
      }
      const orders = JSON.stringify(state.orders);
      localStorage.setItem(constants.LOCAL_STORAGE_ORDERS, orders);
    },
    [SET_ORDER](state, payload) {
      state.orders = payload;
      const orders = JSON.stringify(state.orders);
      localStorage.setItem(constants.LOCAL_STORAGE_ORDERS, orders);
    }
  },
  getters: {
    checkedOrders: state => {
      return state.orders.filter((x) => x.checked);
    }
  }
})

export default store;