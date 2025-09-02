<template>
    <!------------------|Header|------------------>
    <Header :show-categories="false" />

    <!---------------|Main|--------------->
    <main class="login">
        <section class="breadcrumb">
            <div class="middle">
                <router-link to="/">Home</router-link>
                <a>Login</a>
            </div>
        </section>

        <section class="login-box middle">
            <p class="txt-l">Login</p>
            <form class="login-form" @submit.prevent="submitLogin">
                <!-- Email -->
                <label>Email</label>
                <input type="text" v-model="email" :class="{ error: errors.email }" placeholder="Enter your email" />
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>

                <!-- Password -->
                <label>Password</label>
                <input type="password" v-model="password" :class="{ error: errors.password }"
                    placeholder="Enter your password" />
                <span v-if="errors.password" class="error-message">{{ errors.password }}</span>

                <!-- Remember me -->
                <span class="checked">
                    <input type="checkbox" v-model="remember" />
                    Remember me
                </span>

                <!-- Button -->
                <button type="submit" class="btn-green">Login</button>
            </form>
        </section>
    </main>

    <!------------------|Footer|------------------>
    <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "Login",
    components: { Header, Footer },
    data() {
        return {
            email: "",
            password: "",
            remember: false,
            errors: {}
        };
    },
    methods: {
        validate() {
            this.errors = {};
            if (
                !this.email.trim() ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
            ) {
                this.errors.email = "Valid email required.";
            }
            if (!this.password.trim()) {
                this.errors.password = "Password is required.";
            }
            return Object.keys(this.errors).length === 0;
        },
        submitLogin() {
            if (!this.validate()) return;
        }
    }
};
</script>


