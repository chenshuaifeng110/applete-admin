import * as actionTypes from '../constants/index';
import { message } from 'antd';
import { login } from '../../api/user';
import {setStorage} from '@/utils/storage'

const login_success = (data) => ({type: actionTypes.LOGIN_SUCCESS,userInfo: data});
const login_fail = (data) => ({type: actionTypes.LOGIN_FAIL,userInfo: data});

const userLogin = (params) => {
    return async dispatch => {
       try {
            let res = await login('/api/merchant_account/login', params)
            if(res.code === 0){
                setStorage('userInfo', res.data);
                dispatch(login_success(res.data))
                window.location.href = '#/dashboard'
                message.success('登录成功')
            }else{
                message.warning('登录失败,账号或密码错误')
                dispatch(login_fail(res))
            } 
       } catch (error) {
           console.log(error);
       }
    }
};
const logout = (data) => {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        userInfo: data
    }
};
const setUserInfo = (data) => {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        userInfo: data
    }
};
export {
    setUserInfo,
    userLogin,
    logout
};
