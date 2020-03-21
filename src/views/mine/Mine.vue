<template>
	<!-- v-if="userInfo.token" -->
	<div id="mine" v-if="userInfo.token">
		<van-nav-bar title="我的" :fixed="true" :border="false" />

		<van-cell-group style="margin-top: 2.6rem">
			<van-cell
				is-link
				style="background-color:#3bba63;color:#fff"
				:center="true"
				@click="$router.push('/dashboard/mine/userCenter')"
			>
				<!-- 使用 title 插槽来自定义标题 -->
				<template slot="title">
					<div class="personMag">
						<img :src="userInfo.icon_url" alt="" />
						<div class="personInfo">
							<span>{{ userInfo.real_name }}</span>
							<span>手机号：{{ userInfo.phone }}</span>
						</div>
					</div>
				</template>
			</van-cell>
		</van-cell-group>

		<van-cell-group>
			<van-cell title="我的订单" value="查看所有订单" is-link icon="label" />
			<van-grid :column-num="4">
				<van-grid-item
					v-for="(order, index) in orderData"
					:key="index"
					:icon="order.icon"
					:text="order.title"
				/>
			</van-grid>
		</van-cell-group>

		<van-cell-group style="margin-top: 0.6rem">
			<van-cell title="我的优惠券" value="1张" is-link icon="coupon" />
			<van-cell title="我的收货地址" is-link icon="comment" />
		</van-cell-group>

		<van-cell-group style="margin-top: 0.6rem">
			<van-cell title="联系客服" value="客服时间 07:00-22:00" is-link icon="phone" />
			<van-cell title="意见反馈" is-link icon="comment-circle" />
		</van-cell-group>

		<van-cell-group style="margin-top: 0.6rem">
			<van-cell title="小廖买菜" value="下载APP体验更佳" is-link icon="shop" />
		</van-cell-group>

		<!-- 配置路由出口 -->
		<transition name="router-slider" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
	<SelectLogin v-else />
</template>

<script>
import { mapState } from 'vuex';
import { Toast } from 'vant';
import SelectLogin from '@/views/login/SelectLogin';
export default {
	name: 'Mine',
	data() {
		return {
			orderData: [
				{ icon: 'cart-circle-o', title: '待支付' },
				{ icon: 'gift-o', title: '待收货' },
				{ icon: 'smile-comment-o', title: '待评价' },
				{ icon: 'cash-back-record', title: '售后和退款' }
			]
		};
	},
	components: {
		SelectLogin
	},
	computed: {
		...mapState(['userInfo'])
	}
};
</script>

<style lang="less" scoped>
#mine {
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
}
.van-nav-bar {
	background-color: #3bba63;
}
.van-nav-bar__title {
	color: #fff;
	font-size: 1rem;
}
.personMag {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.personMag img {
	width: 4rem;
	height: 4rem;
	border-radius: 2rem;
	border: 0.1rem solid #fff;
}
.personInfo {
	display: flex;
	flex-direction: column;
	margin-left: 0.8rem;
}
.van-cell__left-icon {
	color: orangered;
	font-size: 1.2rem;
}
/* 转场动画 */
.router-slider-leave-active,
.router-slider-enter-active {
	transition: all 0.3s;
}
.router-slider-leave,
.router-slider-enter {
	transform: translate3d(2rem, 0, 0);
	opacity: 0;
}
</style>
