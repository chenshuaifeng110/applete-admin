import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon,Steps, Statistic,DatePicker, message, Table, Divider, Tag,Popover  } from 'antd';
import SocketService from '@/axios/socketService';
import BaseCard from '@/components/BaseCard'
import BaseChart from '@/components/BaseChart';
import {trendOption,analyseBarOption, analysePieOption} from './echartConfig'
import noticePng from '@/assets/img/notify1.gif'
import logo from '@/assets/img/logo.png'
import './index.scss'

const {RangePicker } = DatePicker
const { Step } = Steps;
const columns = [
	{
	  title: 'Name',
	  dataIndex: 'name',
	  key: 'name',
	  render: text => <a>{text}</a>,
	},
	{
	  title: 'Age',
	  dataIndex: 'age',
	  key: 'age',
	},
	{
	  title: 'Address',
	  dataIndex: 'address',
	  key: 'address',
	},
	{
	  title: 'Tags',
	  key: 'tags',
	  dataIndex: 'tags',
	  render: tags => (
		<span>
		  {tags.map(tag => {
			let color = tag.length > 5 ? 'geekblue' : 'green';
			if (tag === 'loser') {
			  color = 'volcano';
			}
			return (
			  <Tag color={color} key={tag}>
				{tag.toUpperCase()}
			  </Tag>
			);
		  })}
		</span>
	  ),
	},
	{
	  title: 'Action',
	  key: 'action',
	  render: (text, record) => (
		<span>
		  <a>Invite {record.name}</a>
		  <Divider type="vertical" />
		  <a>Delete</a>
		</span>
	  ),
	},
  ];
  
  const data = [
	{
	  key: '1',
	  name: 'John Brown',
	  age: 32,
	  address: 'New York No. 1 Lake Park',
	  tags: ['nice', 'developer'],
	},
	{
	  key: '2',
	  name: 'Jim Green',
	  age: 42,
	  address: 'London No. 1 Lake Park',
	  tags: ['loser'],
	},
	{
	  key: '3',
	  name: 'Joe Black',
	  age: 32,
	  address: 'Sidney No. 1 Lake Park',
	  tags: ['cool', 'teacher'],
	},
	{
	  key: '4',
	  name: 'Joe Black',
	  age: 32,
	  address: 'Sidney No. 1 Lake Park',
	  tags: ['cool', 'teacher'],
	},
	{
	  key: '5',
	  name: 'Joe Black',
	  age: 32,
	  address: 'Sidney No. 1 Lake Park',
	  tags: ['cool', 'teacher'],
	},
  ];
  const content = (
	<div style={{width:'100px', height: '100px'}}>
	 <img  style={{width:'100px', height: '100px'}} src={logo} alt="?????????" ></img>
	</div>
  );
class Index extends Component {
	constructor(props){
		super(props)
	}
	handleGo = () => {
		this.props.history.push('/login')
	}
	handleSelectTime = () => {
		message.warn('???????????????')
	}

