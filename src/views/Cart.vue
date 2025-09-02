<template>
  <Header :show-categories="false" />

  <main class="cart">
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
          <td class="txt-l">{{ item.cost }}</td>
          <td>
            <button class="btn-gray" @click="decreaseQuantity(item)">-</button>
            <p class="btn-gray">{{ item.quantity }}</p>
            <button class="btn-gray" @click="increaseQuantity(item)">+</button>
          </td>
          <td class="txt-l">${{ (parseFloat(item.cost.replace('$', '')) * item.quantity).toFixed(2) }}</td>
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
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Cart',
  components: { Header, Footer },

  data() {
    return {
      couponCode: '',
      discountAmount: 0,
    };
  },

  computed: {
    ...mapState(['cart']),
    subtotal() {
      return this.cart.reduce((acc, item) => acc + parseFloat(item.cost.replace('$', '')) * item.quantity, 0);
    },
    total() {
      
      return this.subtotal;
    }
  },
  methods: {
    ...mapMutations(['addToCart', 'removeFromCart', 'updateQuantity']),
    increaseQuantity(item) {
      this.updateQuantity({ id: item.id, change: 1 });
    },
    decreaseQuantity(item) {
      this.updateQuantity({ id: item.id, change: -1 });
    },
    
    removeItem(item) {
      this.removeFromCart(item.id);
    },
    updateCart() { }
  }

};
</script>
