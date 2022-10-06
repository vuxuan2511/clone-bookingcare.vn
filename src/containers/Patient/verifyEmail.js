import React, { Component } from 'react';
// import * as actions from '../../../store/actions';
// import { FormattedMessage } from 'react-intl';
// import { LANGUAGES } from '../../utils';
import { connect } from 'react-redux';
import HomeHeader from '../HomePage/HomeHeader';
import { postVerifyBookAppointment } from '../../services/userService';

import './VerifyEmail.scss';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        };
    }
    async componentDidMount() {
        if (this.props && this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId,
            });
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1,
                });
            }
        }
    }

    componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {
        }
    }

    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                {statusVerify === false ? (
                    <div>loading data ....</div>
                ) : (
                    <>
                        {+errCode === 0 ? (
                            <div className="text-confirm-success">Xác Nhận Lịch Hẹn Thành Công</div>
                        ) : (
                            <div className="text-confirm-fail">Xác Nhận Lịch Hẹn Thất Bại</div>
                        )}
                        <div className="text-tks">Xin Cảm Ơn</div>
                    </>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
