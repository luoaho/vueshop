<template>
    <div>
        <nav-bar>
            <div slot="left" class="left" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div class="title-item"
                     v-for="(item, index) in tittles"
                     @click="titleClick(index)"
                     :class="{active: index === currentIndex}"
                     :key="index">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
    import NavBar from "components/common/navbaar/NavBar";
    export default {
        name: "DetailNavBar",
        components: {
            NavBar
        },
        data() {
            return {
                tittles: ['商品','参数','评论','推荐'],
                currentIndex: 0
            }
        },
        methods: {
            titleClick(index) {
                this.currentIndex = index
            },
            backClick() {
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .title{
        display: flex;
    }

    .title-item{
        flex: 1;
        font-size: 13px;
    }

    .left img{
        margin-top: 12px;
    }

    .active{
        color: var(--color-high-text);
    }
</style>