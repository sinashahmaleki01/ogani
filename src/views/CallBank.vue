<template>

    <!------------------|Header|------------------>
    <Header :show-categories="false" />
    <!------------------|Main|------------------>
    <main class="callbank-page">
        <section class="breadcrumb">
            <div class="middle">
                <router-link to="/">Home</router-link>
                <a href="">CallBank</a>
            </div>
        </section>

        <section class="success-section">
            <div class="middle">
                <div class="success-box">
                    <div class="icon">&#10003;</div>
                    <h1>Payment Successful</h1>
                    <p>Your order has been placed successfully. A confirmation email has been sent to your inbox.</p>
                    <router-link to="/" class="back-home">Back to Home</router-link>
                </div>
            </div>
        </section>
    </main>
    <!------------------|Footer|------------------>
    <Footer />

</template>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';


export default {
    name: 'CallBank',
    components: {
        Header,
        Footer
    }
}

</script>