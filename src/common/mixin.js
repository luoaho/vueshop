import BackTop from "components/content/backTop/BackTop";
export const backTopMixin= {
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0 ,300)
        },
        listenShowBackTop(position) {
            if(Math.abs(position.y) > 1000){
                this.isShowBackTop = true
            }else {
                this.isShowBackTop = false
            }
        }
    },
    components: {
        BackTop
    }
}