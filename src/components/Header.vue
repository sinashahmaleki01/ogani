<template>
    <!------------------|header|------------------>
    <header>

        <!----------|main-header|-------->
        <div class="main-header">
            <div class="middle">
                <div class="logo">
                    <img src="/img/logo.png" alt="">
                </div>
                <form action="">
                    <input type="text" placeholder="search">
                    <input type="button" value="SEARCH" class="btn">
                </form>
                 <div class="icons">
                  
                    <router-link to="/Cart" class="cart-icon">
                        <i class="fa-solid fa-cart-plus"></i>
                        <span v-if="cartCount > 0" class="cart-count">{{ cartCount }}</span>
                    </router-link>
                 </div>
               
            </div>
        </div>
        <!----------|nav|-------->
        <nav>
            <div class="middle">

                <ul class="navigation">
                    <li v-if="showCategories" class="nav-list"><i class="fa-solid fa-bars"></i><a href="">SHOP BY
                            CATEGORIES</a>
                        <ul class="nav-list-items">
                            <li>
                                <router-link to="/ProductList"> Fresh Meat</router-link>

                            </li>
                            <li>
                                <router-link to="/ProductList"> Vegetables</router-link>

                            </li>
                            <li>
                                <router-link to="/ProductList"> Fruit & Nut Gifts</router-link>
                            </li>
                            <li>
                                <router-link to="/ProductList"> Fresh Berries</router-link>
                            </li>
                            <li>
                                <router-link to="/ProductList"> Ocean Foods</router-link>
                                <a href="">

                                </a>
                            </li>
                            <li>
                                <router-link to="/ProductList"> Butter & Eggs</router-link>

                            </li>
                            <li>
                                <router-link to="/ProductList"> Fastfood</router-link>

                            </li>
                            <li>
                                <router-link to="/ProductList"> Fresh Onion</router-link>
                            </li>
                            <li>
                                <router-link to="/ProductList"> Papayaya & Crisps</router-link>

                            </li>
                            <li>
                                <router-link to="/ProductList"> Oatmeal</router-link>
                              
                            </li>
                            <li>
                                <router-link to="/ProductList">  Fresh Bananas</router-link>
                              
                            </li>
                        </ul>

                    </li>
                    <ul class="resHamburger">
                        <input class="hambtn" type="checkbox">
                        <span class="hamBar"></span>
                    </ul>
                    <ul class="navbar">
                        <li><router-link to="/">Home</router-link></li>
                        <li><router-link to="/ProductList">Shop</router-link></li>
                        <li><router-link to="/Contact">Contact</router-link></li>
                    </ul>

                </ul>
               
            </div>
        </nav>
    </header>

</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Header',
    props: {
        showCategories: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapState(['cart', 'wishlist']),
        cartCount() {
            return this.cart.reduce((acc, item) => acc + item.quantity, 0);
        },
        wishlistCount() {
            return this.wishlist.length;
        }
    }
}
</script>

<style scoped>

</style>
