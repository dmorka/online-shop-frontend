import Vuex from 'vuex'
import Vue from 'vue'
import {_} from "vue-underscore";

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
            let item = _.find(state.shoppingCart, function (item) {
                return item.product.name === product.name;
            });
            if (item) {
                item.quantity += 1;
            } else {
                state.shoppingCart.push({product: product, quantity: 1});
            }
        },
        removeItemFromCart(state, product) {
            state.shoppingCart = _.filter(state.shoppingCart, function (item) {
                return item.product.name !== product.name;
            });
        },
        changeQuantity(state, product, newQuantity) {
            let item = _.find(state.shoppingCart, function (item) {
                return item.product.name !== product.name;
            });

            if (item) {
                item.quantity = newQuantity
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
        changeQuantity(context, product, newQuantity) {
            if (product != null && newQuantity > 0) {
                context.commit('changeQuantity', product, newQuantity);
            }
        }
    }
});

export default store;