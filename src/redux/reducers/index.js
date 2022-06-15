import { combineReducers } from 'redux';
import {userInfo, logout} from './userInfo';
import tagList from './tagList';
import { breadCrumb, tags, theme, collapse } from './setting';
export default combineReducers({ userInfo,
    logout,
    tagList, breadCrumb, tags, theme, collapse });
