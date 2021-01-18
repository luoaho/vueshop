import Vue from "vue"
import VueRouter from "vue-router";
//安装插件
Vue.use(VueRouter)
//解决vue-router重复点击报错问题（this.$router.replace()）
const originalPush = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originalPush.call(this, location).catch(err => err);
};
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')
//创建routers
const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/detail/:iid',
        component: Detail
    }
]
const router = new VueRouter({
    routes,
    mode: 'history'
})
export default router