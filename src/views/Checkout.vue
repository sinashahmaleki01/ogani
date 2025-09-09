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
          <select v-model="form.country" :class="{ error: errors.country }">
            <option value="">Select country (optional)</option>
            <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
          </select>
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
          <select v-model="form.city" :class="{ error: errors.city }">
            <option disabled value="">Select city</option>
            <option v-for="ct in cities" :key="ct" :value="ct">{{ ct }}</option>
          </select>
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

          
          <Validation ref="validator" :model="form" :rules="validationRules" @errors="errors = $event" />
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
import Validation from '@/components/validation.vue';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Checkout",
  components: { Header, Footer, Validation },
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
      errors: {},
      validationRules: {
        firstName: [
          { required: true, message: 'First name is required.' },
          { maxLen: 20, message: 'First name must be at most 20 characters.' }
        ],
        lastName: [
          { required: true, message: 'Last name is required.' },
          { maxLen: 20, message: 'Last name must be at most 20 characters.' }
        ],
        country: [
          { validator: (v, m) => (String(v || '').trim() === '' || ['Iran','America','China','Russia'].includes(String(v))), message: 'Country must be Iran, America, China or Russia.' }
        ],
        address: [{ required: true, message: 'Address is required.' }],
        city: [
          { required: true, message: 'City is required.' },
          { validator: (v, m) => ['Tehran','New York','Beijing','Moscow'].includes(String(v)), message: 'City must be Tehran, New York, Beijing or Moscow.' }
        ],
        state: [{ required: true, message: 'State is required.' }],
        zip: [
          { required: true, message: 'ZIP is required.' },
          { pattern: /^\d+$/, message: 'Valid ZIP code required.' }
        ],
        phone: [
          { required: true, message: 'Phone is required.' },
          { pattern: /^\d{11}$/, message: 'Phone number must be exactly 11 digits.' }
        ],
        email: [
          { required: true, message: 'Email is required.' },
          { type: 'email', message: 'Valid email required.' }
        ],
        password: [
          { required: true, when: m => m.createAccount, message: 'Password is required.' },
          { minLen: 6, when: m => m.createAccount, message: 'Minimum length is 6.' }
        ]
      }
      ,
      countries: ['Iran','America','China','Russia'],
      cities: ['Tehran','New York','Beijing','Moscow']
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
      if (this.$refs && this.$refs.validator && this.$refs.validator.validate) {
        const ok = this.$refs.validator.validate();
        if (this.$refs.validator.currentErrors) {
          this.errors = { ...this.$refs.validator.currentErrors };
        }
        return !!ok;
      }
      return true;
    },
   
    placeOrder() {
      console.log('Place order clicked');
      const ok = this.validateForm();
      console.log('Validation result:', ok);
      console.log('Current errors:', this.errors);
      if (!ok) {
        console.log('Validation failed, not navigating');
        return;
      }
      console.log('Validation passed, navigating to CallBank');
      this.$nextTick(() => {
        this.$router.push('/CallBank');
      });
    }
  }
};
</script>
