<template>
    <!---------------|Footer|--------------->
    <footer>
        <div class="middle footer-box">
            <div class="footer-left">
                <img src="/img/logo.webp" alt="logo" />
                <p>Address: 60-49 Road 11378 New York</p>
                <p>Phone: +65 11.188.888</p>
                <p>Email: hello@colorlib.com</p>
            </div>
            <div class="footer-center">
                <h3 class="txt-m">Useful Links</h3>
                <ul>
                    <li><router-link to="/Contact">Contact</router-link></li>
                    <li><router-link to="/ProductList">shop</router-link></li>
                </ul>
            </div>
            <div class="footer-right">
                <h3 class="txt-m">Join Our Newsletter Now</h3>
                <p>Get E-mail updates about our latest shop and special offers.</p>
                <form>
                    <input type="email" placeholder="Enter your mail" />
                    <input type="button" class="btn-green" value="Subscribe" />
                </form>

            </div>
        </div>
        <div class="middle footer-end">
            <p>Copyright ©2025 All rights reserved</p>
            <img src="/img/payment-item.webp" alt="payment" />
        </div>
    </footer>

</template>

<script>

export default {
    name: 'Footer'
}
</script>