import { Component } from "react";
import { withRouter } from "react-router-dom";
import {connect} from "react-redux"

class  Index extends Component {
    render() {
        return (
            <div>Ad</div>
        )
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	setCollapse: data => {
		dispatch(setCollapse(data));
	},
	setUserInfo: data => {
		dispatch(setUserInfo(data));
	},
	emptyTag: () => {
		dispatch(emptyTag());
	},
	addTag: data => {
		dispatch(addTag(data));
	},
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Index));