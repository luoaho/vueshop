<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control :title="['流行','新款','精选']"/>
    </div>
</template>

<script>
    import NavBar from "components/common/navbaar/NavBar";
    import TabControl from "components/content/tabControl/TabControl";

    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import {getHomeMultidata} from "network/home";

    export default {
        name: "Home",
        data() {
            return {
                banners: [],
                recommends: []
            }
        },
        components: {
            NavBar,
            TabControl,
            HomeSwiper,
            RecommendView,
            FeatureView
        },
        created() {
            //1、请求多个数据
            getHomeMultidata().then(res => {
                //console.log(res)
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
        }
    }
</script>

<style scoped>
    #home{
        padding-top: 44px;
    }
    .home-nav {
        background-color: var(--color-tint);
        color: #ffffff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }
</style>
