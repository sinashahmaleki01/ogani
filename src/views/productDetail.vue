<template>
  <Header :show-categories="false" />

  <!---------------|Main|--------------->
  <main class="product-details">
    <!------------------|breadcrumb|------------------>
    <section class="breadcrumb">
      <div class="middle">
        
        <router-link to="/">Home</router-link>
        <a v-if="product">/ {{ product.name }}</a>
      </div>
    </section>

    <!---------------|Product Detail|--------------->
    <section v-if="product" class="product-detail  middle">
      <div class="product-image-section">
        <img class="main-img" :src="product.img" :alt="product.name" />
      </div>

      <div class="product-info-section">
        <p>{{ product.name }}</p>
        <div class="rating">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <span>(18 reviews)</span>
        </div>

        <div class="price">{{ product.cost }}</div>

        <div class="description">
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam
          vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Proin eget tortor risus.
        </div>

        <!---------------|Quantity & Add to Cart|--------------->
        <div class="quantity-add">
          <div class="quantity-box" v-if="!isInCart">
            <button @click="decreaseQuantity">-</button>
            <span>{{ quantity }}</span>
            <button @click="increaseQuantity">+</button>
          </div>

          <button v-if="!isInCart" class="add-to-cart" @click="addProductToCart">
            ADD TO CART
          </button>
          <router-link v-else class="add-to-cart" :to="{ name: 'Cart' }">
            GO TO CART
          </router-link>

          <div v-if="isInCart" class="cancel-message" style="margin-left: 8px;">
            <span class="txt-s">Added. Want to cancel your order?</span>
            <button class="btn-gray" @click="cancelOrder" style="margin-left: 8px;">Cancel</button>
          </div>

         
        </div>
      </div>
    </section>

  
  </main>

  <!------------------|footer|------------------>
  <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import productsData from '@/data/db.json';

export default {
  name: 'ProductDetail',
  components: { Header, Footer },
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return { product: null, quantity: 1 };
  },
  computed: {
    isInCart() {
      if (!this.product) return false;
      return this.$store.state.cart.some(p => p.id === this.product.id);
    }
  },
  created() {
    const id = (this.id || this.$route.params.id).toString();
    this.product = productsData.find(p => p.id.toString() === id) || null;
  },
  methods: {
    increaseQuantity() { this.quantity++; },
    decreaseQuantity() { if (this.quantity > 1) this.quantity--; },
    addProductToCart() {
      if (!this.product) return;
      if (this.isInCart) {
        this.$router.push({ name: 'Cart' });
        return;
      }
      this.$store.commit('addToCart', { ...this.product, quantity: this.quantity });
    },
    cancelOrder() {
      if (!this.product) return;
      this.$store.commit('removeFromCart', this.product.id);
      this.quantity = 1;
    }
  }
}
</script>
