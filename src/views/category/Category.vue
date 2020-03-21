<template>
	<div id="category">
		<!-- 头部 -->
		<Header />
		<!-- 内容 -->
		<div class="listWrapper" v-if="!showLoading">
			<!-- 左边 -->
			<div class="leftWrapper">
				<ul class="wrapper">
					<li
						class="categoryItem"
						v-for="(cata, index) in categoriesData"
						:class="{ selected: currentIndex === index }"
						@click="clickLeftLi(index)"
						:key="cata.id"
						ref="menuList"
					>
						<span class="textWrapper">{{ cata.name }}</span>
					</li>
				</ul>
			</div>
			<!-- 右边 -->
			<Content :categoriesDetailData="categoriesDetailData" />
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
//1.引入组件
import Header from './components/Header';
import Content from './components/Content';

//2.引入滚动组件
import BScroll from 'better-scroll';

//3.引入接口
import { getCategories, getCategoriesDetail } from '@/service/api/index';

//4.引入通知组件
import PubSub from 'pubsub-js';
import { Toast } from 'vant';

//5.引入vuex
import { mapMutations } from 'vuex';

export default {
	name: 'Category',
	data() {
		return {
			//是否显示加载图标
			showLoading: true,
			//左边列表数据
			categoriesData: [],
			//右边列表数据
			categoriesDetailData: [],
			//左边item选中与否
			currentIndex: 0
		};
	},
	created() {
		this.initData();
	},
	mounted() {},
	components: {
		Header,
		Content
	},
	methods: {
		...mapMutations(['ADD_GOODS']),
		//1.初始化操作(数据和界面)
		async initData() {
			//1.获取左边的数据
			let leftRes = await getCategories();
			if (leftRes.success) {
				this.categoriesData = leftRes.data.cate;
			}

			//2.获取右边的数据
			let rightRes = await getCategoriesDetail('/lk001');
			if (rightRes.success) {
				this.categoriesDetailData = rightRes.data.cate;
			}
			//console.log(this.categoriesData, this.categoriesDetailData);

			//3.隐藏loading框
			this.showLoading = false;

			//4.初始化滚动框架
			this.$nextTick(() => {
				this.leftScroll = new BScroll('.leftWrapper', { probeType: 3 });
			});
		},

		//2.处理左边的点击
		async clickLeftLi(index) {
			//2.1改变索引
			this.currentIndex = index;

			//2.2滚动到对应的位置
			let menuList = this.$refs.menuList;
			let el = menuList[index];

			//2.3滚动到对应元素上
			this.leftScroll.scrollToElement(el, 300);

			//2.4获取右边的数据
			let rightRes = await getCategoriesDetail(`/lk00${index + 1}`);
			if (rightRes.success) {
				this.categoriesDetailData = rightRes.data.cate;
			}
			//console.log(this.categoriesDetailData);
		}
	}
};
</script>

<style lang="less" scoped>
#category {
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
	overflow: hidden;
}
.listWrapper {
	display: flex;
	position: absolute;
	top: 2.75rem;
	bottom: 3rem;
	width: 100%;
	overflow: hidden;
}

.leftWrapper {
	background-color: #f4f4f4;
	width: 5.3125rem;
	flex: 0 0 5.3125rem;
}

.categoryItem {
	padding: 0.75rem 0;
	border-bottom: solid 1px #e8e9e8;
	position: relative;
}

.categoryItem .textWrapper {
	line-height: 1.25rem;
	border-left: solid 0.1875rem transparent;
	padding: 0.3125rem 0.6875rem;
	font-size: 0.8125rem;
	color: #666666;
}

.categoryItem.selected {
	background: #fff;
}

.categoryItem.selected .textWrapper {
	border-left-color: #3cb963;
	font-weight: bold;
	font-size: 0.875rem;
	color: #333333;
}

@media (min-width: 960px) {
	.wrapper {
		border-right: 1px solid #e8e9e8;
	}

	.wrapper .categoryItem {
		background: #fff;
	}
}
</style>
