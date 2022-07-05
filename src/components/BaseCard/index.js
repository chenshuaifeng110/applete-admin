import React, { Component } from "react";
import PropsTypes from 'prop-types'
import './index.scss'

class Index extends Component {
    constructor(props){
        super(props)
        this.state ={}
    }
    static propTypes = {
            title: PropsTypes.string.isRequired,
    }
    render() {
        const {children, title, style} = this.props
        return (
            <div className="base-container" style={{...style}}>
                <div className="base-title">
                    <div className="base-divider"></div>
                    <div className="title-text">{title}</div>
                </div>
                <div className="base-body">
                    {children}
                </div>
            </div>
        )
    }
}
export default Index