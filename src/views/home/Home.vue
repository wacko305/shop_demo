<template>
    <div id="home">
        <div v-if="!showLoading">
            <Header />
            <!--轮播图-->
            <Sowing :sowing_list="sowing_list" />
            <!--中部导航-->
            <Nav :nav_list="nav_list" />
            <!-- 秒杀 -->
            <FlashSale :flash_sale_product_list="flash_sale_product_list" />
            <!-- 猜你喜欢 -->
            <YouLike :you_like_product_list="you_like_product_list" />
            <!-- 返回顶部 -->
            <MarkPage v-if="showBackSatus" :scrollToTop="scrollToTop" />
        </div>

        <van-loading
            v-else
            type="spinner"
            color="#75a342"
            style="position: absolute; top: 50%;left: 15%"
            >别急客官，奴家正在拼命为您加载……</van-loading
        >
    </div>
</template>

<script>
//1.引入
import { getHomeData } from "@/service/api/index"

//2.引入组件
import Header from "./components/header/Header"
import Sowing from "./components/sowing/Sowing"
import Nav from "./components/nav/Nav"
import FlashSale from "./components/flashSale/FlashSale"
import YouLike from "./components/youLike/YouLike"
import MarkPage from "./components/markPage/MarkPage"

//3.引入处理返回顶部的函数
import { showBack, animate } from "@/config/globle"

//4.引入通知组件
import PubSub from "pubsub-js"
import { Toast } from "vant"

//5.引入vuex
import { mapMutations } from "vuex"

export default {
    name: "Home",
    data() {
        return {
            //首页轮播图数据
            sowing_list: [],
            //导航数据
            nav_list: [],
            //秒杀数据
            flash_sale_product_list: [],
            //猜你喜欢数据
            you_like_product_list: [],
            //是否显示加载图标
            showLoading: true,
            //是否显示返回顶部的按钮
            showBackSatus: false
        }
    },
    created() {
        //2.请求网络数据
        this.reqData()
    },
    mounted() {
        //订阅消息（添加到购物车的消息）
        PubSub.subscribe("homeAddToCart", (msg, goods) => {
            if (msg === "homeAddToCart") {
                this.ADD_GOODS({
                    goodsId: goods.id,
                    goodsName: goods.name,
                    smallImage: goods.small_image,
                    goodsPrice: goods.price
                })
                //提示用户
                Toast({
                    message: "添加到购物车成功！",
                    duration: 800
                })
            }
        })
    },
    components: {
        Header,
        Sowing,
        Nav,
        FlashSale,
        YouLike,
        MarkPage
    },
    methods: {
        ...mapMutations(["ADD_GOODS"]),
        async reqData() {
            let response = await getHomeData()
            if (response.success) {
                this.sowing_list = response.data.list[0].icon_list
                this.nav_list = response.data.list[2].icon_list
                this.flash_sale_product_list =
                    response.data.list[3].product_list
                this.you_like_product_list = response.data.list[12].product_list

                //隐藏加载动画
                this.showLoading = false

                //开始监听滚动,到达一定位置就显示返回顶部按钮
                showBack(status => {
                    //console.log(status);
                    this.showBackSatus = status
                })
            }
        },
        scrollToTop() {
            //做缓动动画返回顶部
            let docB = document.documentElement || document.body
            animate(docB, { scrollTop: "0" }, 400, "ease-out")
        }
    }
}
</script>

<style lang="less" scoped>
#home {
    width: 100%;
    height: 3000px;
    background-color: #f5f5f5;
}
</style>
