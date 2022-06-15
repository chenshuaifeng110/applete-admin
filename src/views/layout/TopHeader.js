import React, { Component } from 'react';
import { Icon, Avatar, Dropdown, Menu, Badge, message } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {logout } from '@/redux/actions/userInfo';
import { setCollapse } from '@/redux/actions/setting';
import { routes } from '@/router/routes';
import {removeStorage} from '@/utils/storage'
import FullScreen from '@/components/FullScreen';
import Tags from './Tags';
import {weather} from '@/api/common'
import pngs from '@/utils/weather'
import qing from '@/assets/img/weather/qing.png'
import avatar from '@/assets/img/avatar.gif'

class TopHeader extends Component {
	state = { 
		visible: false,
		weatherPng: ''
	 };
	handleLogout = () => {
		this.props.logout({});
		removeStorage('userInfo')
		this.props.history.push('/login');
		message.success('退出成功')
	};
	async componentDidMount() {
		let res = await weather('/api/merchant/weather', {
			district_id: 610100
		})
		this.setState({
			weatherPng: res.text
		})
	}
	toNews = () => {
		this.handClickTag('/news');
		this.props.history.push('/news');
	};
	handClickTag(path, parent) {
		for (let i = 0; i < routes.length; i++) {
			if (path === routes[i].path) {
				let obj = { path, title: '消息', component: routes[i].component };
				this.props.addTag(parent ? Object.assign({}, obj, { parent: parent.title }) : obj);
			}
		}
	}
	toggle = () => {
		this.props.setCollapse({ isCollapsed: !this.props.collapse.isCollapsed });
	};
	handleClickRedirct = () => {
		this.props.history.push('/')
	}
	render() {
		let png = pngs[this.state.weatherPng] ? pngs[this.state.weatherPng]: qing
		const {collapse, userInfo} = this.props
		const DropdownList = (
			<Menu className="drop-list">
				<Menu.Item key="user">
					<Icon type="user" />
					{userInfo?.merchant_account}
				</Menu.Item>
				<Menu.Item key="logout" onClick={this.handleLogout}>
					<Icon type="logout" />
					退出登录
				</Menu.Item>
			</Menu>
		);
		return (
			<div className="top-header">
				<div className="top-header-inner">
					<Icon className="trigger" type={collapse.isCollapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
					<div className="header-title" style={{cursor: 'pointer'}} onClick={this.handleClickRedirct}>快蜗云后台管理系统</div>
					<div className="header-right">
						<div className="setting" style={{ width: '70px',paddingRight: '5px'}}>
							<img src={png} alt="天气 " style={{display: 'inline-block', width: '45px',paddingRight: '5px'}}></img>
							<span style={{fontWeight: 'bold'}}>{this.state.weatherPng}</span>
						</div>
						<div className="full-screen">
							<FullScreen />
						</div>
						<div className="news-wrap"  style={{ width: '45px',paddingRight: '5px'}}>
							<Badge count={3}>
								<Icon style={{ fontSize: '21px', cursor: 'pointer' }} type="bell" onClick={this.toNews} />
							</Badge>
						</div>
						<div className="dropdown-wrap" id="dropdown-wrap" style={{ cursor: 'pointer' }}>
							<Dropdown getPopupContainer={() => document.getElementById('dropdown-wrap')} overlay={DropdownList}>
								<div>
									<Avatar size="middle" src={avatar} />
									<Icon style={{ color: 'rgba(0,0,0,.3)', cursor: 'pointer' }} type="caret-down" />
								</div>
							</Dropdown>
						</div>
					</div>
				</div>
				<Tags/>
			</div>
		);
	}
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	setCollapse: data => {
		dispatch(setCollapse(data));
	},
	logout: () => {
		dispatch(logout());
	}
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(TopHeader));
