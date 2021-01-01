import Vuex from 'vuex'
import Vue from 'vue'
import { _ } from "vue-underscore";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        shoppingCart: []
    },

    getters: {
        getShoppingCart: state => {
            return state.shoppingCart;
        }
    },

    mutations: {
        addItemToCart(state, product) {
            let found = _.find(state.shoppingCart, function (item) {
                return item != null && item.id === product.id;
            });
            if (found) {
                found.quantity = (found.quantity * 1) + 1;
            } else {
                _.extend(product, { quantity: 1 })
                state.shoppingCart.push(product);
            }
        },
        removeItemFromCart(state, product) {
            state.totalCost -= product.price * product.quantity
            state.shoppingCart = _.filter(state.shoppingCart, function (item) {
                return item.id !== product.id;
            });
        },
        changeQuantity(state, product) {
            let item = _.find(state.shoppingCart, function (item) {
                return item.id === product.id;
            });
            if (item) {
                item.quantity = product.quantity;
            }
        }
    },

    actions: {
        addItemToCart(context, newProduct) {
            if (newProduct != null) {
                context.commit('addItemToCart', newProduct);
            }
        },
        removeItemFromCart(context, product) {
            if (product != null) {
                context.commit('removeItemFromCart', product);
            }
        },
        changeQuantity(context, product) {
            if (product != null) {
                context.commit('changeQuantity', product);
            }
        }
    },
    plugins: [
        createPersistedState({ storage: window.localStorage })
    ],
});

export default store;