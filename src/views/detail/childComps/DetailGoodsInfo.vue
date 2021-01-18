<template>
    <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
        <div class="info-desc clear-fix">
            <div class="start"></div>
            <div class="desc">{{detailInfo.desc}}</div>
            <div class="end"></div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailGoodsInfo",
        props: {
            detailInfo: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                counter: 0,
                imagesLength: 0
            }
        },
        methods: {
            imgLoad() {
                //判断所有图片都加载完了，那么进行一次回调就可以了
                if(++this.counter === this.imagesLength){
                    this.$emit('imageLoad')
                }
            }
        },
        watch: {
            detailInfo() {
                //获取图片的个数
                this.imagesLength = this.detailInfo.detailImage[0].list.length
            }
        }
    }
</script>

<style scoped>
    .goods-info{
        padding: 20px 0;
        border-bottom: 5px solid #f2f5f8;
    }

    .desc{
        padding: 0 12px;
        line-height: 1.5em;
        font-size: 12px;
        color: #666666;
    }

    .info-key{
        padding: 10px 12px;
        font-size: 14px;
    }

    .info-list{
        padding: 10px 0;
    }

    .info-list img{
        max-width: 100%;
        height: auto;
        overflow: hidden;
        margin-bottom: 10px;
    }
</style>