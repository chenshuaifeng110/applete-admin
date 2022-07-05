import * as actionTypes from '../constants/index';
import { getStorage } from '../../utils/storage';
const userInfo = (state=getStorage('userInfo') || {} , action) => {
	switch (action.type) {
		case actionTypes.LOGIN_SUCCESS:
			return action.userInfo;
		default:
			return state;
	}
};

const logout = (state = {}, action) => {
	switch(action.type){
		case actionTypes.LOGOUT_SUCCESS:
			return state
		default:
			return state
	}
}
export {
	userInfo,
	logout
} 
