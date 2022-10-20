import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import Select from 'react-select';
import { LANGUAGES } from '../../../../utils';
import moment from 'moment/moment';
// import { FormattedMessage } from 'react-intl';
import DatePicker from '../../../../components/Input/DatePicker';
import { postPatientbookAppointment } from '../../../../services/userService';
import * as actions from '../../../../store/actions';
import ProfileDoctor from '../ProfileDoctor';
import { toast } from 'react-toastify';
import './BookingModal.scss';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            brithday: '',
            selectedGender: '',
            genders: '',
            doctorId: '',
            timeType: '',
        };
    }
    componentDidMount() {
        this.props.getGenders();
    }
    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item) => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVI : item.valueEN;
                object.value = item.keyMap;
                return result.push(object);
            });
        }
        return result;
    };

    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.genders !== preProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders),
            });
        }
        if (this.props.dataTime !== preProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                });
            }
        }
    }

    handleOnchangInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy,
        });
    };
    handleOnchangeDatePicker = (date) => {
        this.setState({
            brithday: date[0],
        });
    };
    handleChangSelect = (selectedGender) => {
        this.setState({ selectedGender: selectedGender });
    };
    BuildTimeBooking = (dataTime) => {
        let { language } = this.props;
        let timeSchedule = '';
        let date = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            timeSchedule = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

            date =
                language === LANGUAGES.VI
                    ? moment.unix(+new Date(dataTime.date / 1000)).format('dddd - DD/MM/YY')
                    : moment
                          .unix(+new Date(dataTime.date / 1000))
                          .locale('en')
                          .format('ddd - MM/DD/YY');

            return `${timeSchedule} - ${date}`;
        }
    };
    BuildDoctorName = (dataTime) => {
        let { language } = this.props;
        let name = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            name =
                language === LANGUAGES.VI
                    ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
                    : `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
            return name;
        }
    };
    handleConfirmBooking = async () => {
        let date = new Date(this.state.brithday).getTime();
        let timeString = this.BuildTimeBooking(this.props.dataTime);
        let doctorName = this.BuildDoctorName(this.props.dataTime);
        let res = await postPatientbookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            brithday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        });
        if (res && res.errCode === 0) {
            toast.success('Booking a new Appointment success !');
            this.props.closeBookingModal();
        } else {
            toast.error('Booking a new Appointment error !');
        }
    };

    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';
        return (
            <Modal isOpen={isOpenModal} toggle={this.toggle} className={'booking-modal-container'} size="lg" centered>
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <div className="booking-modal-header-title">Booking Modal Header</div>

                        <i onClick={closeBookingModal} className="fas fa-times"></i>
                    </div>
                    <div className="booking-modal-body">
                        <div className="">
                            {/* {JSON.stringify(dataTime)} */}
                            <div className="infor-doctor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescription={false}
                                    dataTime={dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>

                            <div className="row form-input-container">
                                <div className="col-6 form-group">
                                    <label>Họ Và Tên</label>
                                    <input
                                        className="form-control"
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnchangInput(event, 'fullName')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Email</label>
                                    <input
                                        className="form-control"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchangInput(event, 'email')}
                                    />
                                </div>
                                <div className="col-4 form-group">
                                    <label>Ngày sinh</label>
                                    <DatePicker
                                        className="form-control"
                                        value={this.state.brithday}
                                        onChange={this.handleOnchangeDatePicker}
                                    />
                                </div>
                                <div className="col-4 form-group">
                                    <label>Giới tính</label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                                <div className="col-4 form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnchangInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Địa chỉ </label>
                                    <input
                                        className="form-control"
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnchangInput(event, 'address')}
                                    />
                                </div>

                                <div className="col-12 form-group">
                                    <label>Lý do khám </label>
                                    <input
                                        className="form-control"
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnchangInput(event, 'reason')}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button onClick={closeBookingModal} className="btn-cancel">
                            Cancel
                        </button>
                        <button onClick={() => this.handleConfirmBooking()} className="btn-save">
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
