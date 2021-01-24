<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info :param-info="paramInfo" ref="params"/>
            <detail-comment-info :comment-info="commentInfo" ref="comment"/>
            <goods-list :goods="recommends" ref="recommend"/>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"/>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import Scroll from "components/common/scroll/Scroll";
    import GoodsList from "components/content/goods/GoodsList";

    import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
    import {debounce} from 'common/utils'
    import {backTopMixin} from 'common/mixin'

    import { mapActions } from 'vuex'
    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0
            }
        },
        mixins: [backTopMixin],
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar
        },
        created() {
            this.iid = this.$route.params.iid
            getDetail(this.iid).then(res => {
                const  data = res.result
                //1、获取顶部的图片轮播数据
                this.topImages = data.itemInfo.topImages
                //2、获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                //3、创建店铺信息的对象
                this.shop = new Shop(data.shopInfo)
                //4、商品详细数据
                this.detailInfo = data.detailInfo
                //5、参数信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                //6、评论信息
                if (data.rate.cRate !== 0){
                    this.commentInfo = data.rate.list[0]
                }
            })
            getRecommend().then(res => {
                this.recommends = res.data.list
            })
            this.getThemeTopY = debounce(() => {
                this.themeTopYs = []
                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            }, 100)
        },
        methods: {
            ...mapActions(['addCart']),
            imageLoad() {
                this.$refs.scroll.refresh()
                this.getThemeTopY()
            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 250)
            },
            contentScroll(position) {
                const positionY = -position.y
                let length = this.themeTopYs.length
                for (let i = 0; i < length ; i++ ) {
                    if (this.currentIndex !== i && (i < length-1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY > this.themeTopYs[i])) {
                        this.currentIndex = i ;
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                    this.listenShowBackTop(position)
                }
            },
            addToCart() {
                //1.获取购物车需要展示的信息
                const  product = {}
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.detailInfo.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid
                //2.将商品加入到购物车
                //利用mapActions方法
                this.addCart(product).then(res => {
                    this.$toast.show(res, 1500)
                })

                //普通方法
                // this.$store.dispatch('addCart', product).then(res => {
                //     console.log(res)
                // })
            }
        },
        mounted() {
            //1、图片加载完成的事件监听
            const refresh = debounce(this.$refs.scroll.refresh, 50)
            this.$bus.$on('detailItemImageLoad', () => {
                refresh()
            })
        }
    }
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        height: 100vh;
        overflow: hidden;
        background-color: #ffffff;
    }

    .content{
        height: calc(100% - 44px);
    }

    .detail-nav{
        position: relative;
        background-color: #ffffff;
        top: 0;
        left: 0;
        z-index: 9;
    }
</style>