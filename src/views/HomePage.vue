<template>
    <!------------------|Header|------------------>
    <Header :show-categories="true" />

    <!------------------|main|------------------>
    <main class="index">

        <!-------------|section-slider|------------->
        <section class="slider">
            <div class="middle">
                <router-link to="/ProductList">
                    <img src="/img/1.png" alt="" />
                </router-link>
            </div>
        </section>

        <!-------------|section-category|------------->
        <section class="category middle">
            <ul class="product-category">
                <li>
                    <router-link to="/ProductList">
                        <img src="/img/cat-1.jpg.webp" alt="" />
                        <span>Fruits</span>
                    </router-link>

                </li>
                <li>
                    <router-link to="/ProductList">
                        <img src="/img/cat-2.jpg.webp" alt="" />
                        <span>Dried Fruits</span>
                    </router-link>


                </li>
                <li>
                    <router-link to="/ProductList">
                        <img src="/img/cat-3.jpg.webp" alt="" />
                        <span>Vegetables</span>
                    </router-link>

                </li>
                <li>
                    <router-link to="/ProductList">
                        <img src="/img/cat-4.jpg.webp" alt="" />
                        <span>Drink Fruits</span>
                    </router-link>

                </li>
            </ul>
        </section>

        <!-------------|section-products (Featured)|------------->
        <section class="products middle">
            <div class="section-title">
                <h2>Featured Products</h2>
            </div>

            <ul class="product-items-type-1 products">
                <li v-for="product in products" :key="product.id">
                    <img :src="product.img" :alt="product.name" @click="onchangeDetail(product.id)" />
                    <div class="name">{{ product.name }}</div>
                    <div class="cost">{{ product.cost }}</div>
                </li>
            </ul>

        </section>

        <!-------------|section-catalog|------------->
        <section class="catalog middle">
            <img src="/img/Screenshot 2025-08-01 152817.png" alt="" />
            <img src="/img/Screenshot 2025-08-01 152836.png" alt="" />
        </section>

        <!-------------|section-latest-product|------------->
        <section class="latest-product middle">
            <ul class="titles">
                <li class="section-title">
                    <h2>Latest Products</h2>
                </li>
                <li class="section-title">
                    <h2>Top Rated Products</h2>
                </li>
                <li class="section-title">
                    <h2>Review Products</h2>
                </li>
            </ul>

            <ul class="product-items-type-2 products">
                <li v-for="product in products" :key="product.id + '-latest'">
                    <img :src="product.img" :alt="product.name" @click="onchangeDetail(product.id)" />
                    <div class="name">{{ product.name }}</div>
                    <div class="cost">{{ product.cost }}</div>
                </li>
            </ul>

        </section>

    </main>

    <!------------------|Footer|------------------>
    <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mapActions } from 'vuex';
import productsData from '@/data/db.json';

export default {
    name: 'HomePage',
    components: {
        Header,
        Footer
    },
    data() {
        return {
            products: productsData
        }
    },
    methods: {
        ...mapActions(['addToCart']),
        goToCart(product) {
        
            this.addToCart(product);
           
            this.$router.push({ name: 'Cart' });
        },

        onchangeDetail(productId) {
            this.$router.push({ name: 'ProductDetail', params: { id: productId.toString() } });
        }


    }
}
</script>
