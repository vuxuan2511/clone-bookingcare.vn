import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';

import './ManageSchedule.scss';

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
        if (preProps.language !== this.props.language) {
            let dataSelect = this.buildDataInput(this.props.allDoctors);
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (preProps.allScheduleTimes !== this.props.allScheduleTimes) {
            this.setState({
                rangeTime: this.props.allScheduleTimes,
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
                return (
                    (object.label = language === LANGUAGES.VI ? labelVi : labelEn),
                    (object.value = item.id),
                    result.push(object)
                );
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
    //
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
                                    <button className=" btn-schedule" key={index}>
                                        {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                    </button>
                                );
                            })}
                    </div>
                    <div className="col-12">
                        <button className="btn btn-primary">
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
