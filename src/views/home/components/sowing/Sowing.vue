<template>
    <swiper id="swiper" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(sowing, index) in sowing_list" :key="sowing.public_id">
            <img :src="sowing.icon_url" :alt="sowing.public_name" />
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
    name: "",
    props: {
        sowing_list: Array
    },
    data() {
        return {
            swiperOption: {
                notNextTick: true,
                // 分页
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                loop: true,
                autoplay: {
                    delay: 1500,
                    stopOnLastSlide: false,
                    disableOnInteraction: true
                },
                speed: 500
            }
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
        //this.swiper.slideTo(5, 1000, false);
    },
    components: {
        swiper,
        swiperSlide
    }
};
</script>

<style scoped>
#swiper {
    width: 100%;
    height: 14rem;
}

#swiper img {
    width: 100%;
    height: 100%;
}

/* 
如果一个样式始终修改不了，就只能通过穿透来修改，因为他的优先级别是最高的
 */

#swiper >>> .swiper-pagination-bullet-active {
    background-color: #75a342;
}
</style>