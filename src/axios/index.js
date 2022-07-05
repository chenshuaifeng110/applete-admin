import axios from 'axios';
import { message } from 'antd';
import store from '@/redux/store'
const $axios = axios.create({
	baseURL: 'http://localhost:3030',
	timeout: 6000,
	retry:4,
	retryDelay:1000,
	withCredentials: true
});

//请求拦截
$axios.interceptors.request.use(
	function(config) {
		// 在发送请求之前做些什么
		// 通过reudx的store拿到拿到全局状态树的token ，添加到请求报文，后台会根据该报文返回status
		// 此处应根据具体业务写token
		const token = store.getState()?.userInfo?.token
		if(token){
			config.headers['authorization'] = `Bearer ${token}`;
		}
		return config;
	},
	function(error) {
		// 对请求错误做些什么
		message.error(error);
		return Promise.reject(error);
	}
);

// 添加响应拦截器
$axios.interceptors.response.use(
	function(response) {
		// 集中处理权限校验问题
		if(response.data.code === 401 ) return window.location.hash = '/login'
		else return response.data
	},
	function(error) {
		if(error?.response?.status === 403) {
			message.warn('Token过期')
			return window.location.hash = '/login'
		}else {
			return Promise.reject(error.response.data);
		}
	}
);

// 请求方式配置
const Http = {}
Http.post = (url, data) => {
	return $axios({
		method: 'post',
		url,
		data
	})
}
Http.get = (url, params) => {
	return $axios({
		method: 'get',
		url,
		params
	})
}
export default Http
