<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button
                    :is-checked="isSelectAll"
                    @click.native="checkClick"
                    class="check-button"/>
            <span>全选</span>
        </div>
        <div class="price">
            总计：{{totalPrice}}
        </div>
        <div class="calculate" @click="calcClick">
            去计算({{checkLength}})
        </div>
    </div>
</template>

<script>
    import CheckButton from "components/content/checkButton/CheckButton";
    import {mapGetters} from 'vuex'
    export default {
        name: "CartBottomBar",
        components: {
            CheckButton
        },
        methods: {
            checkClick() {
                if (this.isSelectAll) {//全部选中
                    this.cartList.forEach(item => item.checked = false)
                }else {//部分或全部不选中
                    this.cartList.forEach(item => item.checked = true)
                }
            },
            calcClick() {
                if (!this.isSelectAll) {
                    this.$toast.show('请选购买的商品', 2000)
                }
            }
        },
        computed: {
            ...mapGetters(['cartList']),
            totalPrice() {
                return '￥' + this.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.price * item.count
                }, 0).toFixed(2)
            },
            checkLength() {
                return this.cartList.filter(item => item.checked).length
            },
            isSelectAll() {
                if (this.cartList.length === 0) return false
                //使用filter函数   性能没有find的好
                //return !(this.cartList.filter(item => !item.checked).length)
                //使用find函数
                //return !this.cartList.find(item => !item.checked)

                //普通遍历
                for(let item of this.cartList) {
                    if (!item.checked) {
                        return false
                    }
                }
                return true
            }
        }
    }
</script>

<style scoped>
    .bottom-bar{
        height: 40px;
        position: relative;
        background-color: #eee;
        display: flex;
        line-height: 40px;
        justify-content: space-between;
    }

    .check-content{
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 60px;
    }

    .check-button{
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }

    .price{
        margin-left: 30px;
        flex: 1;
    }

    .calculate{
        width: 90px;
        text-align: center;
        color: #ffffff;
        background-color: red;
    }
</style>