import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideMenu from './SideMenu';
import TopHeader from './TopHeader';
import { Layout } from 'antd';
import MainContent from './MainContent';
class Index extends Component {
	render() {
		return (
			<div className="layout">
				<Layout style={{ minHeight: '100vh' }}>
					<SideMenu />
					<Layout>
						<TopHeader />
						<MainContent />
					</Layout>
				</Layout>
			</div>
		);
	}
}
const mapStateToProps = state => state;

export default connect(
	mapStateToProps
)(Index);
