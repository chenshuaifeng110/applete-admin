import React, { Component } from 'react';
import {Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userLogin } from '@/redux/actions/userInfo';
import '@/assets/css/login';

const FormItem = Form.Item;
class Login extends Component {

	state = {
		countdown: 59,
		countLoad: false
	}
	login = e => {
		e.preventDefault();
		this.props.form.validateFields( async (err, values) => {
			if (!err) {
				this.props.userLogin(values)
			} 
		});
	};
	handleCountdown = () => {
		let {countdown} = this.state
		let timer = setInterval(() => {
			this.setState({
				countdown: countdown--,
				countLoad: true
			}, () => {
				if(countdown < 0){
					clearInterval(timer)
					this.setState({
						countdown: 59,
						countLoad: false
					})
				}
			})
		},1000)
		
	}
	hasErrors = (fieldsError) => {
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}
	// componentWillUnmount(){

	// }
	render() {
		const { getFieldDecorator} = this.props.form;
		return (
			<Form className="login-form">
				<div className="title">快蜗云管理系统</div>
				<FormItem>
					{getFieldDecorator('merchant_account', {
						rules: [{ required: true, message: '请填写用户名！' }]
					})(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: '请填写密码！' }]
					})(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" block onClick={this.login}>
						登录
					</Button>
				</FormItem>
			</Form>
		);
	}
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	userLogin: data => dispatch(userLogin(data)),
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Form.create()(Login)));

