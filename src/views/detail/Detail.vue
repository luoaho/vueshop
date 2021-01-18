<template>
    <div id="detail">
        <detail-nav-bar/>
        <detail-swiper :topImages="topImages"/>
        <detail-base-info :goods="goods"/>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import {getDetail, Goods} from "network/detail";

    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {}
            }
        },
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo
        },
        created() {
            this.iid = this.$route.params.iid
            getDetail(this.iid).then(res => {
                const  data = res.result
                this.topImages = data.itemInfo.topImages
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            })
        }
    }
</script>

<style scoped>

</style>