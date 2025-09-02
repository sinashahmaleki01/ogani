import { createStore } from 'vuex';

const store = createStore({
  state: {
    cart: []
  },
  getters: {
    cartItems: state => state.cart,
    cartCount: state => state.cart.reduce((n, i) => n + i.quantity, 0),
    cartTotal: state =>
      state.cart.reduce((sum, i) => sum + parseFloat(i.cost.replace('$', '')) * i.quantity, 0)
  },
  mutations: {
    addToCart(state, product) {
      const existing = state.cart.find(p => p.id === product.id);
      if (existing) {
        existing.quantity += product.quantity ? product.quantity : 1;
      } else {
        state.cart.push({ ...product, quantity: product.quantity ? product.quantity : 1 });
      }
    },
    removeFromCart(state, id) {
      state.cart = state.cart.filter(item => item.id !== id);
    },
    updateQuantity(state, { id, change }) {
      const item = state.cart.find(p => p.id === id);
      if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
    
  }
});

export default store;
