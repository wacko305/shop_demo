import ajax from './ajax';

// http://demo.itlike.com/web/xlmc/api/homeApi
// http://demo.itlike.com/web/xlmc/api/homeApi/categories
// http://demo.itlike.com/web/xlmc/api/homeApi/categoriesdetail/lk001
// lk001 - lk006

// 1. 定义基础路径
const BASE_URL = 'http://demo.itlike.com/web/xlmc';

export const getHomeData = () => ajax(BASE_URL + '/api/homeApi');
export const getCategories = () => ajax(BASE_URL + '/api/homeApi/categories');
export const getCategoriesDetail = preParams =>
	ajax(BASE_URL + '/api/homeApi/categoriesdetail' + preParams);

// 2. 用户中心接口
//  http://localhost:3000/web/xlmc/api/send_code
const LOCAL_BASE_URL = 'http://demo.itlike.com/web/xlmc';
//2.1获取短信验证码(GET)
export const getPhoneCode = phone => ajax(LOCAL_BASE_URL + '/api/send_code', { phone });
//2.2手机验证码登录(POST)
export const phoneCodeLogin = (phone, code) =>
	ajax(LOCAL_BASE_URL + '/api/login_code', { phone, code }, 'POST');
//2.3用户名和密码登录(POST)
export const pwdLogin = (user_name, user_pwd, captcha) =>
	ajax(LOCAL_BASE_URL + '/api/login_pwd', { user_name, user_pwd, captcha }, 'POST');
//2.4自动登录
export const getUserInfo = () => ajax('http://demo.itlike.com/web/xlmc/api/userinfo');
//2.5退出登录
export const getLogOut = () => ajax('http://demo.itlike.com/web/xlmc/api/logout');

//3.购物车接口
/* 
3.1添加商品
请求方式：POST 
参数：{user_id: String, 
      goods_id: String, 
      goods_name: String, 
      goods_price: Number, 
      small_image: String}
*/
export const addGoodsToCart = (user_id, goods_id, goods_name, goods_price, small_image) =>
	ajax(
		'http://demo.itlike.com/web/xlmc/api/cart/add',
		{
			user_id,
			goods_id,
			goods_name,
			goods_price,
			small_image
		},
		'POST'
	);
