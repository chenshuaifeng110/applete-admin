import React, { Component } from 'react';
import { Form, Icon, Input, Button,Row, Col, message } from 'antd';
import {sendVerifiyMsg} from "@/api/common"
import {regist, queryMerchantAccount} from "@/api/user"
import '@/assets/css/login';
const FormItem = Form.Item;
class Regist extends Component {

	state = {
		countdown: 59,
		countLoad: false,
		validateStatus: '',
		help: ''
	}
	handleRegist = e => {
		e.preventDefault();
		this.props.form.validateFields( async (err, values) => {
			if (!err) {
				console.log('err', err);
				let res = await regist('/api/merchant_account/set_merchant_account', values)
				if(res.code === 0){
					message.success('注册成功,请登录')
					this.props.form.resetFields()
				}else if( res.code === 10206){
					message.warn('验证码错误')
				}else{
					message.warn('注册失败')
				}
			} else {
				console.log('aaaa',err);
			}
		});
	};
	handleSendMSG = async () => {
		const {getFieldValue} = this.props.form;
		let {countdown} = this.state
		let res = await sendVerifiyMsg('/api/merchant/get_verify', {merchant_phone:getFieldValue('merchant_phone')})
		if(res.code === 0){
			message.success('验证码发送成功，请注意查收')
		}else if( res.code === 10204){
			message.warn(res.msg)
		}else if(res.code === 10202){
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
	checkAccount = async () => {
		const {getFieldValue} = this.props.form;
		let res = await queryMerchantAccount('/api/merchant_account/query_merchant_account', {merchant_account:getFieldValue('merchant_account')})
		if(res.code === 10203){
			this.setState({
				validateStatus: 'error',
				help:'此名称已被使用'
			})
		}else{
			this.setState({
				validateStatus: 'success',
				help:''
			})
		}
	}
	hasError = () => {
		const { getFieldError} = this.props.form
		const FieldError = getFieldError('merchant_phone')
		if(FieldError === undefined) return false
		else return true
	}
	render() {
		const { getFieldDecorator,getFieldValue } = this.props.form;
		return (
			<Form className="regist-form">
				<FormItem
					validateStatus={this.state.validateStatus}
					hasFeedback 
					help={this.state.help}
				>
					{getFieldDecorator('merchant_account', {
						rules: [
							{ required: true, message: '请填写用户名' },
							{ min:2, max:10, message: '用户长度2~10' },
							{ pattern: /[a-zA-Z0-9]/, message: '用户名允许字符为a-zA-Z0-9' },
						]
					})(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" onBlur={this.checkAccount}/>)}
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
					<Row gutter={8} >
						<Col span={16}>
							{getFieldDecorator('merchant_phone', {
							rules: [
								{ required: true, message: '请填写手机号' },
								{ pattern: /^1(3[0-9]|4[57]|5[0-35-9]|7[0678]|8[0-9])\d{8}$/, message: '手机号不合法' },
							]
						})(<Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号码"/>)}
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
					<Button type="primary" htmlType="submit" block onClick={this.handleRegist}>
						注册
					</Button>
				</FormItem>
			</Form>
		);
	}
}
export default Form.create()(Regist);