 async componentDidMount() {
		// ??????????????????websocket?????????
		const clent = await SocketService.Instance.connect(this.props.userInfo.token)
	
		if(clent) {
			clent.on('news', (data) => {
					console.log('clent',data);
				})
		}
	}
	render() {
		const {isCollapsed} = this.props
		return (
			<div>
				<BaseCard
					title='????????????'
				>
					<div className='data-statistics'>
						<div className='statis-items'>
							<div className='statis-top'>
								<span style={{fontSize: '18px', fontWeight:'500'}}>??????????????????&nbsp;</span> <span><Statistic valueStyle={{ color: '#48c0a3' }}  value={3333} suffix="???"/></span>
							</div>
							<div className='statis-middle'>
								<span style={{fontSize: '14px', color: '#ccc'}}>??????????????????&nbsp;</span> <span><Statistic valueStyle={{ color: '#ccc', fontSize: '16px' }}  value={3333} suffix="???"/></span>
							</div>
							<Statistic
								value={11.28}
								precision={2}
								valueStyle={{ color: '#48c0a3' }}
								prefix={<Icon type="arrow-up" />}
								suffix="%"
							/>
						</div>
						<div className='statis-items'>
						<div className='statis-top'>
								<span style={{fontSize: '18px', fontWeight:'500'}}>??????????????????&nbsp;</span> <span><Statistic valueStyle={{ color: '#48c0a3' }}  value={3333} suffix="???"/></span>
								</div>
								<div className='statis-middle'>
									<span style={{fontSize: '14px', color: '#ccc'}}>??????????????????&nbsp;</span> <span><Statistic valueStyle={{ color: '#ccc', fontSize: '16px' }} suffix="???"  value={3333}/></span>
								</div>
								<Statistic
									value={11.28}
									precision={2}
									valueStyle={{ color: '#48c0a3' }}
									prefix={<Icon type="arrow-up" />}
									suffix="%"
								/>
						</div>
						<div className='statis-items'>
						<div className='statis-top'>
								<span style={{fontSize: '18px', fontWeight:'500'}}>??????????????????&nbsp;</span> <span><Statistic valueStyle={{ color: '#48c0a3' }}  value={3333} suffix="???"/></span>
								</div>
								<div className='statis-middle'>
									<span style={{fontSize: '14px', color: '#ccc'}}>??????????????????&nbsp;</span> <span><Statistic valueStyle={{ color: '#ccc', fontSize: '16px' }}  value={3333} suffix="???"/></span>
								</div>
								<Statistic
									value={11.28}
									precision={2}
									valueStyle={{ color: '#48c0a3' }}
									prefix={<Icon type="arrow-up" />}
									suffix="%"
								/>
						</div>
					</div>
				</BaseCard>
				<BaseCard
					title='????????????'
					style={{marginTop: '18px'}}
				>
					<div className='notice-body'>
						<div className='notice'>
							<img className='notice-gif' src={noticePng} alt='??????'></img>
							<div className='notice-order'>
								<div className='notice-text'>??????<span className='order-num'>123</span>??????????????????</div>
								<div className='notice-handle' onClick={this.handleGo}>?????????<Icon type="right" /></div>
							</div>
						</div>
					</div>
				</BaseCard>
				<BaseCard
					title = "?????????"
					style={{marginTop: '18px'}}
				>
					<RangePicker style={{width: '200px'}} onChange = {this.handleSelectTime} />
					<BaseChart
						chartData={trendOption}
						isCollapsed = {isCollapsed}
					/>
				</BaseCard>
				<BaseCard
					title = "????????????"
					style={{marginTop: '18px', paddingBottom: '0px'}}
				>
					<div className='analyse-container'>
						<div className='analyse-left'>
							<Table columns={columns} dataSource={data} scroll={{ y: 180 }}/>
							<BaseChart
								chartData={analyseBarOption}
								isCollapsed = {isCollapsed}
							/>
						</div>
						<div className='analyse-right'>
								<div className='analyse-item'>
									<BaseChart
										style={{height: '80px'}}
										chartData={analysePieOption}
										isCollapsed = {isCollapsed}
									/>
								</div>
								<div className='analyse-item'>
									<BaseChart
										style={{height: '80px'}}
										chartData={analysePieOption}
										isCollapsed = {isCollapsed}
									/>
								</div>
								<div className='analyse-item'>
									<BaseChart
										style={{height: '80px'}}
										chartData={analysePieOption}
										isCollapsed = {isCollapsed}
									/>
								</div>
								<div className='analyse-item'>
									<BaseChart
										chartData={analysePieOption}
										isCollapsed = {isCollapsed}
									/>
								</div>
						</div>
					</div>
				</BaseCard>
				<div className='foot-detail'>
					<div className='detail-left'>
						<BaseCard
							title='????????????'
							style={{marginTop: '18px'}}
						>
								<div className='left-inner'>
									<Popover placement="left"  content={content} title="Title">
										<img src={logo} alt="?????????" ></img>
									</Popover>
									<span >?????????????????????</span>
								</div>
							<div className='inner-step'>
								<Steps progressDot current={0} direction="vertical" className='steps' >
									<Step title="Finished" description="This is a description. This is a description." />
									<Step title="Finished" description="This is a description. This is a description." />
									<Step title="In Progress" description="This is a description111. This is a description." />
									<Step title="Waiting" description="11111111111111111111111111111111111111111111111" />
								</Steps>
							</div>
						</BaseCard>
					</div>
					<div className='detail-right'>
						<BaseCard
								title='????????????'
								style={{marginTop: '18px'}}
							>
								<div className='ai-market'>
									<div className='market-items'>
										??????????????????????????????
									</div>
									<div className='market-items'>
										??????????????????????????????
									</div>
									<div className='market-items'>
										???????????????
									</div>
								</div>
						</BaseCard>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state?.userInfo,
		isCollapsed: state?.collapse?.isCollapsed
	}
}

export default connect(
	mapStateToProps
)(withRouter(Index));
