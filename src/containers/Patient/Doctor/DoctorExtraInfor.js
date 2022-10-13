import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getExtraInforDoctorById } from '../../../services/userService';
import './DoctorExtraInfor.scss';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailPrice: false,
            extraInfor: '',
        };
    }
    async componentDidMount() {
        if (this.props.detailDoctorFromParent) {
            let res = await getExtraInforDoctorById(this.props.detailDoctorFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data,
                });
            }
        }
    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {
        }
        if (this.props.detailDoctorFromParent !== preProps.detailDoctorFromParent) {
            let res = await getExtraInforDoctorById(this.props.detailDoctorFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data,
                });
            }
        }
    }

    showHideDetailPrice = (status) => {
        this.setState({
            isShowDetailPrice: status,
        });
    };
    render() {
        let { isShowDetailPrice, extraInfor } = this.state;
        let { language } = this.props;
        let price = '';
        if (extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI) {
            price = extraInfor.priceTypeData.valueVI;
        }
        if (extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN) {
            price = extraInfor.priceTypeData.valueEN;
        }

        return (
            <div className="doctor-extra-infor-container">
                <div className="content-up">
                    <div className="text-address">
                        <FormattedMessage id="patient.extra-infor-doctor.medical-address" />
                    </div>
                    <div className="name-clinic">
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className="address-clinic">
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className="content-down">
                    {isShowDetailPrice === false && (
                        <div className="text-price">
                            <FormattedMessage id="patient.extra-infor-doctor.medical-examination-price" /> :
                            <span> {price}</span>
                            <span onClick={() => this.showHideDetailPrice(true)}>
                                <FormattedMessage id="patient.extra-infor-doctor.See-details" />
                            </span>
                        </div>
                    )}
                    {isShowDetailPrice === true && (
                        <div className="show-hide-detail-price">
                            <div className="text-1">
                                <FormattedMessage id="patient.extra-infor-doctor.medical-examination-price" />: .
                            </div>
                            <div className="text-2">
                                <div className="text-2-1">
                                    <div>
                                        <FormattedMessage id="patient.extra-infor-doctor.medical-examination-price" />
                                    </div>
                                    <div> {price}</div>
                                </div>
                                {extraInfor.note}
                            </div>
                            <div className="text-3">
                                <FormattedMessage id="patient.extra-infor-doctor.payment" />
                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI
                                    ? extraInfor.paymentTypeData.valueVi
                                    : ''}
                                {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN
                                    ? extraInfor.paymentTypeData.valueEn
                                    : ''}
                            </div>
                            <div className="text-4">
                                <span onClick={() => this.showHideDetailPrice(false)}>
                                    <FormattedMessage id="patient.extra-infor-doctor.hide-price-list" />
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
