import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
import { saveBulkScheduleDoctor } from '../../../services/userService';

import './ManageSchedule.scss';
import _ from 'lodash';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleTimes();
    }
    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInput(this.props.allDoctors);
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (this.props.language !== preProps.language) {
            let dataSelect = this.buildDataInput(this.props.allDoctors);
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (preProps.allScheduleTimes !== this.props.allScheduleTimes) {
            let data = this.props.allScheduleTimes;
            if (data && data.length > 0) {
                data = data.map((item) => ({ ...item, isSelected: false }));
            }
            this.setState({
                rangeTime: data,
            });
        }
    }
    buildDataInput = (inputData) => {
        let result = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                return result.push(object);
            });
        }
        return result;
    };
    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
    };
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };

    handleClickBtnTimes = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
            this.setState({
                rangeTime: rangeTime,
            });
        }
    };

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error('Invalid date !');
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid seclected doctor !');
            return;
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

        let formatedDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter((item) => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    return result.push(object);
                });
            } else {
                toast.error('Invalid seclected time !');
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate,
        });
        console.log('check res:', res);
    };

    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;

        return (
            <div className="manage-schedule-container container">
                <div className="manage-schedule-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="row mt-4">
                    <div className="col-4 form-group">
                        <label>
                            <FormattedMessage id="manage-schedule.choose-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                        />
                    </div>
                    <div className="col-2 form-group">
                        <label>
                            <FormattedMessage id="manage-schedule.choose-date" />
                        </label>
                        <DatePicker
                            className="form-control"
                            onChange={this.handleOnchangeDatePicker}
                            value={this.state.currentDate}
                            minDate={new Date()}
                        />
                    </div>
                    <div className="col-12 pick-hour-container">
                        {rangeTime &&
                            rangeTime.length > 0 &&
                            rangeTime.map((item, index) => {
                                return (
                                    <button
                                        className={item.isSelected === true ? ' btn-schedule active' : ' btn-schedule'}
                                        key={index}
                                        onClick={() => this.handleClickBtnTimes(item)}
                                    >
                                        {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                    </button>
                                );
                            })}
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary" onClick={() => this.handleSaveSchedule()}>
                            <FormattedMessage id="manage-schedule.save" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allScheduleTimes: state.admin.allScheduleTimes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTimes: () => dispatch(actions.fetchAllScheduleTimes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
