import React, { Component } from 'react';
import { Form, Icon, Input, Button,Row, Col } from 'antd';
import { connect } from 'react-redux';
import { setUserInfo } from '@/redux/actions/userInfo';
import '@/assets/css/login';

const FormItem = Form.Item;
class Login extends Component {

	state = {
		countdown: 59,
		countLoad: false
	}
	login = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// localStorage.setItem('isLogin', '1');
				// // 模拟生成一些数据
				// this.props.setUserInfo(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } }));
				// localStorage.setItem('userInfo', JSON.stringify(Object.assign({}, values, { role: { type: 1, name: '超级管理员' } })));
				this.props.history.push('/dashboard');
			} else {
				console.log('aaaa',err);
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
	render() {
		const { getFieldDecorator, getFieldsError,getFieldValue } = this.props.form;
		return (
			<Form className="regist-form">
				<FormItem>
					{getFieldDecorator('userName', {
						rules: [
							{ required: true, message: '请填写用户名！' },
							{ min:2, max:10, message: '用户长度2~10' },
							{ pattern: /[a-zA-Z0-9]/, message: '用户名允许字符为a-zA-Z0-9' },
						]
					})(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [
							{ required: true, message: '请填写密码！' },
							{ min:3, max:18, message: '密码长度3~18' },
							{ pattern: /[a-zA-Z0-9]/, message: '密码字符为a-zA-Z0-9' },
						]
					})(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />)}
				</FormItem>
				<FormItem>
					<Row gutter={8} >
						<Col span={16}>
							{getFieldDecorator('phone', {
							rules: [
								{ required: true, message: '请填写手机号！' },
								{ pattern: /^1(3[0-9]|4[57]|5[0-35-9]|7[0678]|8[0-9])\d{8}$/, message: '手机号不合法！' },
							]
						})(<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号码！" />)}
						</Col>
						<Col span={8}>
							<Button style={{width:' 100% '}} disabled={!getFieldValue('phone') || this.hasErrors(getFieldsError()) || this.state.countLoad } onClick={this.handleCountdown}>{this.state.countLoad?this.state.countdown: '获取验证码'}</Button>
						</Col>
					</Row>
				</FormItem>
				<FormItem>
					{getFieldDecorator('vertify', {
						rules: [{ required: true, message: '请输入验证码！' }],
					})(<Input placeholder="请输入验证码！" />)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" block>
						注册
					</Button>
				</FormItem>
			</Form>
		);
	}
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	setUserInfo: data => {
		dispatch(setUserInfo(data));
	}
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Form.create()(Login));
