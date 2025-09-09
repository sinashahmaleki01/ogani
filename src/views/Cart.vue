<template>
  <Header :show-categories="false" />

  <main class="cart">
    <Notification :show="notify.show" :type="notify.type" :message="notify.message" />
    <!------------------|breadcrumb|------------------>
    <section class="breadcrumb">
      <div class="middle">
        <router-link to="/">Home</router-link>
        <a href="#">Cart</a>
      </div>
    </section>

    <!------------------|Products|------------------>
    <section class="products middle" v-if="cart.length">
      <table>
        <tr>
          <th class="txt-l">Products</th>
          <th class="txt-l">Price</th>
          <th class="txt-l">Quantity</th>
          <th class="txt-l">Total</th>
          <th class="txt-l"></th>
        </tr>
        <tr v-for="item in cart" :key="item.id">
          <td>
            <img :src="item.img" :alt="item.name" />
            <span>{{ item.name }}</span>
          </td>
          <td class="txt-l">${{ discountedUnitPrice(item).toFixed(2) }}</td>
          <td>
            <button class="btn-gray" @click="decreaseQuantity(item)">-</button>
            <p class="btn-gray">{{ item.quantity }}</p>
            <button class="btn-gray" @click="increaseQuantity(item)">+</button>
          </td>
          <td class="txt-l">${{ rowTotal(item).toFixed(2) }}</td>
          <td @click="removeItem(item)" class="remove-btn">&times;</td>
        </tr>
      </table>

      <div class="products-btns">
        <button class="btn-gray" @click="$router.push('/')">CONTINUE SHOPPING</button>

      </div>
    </section>

    <section v-else class="middle empty-cart">
      <p>Your cart is empty</p>
      <router-link to="/ProductList" class="back-to-shop">← Back to Shop</router-link>
    </section>
    <!------------------|Discount + Cart Total|------------------>
    <section class="discount middle" v-if="cart.length">
      <div class="discount-left">
        <p class="txt-l">Discount Codes</p>
        <form @submit.prevent="applyCoupon">
          <input v-model="couponCode" type="text" placeholder="Enter your coupon code" />
          <input type="submit" class="btn-dark" value="APPLY COUPON" />
        </form>
      </div>

      <div class="discount-right">
        <p class="txt-l">Cart Total</p>
        <ul>
          <li>
            <span class="txt-m">Subtotal</span>
            <div>${{ subtotal.toFixed(2) }}</div>
          </li>
          <li>
            <span class="txt-m">Total</span>
            <div>${{ total.toFixed(2) }}</div>
          </li>
        </ul>
        <button class="btn-green" @click="$router.push('/checkout')">PROCEED TO CHECKOUT</button>
      </div>
    </section>
  </main>

  <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Notification from '@/components/notification.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Cart',
  components: { Header, Footer, Notification },

  data() {
    return {
      couponCode: '',
      discountApplied: false,
      notify: { show: false, type: 'success', message: '' }
    };
  },

  computed: {
    ...mapState(['cart']),
    subtotal() {
      return this.cart.reduce((acc, item) => acc + this.parsePrice(item.cost) * item.quantity, 0);
    },
    total() {
      const factor = this.discountApplied ? 0.5 : 1;
      return this.subtotal * factor;
    }
  },
  methods: {
    ...mapMutations(['addToCart', 'removeFromCart', 'updateQuantity']),
    parsePrice(str) {
      const n = parseFloat((str || '').toString().replace(/[^0-9.]/g, ''));
      return isNaN(n) ? 0 : n;
    },
    discountedUnitPrice(item) {
      const base = this.parsePrice(item.cost);
      return this.discountApplied ? base * 0.5 : base;
    },
    rowTotal(item) {
      return this.discountedUnitPrice(item) * item.quantity;
    },
    increaseQuantity(item) {
      this.updateQuantity({ id: item.id, change: 1 });
    },
    decreaseQuantity(item) {
      this.updateQuantity({ id: item.id, change: -1 });
    },
    
    removeItem(item) {
      this.removeFromCart(item.id);
    },
    updateCart() { },
    applyCoupon() {
      if (this.couponCode.trim() === '111') {
        this.discountApplied = true;
        this.showNotify('Coupon applied successfully.', 'success');
      } else {
        this.discountApplied = false;
        this.showNotify('Invalid coupon code.', 'error');
      }
    },
    showNotify(message, type) {
      this.notify.message = message;
      this.notify.type = type;
      this.notify.show = true;
      window.clearTimeout(this._notifyTimer);
      this._notifyTimer = window.setTimeout(() => {
        this.notify.show = false;
      }, 2000);
    }
  }

};
</script>

<style scoped>
.notify-wrapper {
  position: relative;
}
</style>
