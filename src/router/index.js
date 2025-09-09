import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import ProductList from '@/views/ProductList.vue'
import Checkout from '@/views/Checkout.vue'
import Cart from '@/views/Cart.vue'
import CallBank from '@/views/CallBank.vue'
import NotFound from '@/views/NotFound.vue'
import Contact from '@/views/Contact.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetail,
      props: true
    },
    {
      path: '/ProductList',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/Checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/CallBank',
      name: 'CallBank',
      component: CallBank
    },
    {
      path: '/Contact',
      name: 'Contact',
      component: Contact
    },
   
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }


  ],
})

export default router
