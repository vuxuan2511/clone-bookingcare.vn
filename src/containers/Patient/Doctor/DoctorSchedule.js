import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
//import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import './DoctorSchedule.scss';
import { getScheduleDoctorByDate } from '../../../services/userService';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
        };
    }
    componentDidMount() {
        let { language } = this.props;
        this.setArrDay(language);
    }
    componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {
            this.setArrDay(this.props.language);
        }
    }

    setArrDay = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.lable = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            } else {
                object.lable = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }

        this.setState({
            allDays: allDays,
        });
    };

    handleOnChangeSelected = async (event) => {
        if (this.props.detailDoctorFromParent && this.props.detailDoctorFromParent.id !== -1) {
            let doctorId = this.props.detailDoctorFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            console.log('check res: ', res);
        }
    };

    render() {
        let { allDays } = this.state;
        return (
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
