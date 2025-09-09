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
            <ul class="product-category" ref="categoryList">
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
            products: productsData,
            _categorySlider: {
                containerEl: null,
                itemsEls: [],
                itemWidth: 0,
                gapPx: 20,
                currentIndex: 0,
                isDragging: false,
                startX: 0,
                currentTranslate: 0,
                prevTranslate: 0,
                autoTimer: 0,
                resizeObserver: null
            },
            _categoryTransitioning: false,
            _categoryTransitionEndTimer: 0,
            _productsAutoTimers: []
        }
    },
    computed: {},
    mounted() {
        this.$nextTick(() => {
            this.initializeCategorySwiper();
            this.initializeProductsSwipers();
        });
    },
    beforeDestroy() {
        this.teardownCategorySwiper();
        this.teardownProductsSwipers();
    },
    methods: {
        ...mapActions(['addToCart']),
        goToCart(product) {
        
            this.addToCart(product);
           
            this.$router.push({ name: 'Cart' });
        },

        onchangeDetail(productId) {
            this.$router.push({ name: 'ProductDetail', params: { id: productId.toString() } });
        },

        // ================= Category Swiper (Vue 2, auto rotate items) =================
        initializeCategorySwiper() {
            const ul = this.$refs.categoryList;
            if (!ul) return;

            const slider = this._categorySlider;
            slider.containerEl = ul;

            // Compute gap from CSS grid if present
            const computed = window.getComputedStyle(ul);
            const gap = parseInt(computed.columnGap || computed.gap || '20', 10);
            slider.gapPx = isNaN(gap) ? 20 : gap;

            // Lock each li width to its current rendered width (prevents size changes)
            const items = Array.from(ul.children);
            if (!items.length) return;
            slider.itemsEls = items;
            items.forEach((li) => {
                const rect = li.getBoundingClientRect();
                li.style.flex = `0 0 ${rect.width}px`;
                li.style.width = `${rect.width}px`;
            });
            slider.itemWidth = items[0].getBoundingClientRect().width;

            // Autoplay: smoother double-fade (out before move, in after move)
            const autoplay = () => {
                const first = ul.querySelector('li');
                if (!first) return;
                first.classList.add('category-rotating-item');
                first.classList.remove('fade-in');
                first.classList.add('fade-out');
                window.setTimeout(() => {
                    ul.appendChild(first);
                    // fade in at new position
                    first.classList.remove('fade-out');
                    first.classList.add('fade-in');
                }, 330);
            };
            slider.autoTimer = window.setInterval(autoplay, 2400);

            // Resize handling to keep sizes stable
            const handleResize = () => {
                slider.itemsEls.forEach((li) => {
                    const rect = li.getBoundingClientRect();
                    li.style.flex = `0 0 ${rect.width}px`;
                    li.style.width = `${rect.width}px`;
                });
                slider.itemWidth = slider.itemsEls[0].getBoundingClientRect().width;
                const offset = -(slider.currentIndex * (slider.itemWidth + slider.gapPx));
                slider.currentTranslate = offset;
                slider.prevTranslate = offset;
            };
            slider.resizeObserver = new ResizeObserver(handleResize);
            slider.resizeObserver.observe(ul);

            // Initial state
            slider.currentIndex = 0;
        },
        teardownCategorySwiper() {
            const slider = this._categorySlider;
            window.clearInterval(slider.autoTimer);
            if (slider.resizeObserver) {
                try { slider.resizeObserver.disconnect(); } catch (e) {}
            }
        },

        // ================= Apply same auto-rotate to all ul.products =================
        initializeProductsSwipers() {
            const lists = this.$el && this.$el.querySelectorAll('ul.products');
            if (!lists || !lists.length) return;
            this.teardownProductsSwipers();
            lists.forEach((ul) => {
                // lock current widths to keep layout stable
                const items = Array.from(ul.children);
                items.forEach((li) => {
                    const rect = li.getBoundingClientRect();
                    if (rect && rect.width) {
                        li.style.width = `${rect.width}px`;
                    }
                });
                const timer = window.setInterval(() => {
                    const first = ul.querySelector('li');
                    if (!first) return;
                    first.style.transition = 'opacity 300ms ease';
                    first.style.opacity = '0';
                    window.setTimeout(() => {
                        ul.appendChild(first);
                        first.style.transition = 'opacity 300ms ease';
                        first.style.opacity = '0';
                        requestAnimationFrame(() => {
                            first.style.opacity = '1';
                        });
                    }, 310);
                }, 3000);
                this._productsAutoTimers.push(timer);
            });
        },
        teardownProductsSwipers() {
            if (!this._productsAutoTimers || !this._productsAutoTimers.length) return;
            this._productsAutoTimers.forEach((t) => window.clearInterval(t));
            this._productsAutoTimers = [];
        }


    }
}
</script>