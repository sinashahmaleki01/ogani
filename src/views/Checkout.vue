<template>
  <!------------------|Header|------------------>
  <Header :show-categories="false" />

  <!---------------|Main|--------------->
  <main class="checkout">
    <!------------------|breadcrumb|------------------>
    <section class="breadcrumb">
      <div class="middle">
        <router-link to="/">Home</router-link>
        <a>checkout</a>
      </div>
    </section>

    <!---------------|Billing|--------------->
    <section class="billing middle">
      <p class="txt-l">Billing Details</p>
      <div class="billing-box">
        <!-- Left form -->
        <form class="billing-left" @submit.prevent="placeOrder">
          <div>
            <div>
              <label>First Name</label>
              <input
                type="text"
                v-model="form.firstName"
                :class="{ error: errors.firstName }"
              />
              <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                v-model="form.lastName"
                :class="{ error: errors.lastName }"
              />
              <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
            </div>
          </div>

          <label>Country</label>
          <input
            type="text"
            v-model="form.country"
            :class="{ error: errors.country }"
          />
          <span v-if="errors.country" class="error-message">{{ errors.country }}</span>

          <label>Address</label>
          <input
            type="text"
            placeholder="Street Address"
            v-model="form.address"
            :class="{ error: errors.address }"
          />
          <span v-if="errors.address" class="error-message">{{ errors.address }}</span>

          <input
            type="text"
            placeholder="Apartment, Suite, Unit etc (optional)"
            v-model="form.address2"
          />

          <label>Town / City</label>
          <input
            type="text"
            v-model="form.city"
            :class="{ error: errors.city }"
          />
          <span v-if="errors.city" class="error-message">{{ errors.city }}</span>

          <label>Country / State</label>
          <input
            type="text"
            v-model="form.state"
            :class="{ error: errors.state }"
          />
          <span v-if="errors.state" class="error-message">{{ errors.state }}</span>

          <label>Postcode / ZIP</label>
          <input
            type="text"
            v-model="form.zip"
            :class="{ error: errors.zip }"
          />
          <span v-if="errors.zip" class="error-message">{{ errors.zip }}</span>

          <div>
            <div>
              <label>Phone</label>
              <input
                type="text"
                v-model="form.phone"
                :class="{ error: errors.phone }"
              />
              <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                v-model="form.email"
                :class="{ error: errors.email }"
              />
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
          </div>

          <span class="checked">
            <input type="checkbox" v-model="form.createAccount" />
            Create an account?
          </span>
          <p>
            Create an account by entering the information below. If you are a
            returning customer please login at the top of the page
          </p>

          <label v-if="form.createAccount">Account Password</label>
          <input
            v-if="form.createAccount"
            type="text"
            v-model="form.password"
            :class="{ error: errors.password }"
          />
          <span
            v-if="errors.password && form.createAccount"
            class="error-message"
            >{{ errors.password }}</span
          >

          <span class="checked">
            <input type="checkbox" v-model="form.shipDifferent" />
            Ship to a different address?
          </span>

          <label>Order notes</label>
          <input type="text" v-model="form.notes" />
        </form>

        <div class="billing-right">
          <p class="txt-l">Your Order</p>
          <ul class="prices">
            <li>
              <div>
                <span class="txt-m">Products</span>
                <span class="txt-m">Total</span>
              </div>
              <ul class="sub-prices">
                <li v-for="item in cart" :key="item.id">
                  <span class="txt-s">{{ item.name }} × {{ item.quantity }}</span>
                  <span class="txt-m">{{ formatPrice(toNumber(item.cost) * item.quantity) }}</span>
                </li>
              </ul>
            </li>
            <li>
              <span class="txt-m">Subtotal</span>
              <span class="txt-m">{{ formatPrice(subtotal) }}</span>
            </li>
            <li>
              <span class="txt-m">Total</span>
              <span class="txt-m price-red">{{ formatPrice(total) }}</span>
            </li>
          </ul>
          <button class="btn-green" @click="placeOrder">Place order</button>
        </div>
      </div>
    </section>
  </main>

  <!------------------|footer|------------------>
  <Footer />
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Checkout",
  components: { Header, Footer },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        country: "",
        address: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
        email: "",
        createAccount: false,
        password: "",
        shipDifferent: false,
        notes: ""
      },
      errors: {}
    };
  },
  computed: {
    ...mapState(["cart"]),
    subtotal() {
      return this.cart.reduce(
        (sum, item) => sum + this.toNumber(item.cost) * item.quantity,
        0
      );
    },
    total() {
      return this.subtotal;
    }
  },
  methods: {
    toNumber(value) {
      if (!value) return 0;
      return parseFloat(value.toString().replace(/[^0-9.]/g, "")) || 0;
    },
    formatPrice(value) {
      return `$${value.toFixed(2)}`;
    },
    validateForm() {
      this.errors = {};
      if (!this.form.firstName.trim()) {
        this.errors.firstName = "First name is required.";
      }
      if (!this.form.lastName.trim()) {
        this.errors.lastName = "Last name is required.";
      }
      if (!this.form.country.trim()) {
        this.errors.country = "Country is required.";
      }
      if (!this.form.address.trim()) {
        this.errors.address = "Address is required.";
      }
      if (!this.form.city.trim()) {
        this.errors.city = "City is required.";
      }
      if (!this.form.state.trim()) {
        this.errors.state = "State is required.";
      }
      if (!this.form.zip.trim() || !/^[0-9]+$/.test(this.form.zip)) {
        this.errors.zip = "Valid ZIP code required.";
      }
      if (!this.form.phone.trim() || !/^[0-9\-\+\s]+$/.test(this.form.phone)) {
        this.errors.phone = "Valid phone required.";
      }
      if (
        !this.form.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)
      ) {
        this.errors.email = "Valid email required.";
      }
      if (this.form.createAccount && !this.form.password.trim()) {
        this.errors.password = "Password is required.";
      }
      return Object.keys(this.errors).length === 0;
    },
    placeOrder() {
      if (!this.validateForm()) return;
    
    }
  }
};
</script>
