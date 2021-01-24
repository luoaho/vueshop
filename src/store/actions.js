import {ADD_COUNT, ADD_TO_CART} from "./mutation-type";

export default {
    addCart(context, payload) {
        return new Promise((resolve) => {
            //payload 查找之前数组中是否有该商品
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            //判断oldProduct
            if (oldProduct) {//数量+1
                context.commit(ADD_COUNT, oldProduct)
                resolve('当前商品数量+1')
            }else{//添加新的商品
                payload.count = 1
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新的商品')
            }
        })
    }
}