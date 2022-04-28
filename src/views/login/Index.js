import React, { Component } from 'react';
import {Tabs} from 'antd';
import Particles from 'react-particles-js';
import Login from './Login';
import Regist from './Regist';
import '@/assets/css/login';

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
				<Particles
					height={this.state.clientHeight - 5 + 'px'}
					params={{
						number: { value: 50 },
						ize: { value: 3 },
						interactivity: {
							events: {
								onhover: { enable: true, mode: 'repulse' }
							}
						}
					}}
				/>
				<div className="content">
					<Tabs tabPosition= 'bottom' tabBarStyle = { {color: '#fff'}}>
						<TabPane tab="登录" key="1">
							<Login/>
						</TabPane>
						<TabPane tab="账号注册" key="2">
							<Regist/>
						</TabPane>
					</Tabs>
				</div>
			</div>
		);
	}
}

export default Index