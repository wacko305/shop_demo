import {
	ADD_GOODS,
	INIT_SHOP_CART,
	REDUCE_CART,
	SELECTED_SINGER_GOODS,
	SELECTED_ALL_GOODS,
	CLEAR_CART,
	USER_INFO,
	INIT_USER_INFO,
	RESET_USER_INFO
} from './mutations-type';
import { getStore, setStore, removeStore } from './../config/globle';
import Vue from 'vue';

export default {
	//1.往购物车中添加数据
	[ADD_GOODS](state, { goodsId, goodsName, smallImage, goodsPrice }) {
		let shopCart = state.shopCart;
		//1.判断商品是否存在
		if (shopCart[goodsId]) {
			shopCart[goodsId]['num']++;
		} else {
			//不存在
			shopCart[goodsId] = {
				num: 1,
				id: goodsId,
				name: goodsName,
				small_image: smallImage,
				price: goodsPrice,
				checked: true
			};
		}
		//1.2产生新对象
		state.shopCart = { ...shopCart };
		//1.3存入本地
		setStore('shopCart', state.shopCart);
	},

	//2.页面初始化，要获取购物车的数据(本地)
	[INIT_SHOP_CART](state) {
		let initCart = getStore('shopCart');
		if (initCart) {
			state.shopCart = JSON.parse(initCart);
		}
	},

	//3.把商品移除购物车
	[REDUCE_CART](state, { goodsId }) {
		let shopCart = state.shopCart;
		let goods = shopCart[goodsId];
		if (goods) {
			//找到该商品
			if (goods['num'] > 0) {
				goods['num']--;
				//3.1是否只有0个
				if (goods['num'] === 0) {
					delete shopCart[goodsId];
				}
			} else {
				goods = null;
			}
			//3.2同步数据
			state.shopCart = { ...shopCart };
			setStore('shopChat', state.shopCart);
		}
	},

	//4.单个商品的选中和取消选中
	[SELECTED_SINGER_GOODS](state, { goodsId }) {
		let shopCart = state.shopCart;
		let goods = shopCart[goodsId];
		if (goods) {
			if (goods.checked) {
				//存在该属性
				goods.checked = !goods.checked;
			} else {
				Vue.set(goods, 'checked', true);
			}
			//4.1同步数据
			state.shopCart = { ...shopCart };
			setStore('shopChat', state.shopCart);
		}
	},

	//5.所有商品的选中和取消选中
	[SELECTED_ALL_GOODS](state, { isSelected }) {
		let shopCart = state.shopCart;
		Object.values(shopCart).forEach((goods, index) => {
			if (goods.checked) {
				//存在该属性
				goods.checked = isSelected;
			} else {
				Vue.set(goods, 'checked', isSelected);
			}
		});
		//5.1同步数据
		state.shopCart = { ...shopCart };
		setStore('shopChat', state.shopCart);
	},

	//6.清空购物车
	[CLEAR_CART](state) {
		state.shopCart = {};
		state.shopCart = { ...state.shopCart };
		setStore('shopCart', state.shopCart);
	},

	//7.保存用户信息到本地
	[USER_INFO](state, { userInfo }) {
		state.userInfo = userInfo;
		setStore('userInfo', state.userInfo);
	},

	//8.获取用户信息
	[INIT_USER_INFO](state) {
		//8.1获取用户信息
		let userInfo = getStore('useInfo');
		//8.2判断
		if (userInfo) {
			state.userInfo = JSON.parse(userInfo);
		}
	},

	//9.退出登录
	[RESET_USER_INFO](state) {
		state.userInfo = {};
		removeStore('userInfo');
	}
};
