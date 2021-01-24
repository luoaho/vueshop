<template>
    <div class="cart">
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <!--商品的列表-->
        <cart-list></cart-list>
        <!--底部总计-->
        <cart-bottom-bar/>
    </div>
</template>

<script>
    import NavBar from "components/common/navbaar/NavBar";
    import CartList from "./childComps/CartList";
    import CartBottomBar from "./childComps/CartBottomBar"
    import {mapGetters} from 'vuex'
    export default {
        name: "Cart",
        components: {
            NavBar,
            CartList,
            CartBottomBar
        },
        computed: {
            ...mapGetters(['cartLength'])
        }
    }
</script>

<style scoped>
    .cart{
        height: 100vh;
    }

    .nav-bar{
        background-color: var(--color-tint);
        color: #ffffff;
    }
</style>
