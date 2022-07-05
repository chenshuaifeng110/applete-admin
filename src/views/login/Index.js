import React, { Component } from 'react';
import {Tabs } from 'antd';
import Particles from 'react-particles-js';
import Login from './Login';
import Regist from './Regist';
import ForgotPWD from './ForgotPWD';
import particlesConfig from '@/utils/particles'
import '@/assets/css/login';
import main from '@/assets/img/main.png'
const { TabPane } = Tabs;
class Index extends Component {
	state = { clientHeight: document.documentElement.clientHeight || document.body.clientHeight };
	constructor(props) {
		super(props);
		this.onResize = this.onResize.bind(this);
	}
	componentDidMount() {
		window.addEventListener('resize', this.onResize);
	}
	componentWillUnmount() {
		window.addEventListener('resize', this.onResize);
		// componentWillMount进行异步操作时且在callback中进行了setState操作时，需要在组件卸载时清除state
		this.setState = () => {
			return;
		};
	}
	onResize() {
		this.setState({ clientHeight: document.documentElement.clientHeight || document.body.clientHeight });
	}
	render() {
		return (
			<div className="container">
				<div className='container-left'>
					<img alt='背景图' src={main} style={{height: '100%',width:'100%'}}></img>
				</div>
				<div className='container-right'>
					<Particles
						style={{background: "#fff"}}
						height={this.state.clientHeight - 2 + 'px'}
						params={particlesConfig}
					/>
					<div className="content">
						<Tabs tabPosition= 'bottom' size='smll' tabBarStyle = { {color: '#fff'}} >
							<TabPane tab="登录" key="1">
								<Login/>
							</TabPane>
							<TabPane tab="注册" key="2">
								<Regist/>
							</TabPane>
							<TabPane tab="忘记密码" key="3">
								<ForgotPWD/>
							</TabPane>
						</Tabs>
					</div>
				</div>
			
			</div>
		);
	}
}

export default Index