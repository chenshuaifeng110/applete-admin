import React, { Component } from 'react';
import {Form, Icon, Input, Button,Row, Col ,message  } from 'antd';
import {modifyMerchantAccount, forgotMerchantAccount} from "@/api/user"
import '@/assets/css/login';

const FormItem = Form.Item;
class ForgotPWD extends Component {

	state = {
		countdown: 59,
		countLoad: false
	}
	login = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				 this.props.userLogin(values)
			} 
		});
	};
	handleSendMSG = async () => {
		const {getFieldValue} = this.props.form;
		let {countdown} = this.state
		let res = await modifyMerchantAccount('/api/merchant/modify_verify', {merchant_phone:getFieldValue('merchant_phone')})
		if(res.code === 0){
			message.success('验证码发送成功，请注意查收')
		}else if( res.code === 10204){
			message.warn(res.msg)
		}else{
			message.warn('验证码发送失败')
		}
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
	hasError = () => {
		const { getFieldError} = this.props.form
		const FieldError = getFieldError('merchant_phone')
		if(FieldError === undefined) return false
		else return true
	}
	confirmPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password')) {
		  callback('两次密码不一致');
		} else {
		  callback();
		}
	}
	handleModify = e => {
		e.preventDefault();
		this.props.form.validateFields( async (err, {merchant_phone, verifiy, password}) => {
			if (!err) {
				let res = await forgotMerchantAccount('/api/merchant_account/modify', {
					merchant_phone, 
					verifiy, 
					password
				})
				if(res.code === 0){
					message.success('修改成功,请登录')
					this.props.form.resetFields()
				}else if( res.code === 10206){
					message.warn('验证码错误')
				}else{
					message.warn('修改失败')
				}
			} else {
				console.log('aaaa',err);
			}
		});
	}
	render() {
		const { getFieldDecorator,getFieldValue } = this.props.form;
		return (
			<Form className="login-form">
				<FormItem>
					<Row gutter={8} >
						<Col span={16}>
							{getFieldDecorator('merchant_phone', {
							rules: [
								{ required: true, message: '请填写手机号' },
								{ pattern: /^1(3[0-9]|4[57]|5[0-35-9]|7[0678]|8[0-9])\d{8}$/, message: '手机号不合法！' },
							]
						})(<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号码" />)}
						</Col>
						<Col span={8}>
							<Button style={{width:' 100% '}} disabled={!getFieldValue('merchant_phone') || this.hasError() || this.state.countLoad} onClick={this.handleSendMSG}>{this.state.countLoad?this.state.countdown: '验证码'}</Button>
						</Col>
					</Row>
				</FormItem>
				<FormItem>
					{getFieldDecorator('verifiy', {
						rules: [{ required: true, message: '请输入验证码' }],
					})(<Input placeholder="请输入验证码" />)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('password', {
						rules: [
							{ required: true, message: '请填写密码' },
							{ min:3, max:18, message: '密码长度3~18' },
							{ pattern: /[a-zA-Z0-9]/, message: '密码字符为a-zA-Z0-9' },
						]
					})(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="密码" />)}
				</FormItem>
				<FormItem>
					{getFieldDecorator('confirmPassword', {
						rules: [
							{ required: true, message: '请填写确认密码' },
							{
								validator: this.confirmPassword
							}
						]
					})(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="确认密码" onBlur={this.handleConfirmBlur} />)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" block onClick={this.handleModify}>
						确认
					</Button>
				</FormItem>
			</Form>
		);
	}
}

export default Form.create()(ForgotPWD)
