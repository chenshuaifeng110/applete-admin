import React, { Component } from "react";
import {Carousel, Tag, Icon} from 'antd';
import { Link } from "react-router-dom";
import {advert} from '@/api/common'
import './index.scss'

class  Index extends Component {

	state = {
		adverts: []
	}
	async componentDidMount() {
		const adverts = await advert('/api/merchant/get_advart');
		if(adverts.code === 0){
			this.setState({
				adverts:adverts.data
			})
		}
	}
    render() {
		const {adverts} = this.state;
        return (
            <div className="ad-container">
				<Carousel
					dotPosition='right'
					autoplay
					dots = {false}
					style= {{height: '18px'}}
				>
					{
						adverts?.map((advert) => {
							return (
								<Tag color="cyan" style={{width: '18px'}} key={advert._id}>
									<Link to={advert.url}>
										<Icon type="bell" />Ad：{advert.text}
									</Link>
								</Tag>
							)
						})
					}
				</Carousel>
			</div>
        )
    }
}

export default Index