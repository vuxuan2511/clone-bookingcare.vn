import React, { Component } from 'react';
// import * as actions from '../../../store/actions';
// import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { connect } from 'react-redux';
import { getProfileDoctorById } from '../../../services/userService';
import './ProfileDoctor.scss';
import _ from 'lodash';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }
    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }

    componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {
        }
        if (this.props.doctorId !== preProps.doctorId) {
            this.getInforDoctor(this.props.doctorId);
        }
    }

    getInforDoctor = async (id) => {
        let result = '';
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };
    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        let timeSchedule = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            timeSchedule = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            let date =
                language === LANGUAGES.VI
                    ? moment.unix(+new Date(dataTime.date / 1000)).format('dddd - DD/MM/YY')
                    : moment
                          .unix(+new Date(dataTime.date / 1000))
                          .locale('en')
                          .format('ddd - MM/DD/YY');

            return (
                <>
                    <div>
                        {timeSchedule} {date}
                    </div>
                    <div>Miễn phí đặt lịch</div>
                </>
            );
        }
    };

    render() {
        let { language, isShowDescription, dataTime, isShowPrice, isShowLinkDetail, doctorId } = this.props;
        let { dataProfile } = this.state;
        let nameVi = '';
        let nameEn = '';
        let priceVi = '';
        let priceEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        }
        if (dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceTypeData) {
            priceVi = dataProfile.Doctor_Infor.priceTypeData.valueVI;
            priceEn = dataProfile.Doctor_Infor.priceTypeData.valueEN;
        }

        return (
            <div className="profile-doctor-intro-doctor">
                <div className="content-up">
                    <div className="intro-doctor-content-left">
                        <img className="intro-doctor-img" src={this.state.dataProfile.image} alt="" />
                    </div>
                    <div className="intro-doctor-content-right">
                        <div className="doctor-content-up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>

                        <div className="doctor-profile-content-down">
                            {isShowDescription === true ? (
                                <div className="doctor-content-down">
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                                        <span>{dataProfile.Markdown.description}</span>
                                    )}
                                </div>
                            ) : (
                                <>{this.renderTimeBooking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>
                {isShowLinkDetail === true && (
                    <div className="view-doctor-detail">
                        <Link to={`/detail-doctor/${doctorId}`}>Xem Thêm</Link>
                    </div>
                )}
                {isShowPrice === true && (
                    <div className="price">
                        <label>Giá Khám: {language === LANGUAGES.VI ? priceVi : priceEn}</label>
                    </div>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
