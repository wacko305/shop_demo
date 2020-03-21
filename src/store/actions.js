import { USER_INFO } from './mutations-type';
import { getStore } from './../config/globle';
import { getUserInfo } from './../service/api/index';

export default {
	//1.同步用户信息
	syncUserInfo({ commit }, userInfo) {
		commit(USER_INFO, { userInfo });
	},

	//2.自动登录
	async reqUserInfo({ commit }) {
		//2.1从本地获取数据
		let userInfo = JSON.parse(getStore('userInfo'));
		if (userInfo) {
			commit(USER_INFO, { userInfo });
		} else {
			//2.2从服务器端去获取
			let result = await getUserInfo();
			if (result.success_code === 200) {
				commit(USER_INFO, { userInfo: result.data });
			}
		}
	}
};
