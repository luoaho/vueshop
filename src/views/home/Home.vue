<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>
        <tab-control :title="['流行','新款','精选']" class="tab-control"
        @tabClick="tabClick"/>
        <goods-list :goods="showGoods"/>
    </div>
</template>

<script>
    import NavBar from "components/common/navbaar/NavBar";
    import TabControl from "components/content/tabControl/TabControl";
    import GoodsList from "components/content/goods/GoodsList";

    import HomeSwiper from "./childComps/HomeSwiper";
    import RecommendView from "./childComps/RecommendView";
    import FeatureView from "./childComps/FeatureView";

    import {getHomeMultidata, getHomeGoods} from "network/home";

    export default {
        name: "Home",
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []}
                },
                currentType: 'pop'
            }
        },
        components: {
            NavBar,
            TabControl,
            HomeSwiper,
            RecommendView,
            FeatureView,
            GoodsList
        },
        created() {
            //1、请求多个数据
            this.getHomeMultidata();
            //2、请求商品数据
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        methods: {
            /**
             *
             * 事件监听的方法
             * */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2 :
                        this.currentType = 'sell'
                        break
                }
            },

            /**
            * 网络请求相关的方法
            * */
            getHomeMultidata() {
                getHomeMultidata().then(res => {
                    //console.log(res)
                    this.banners = res.data.banner.list;
                    this.recommends = res.data.recommend.list;
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    //console.log(res)
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1
                })
            }
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
    
    .tab-control{
        position: sticky;
        top: 44px;
    }
</style>
