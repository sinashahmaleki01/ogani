<template>
  <Header :show-categories="false" />

  <main class="shop">
    <!------------------|breadcrumb|------------------>
    <section class="breadcrumb">
      <div class="middle">
        <a href="/">Home</a>
        <a href="#">Shop</a>
      </div>
    </section>

    <!------------------|aside + products|------------------>
    <section class="shop-content middle">

      <div class="aside">

        <!-- Active Filters -->
        <div class="active-filters" v-if="hasActiveFilters">

          <div class="filters-list">

            <!-- Category -->
            <span v-if="categoryFilter !== 'All'" class="filter-item">
              {{ categoryFilter }}
              <button @click="clearCategory">×</button>
            </span>

            <!-- Colors -->
            <span v-for="color in colorFilter" :key="color" class="filter-item">
              {{ color }}
              <button @click="removeColor(color)">×</button>
            </span>

            <!-- Sizes -->
            <span v-for="size in sizeFilter" :key="size" class="filter-item">
              {{ size }}
              <button @click="removeSize(size)">×</button>
            </span>

            <!-- Price -->
            <span v-if="priceFilter !== maxPrice" class="filter-item">
              Up to ${{ priceFilter }}
              <button @click="resetPrice">×</button>
            </span>

          </div>
        </div>

        <div class="price">
          <h3>Price</h3>
          <input type="range" v-model="priceFilter" :min="minPrice" :max="maxPrice" />
          <p>${{ minPrice }} - ${{ priceFilter }}</p>
        </div>

        <ul class="categories">
          <li>
            <h3>Categories</h3>
          </li>
          <li v-for="cat in categories" :key="cat" @click="setCategoryFilter(cat)"
            :class="{ active: categoryFilter === cat }">
            {{ cat }}
          </li>
        </ul>

        <div class="filter-section">
          <h3>Colors</h3>
          <ul class="color-options">
            <li v-for="color in colors" :key="color" @click="toggleColor(color)"
              :class="{ selected: colorFilter.includes(color) }">
              <span class="color" :class="color.toLowerCase()"></span> {{ color }}
            </li>
          </ul>
        </div>

        <div class="filter-section">
          <h3>Popular Size</h3>
          <div class="size-options">
            <button v-for="size in sizes" :key="size" @click="toggleSize(size)"
              :class="{ selected: sizeFilter.includes(size) }">
              {{ size }}
            </button>
          </div>
        </div>

        <div class="filter-section">
          <h3>Sort</h3>
          <div class="sort-options">
            <label>
              <input type="radio" value="asc" v-model="sortOrder"> A to Z
            </label>
            <label>
              <input type="radio" value="desc" v-model="sortOrder"> Z to A
            </label>
          </div>
        </div>
      </div>

      <div class="product">
        <ul class="product-items-type-1 products">
          <li v-for="product in filteredProducts" :key="product.id">
            <img :src="product.img" :alt="product.name" @click="goToDetail(product.id)" />
            <div class="name">{{ product.name }}</div>
            <div class="cost">{{ product.cost }}</div>
          </li>
        </ul>
      </div>

    </section>
  </main>

  <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import productsData from '@/data/db.json';

export default {
  name: 'ProductList',
  components: { Header, Footer },
  data() {
    return {
      // Filters
      priceFilter: null,
      categoryFilter: 'All',
      colorFilter: [],
      sizeFilter: [],
      sortOrder: 'asc'
    };
  },
  computed: {
    products() {
      return productsData;
    },
    categories() {
      const cats = this.products.map(p => p.category);
      return ['All', ...new Set(cats)];
    },
    colors() {
      return [...new Set(this.products.map(p => p.color))];
    },
    sizes() {
      return [...new Set(this.products.map(p => p.size))];
    },
    minPrice() {
      return Math.min(...this.products.map(p => parseInt(p.cost.replace('$', ''))));
    },
    maxPrice() {
      return Math.max(...this.products.map(p => parseInt(p.cost.replace('$', ''))));
    },
    filteredProducts() {
      let filtered = this.products;

      const max = this.priceFilter || this.maxPrice;
      filtered = filtered.filter(p => parseInt(p.cost.replace('$', '')) <= max);

      if (this.categoryFilter !== 'All') filtered = filtered.filter(p => p.category === this.categoryFilter);

      if (this.colorFilter.length) filtered = filtered.filter(p => this.colorFilter.includes(p.color));

      if (this.sizeFilter.length) filtered = filtered.filter(p => this.sizeFilter.includes(p.size));

      filtered.sort((a, b) =>
        this.sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );

      return filtered;
    },
    hasActiveFilters() {
      return (
        this.categoryFilter !== 'All' ||
        this.colorFilter.length > 0 ||
        this.sizeFilter.length > 0 ||
        this.priceFilter !== this.maxPrice
      );
    }
  },
  created() {
    this.priceFilter = this.maxPrice;
  },
  methods: {
    setCategoryFilter(cat) {
      this.categoryFilter = cat;
    },
    toggleColor(color) {
      if (this.colorFilter.includes(color)) this.colorFilter = this.colorFilter.filter(c => c !== color);
      else this.colorFilter.push(color);
    },
    toggleSize(size) {
      if (this.sizeFilter.includes(size)) this.sizeFilter = this.sizeFilter.filter(s => s !== size);
      else this.sizeFilter.push(size);
    },
    goToDetail(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: productId.toString() } });
    },
    clearCategory() {
      this.categoryFilter = 'All';
    },
    removeColor(color) {
      this.colorFilter = this.colorFilter.filter(c => c !== color);
    },
    removeSize(size) {
      this.sizeFilter = this.sizeFilter.filter(s => s !== size);
    },
    resetPrice() {
      this.priceFilter = this.maxPrice;
    }
  }
};
</script>


