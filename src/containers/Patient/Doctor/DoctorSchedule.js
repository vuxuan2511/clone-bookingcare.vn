import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvalableTime: [],
            isShowModalBooking: false,
            dataScheduleTime: {},
        };
    }
    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDay(language);
        this.setState({
            allDays: allDays,
        });
        if (this.props.detailDoctorFromParent) {
            let res = await getScheduleDoctorByDate(this.props.detailDoctorFromParent, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : [],
            });
        }
    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {
            let allDays = this.getArrDay(this.props.language);
            this.setState({
                allDays: allDays,
            });
        }
        if (this.props.detailDoctorFromParent !== preProps.detailDoctorFromParent) {
            let allDays = this.getArrDay(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.detailDoctorFromParent, allDays[0].value);
            this.setState({
                allAvalableTime: res.data ? res.data : [],
            });
        }
    }

    getArrDay = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.lable = today;
                } else {
                    let lableVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.lable = this.capitalizeFirstLetter(lableVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.lable = today;
                } else {
                    object.lable = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;
    };

    handleOnChangeSelected = async (event) => {
        if (this.props.detailDoctorFromParent && this.props.detailDoctorFromParent.id !== -1) {
            let doctorId = this.props.detailDoctorFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvalableTime: res.data ? res.data : [],
                });
            }
        }
    };
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    handleOnClickScheduleTime = (time) => {
        this.setState({
            isShowModalBooking: true,
            dataScheduleTime: time,
        });
    };
    closeBookingModal = () => {
        this.setState({
            isShowModalBooking: false,
        });
    };

    render() {
        let { allDays, allAvalableTime, isShowModalBooking, dataScheduleTime } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(event) => this.handleOnChangeSelected(event)}>
                            {allDays &&
                                allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>
                                            {item.lable}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    <div className="all-avaliable-time-calendar">
                        <div className="text-calendar">
                            <span>
                                <i className="fas fa-calendar-alt"></i>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span>
                        </div>
                        <div className="time-content-schedule-doctor">
                            {allAvalableTime && allAvalableTime.length > 0 ? (
                                <>
                                    <div className="time-schedule">
                                        {allAvalableTime.map((item, index) => {
                                            let timeDisplay =
                                                language === LANGUAGES.VI
                                                    ? item.timeTypeData.valueVi
                                                    : item.timeTypeData.valueEn;
                                            return (
                                                <button
                                                    key={index}
                                                    className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-eng'}
                                                    onClick={() => this.handleOnClickScheduleTime(item)}
                                                >
                                                    {timeDisplay}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="title-book-free">
                                        <span>
                                            <FormattedMessage id="patient.detail-doctor.choose" />
                                            <i className="fas fa-hand-point-up"></i>
                                            <FormattedMessage id="patient.detail-doctor.and-booking-free" />
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="doctor-no-choose">
                                    <FormattedMessage id="patient.detail-doctor.schedule-no-choose" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal={isShowModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataScheduleTime}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
