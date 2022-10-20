import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import * as actions from '../../../store/actions';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import { toast } from 'react-toastify';
import LoadingOverLay from 'react-loading-overlay';
import RemedyModal from './RemedyModal';

import './ManagePatient.scss';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        };
    }
    componentDidMount() {
        this.getDataPatient();
    }
    componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {
        }
    }
    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        let res = await getListPatientForDoctor({
            doctorId: user.id,
            date: formatedDate,
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data,
            });
        }
    };

    handleOnchangeDatePicker = async (date) => {
        this.setState(
            {
                currentDate: date[0],
            },
            async () => {
                await this.getDataPatient();
            },
        );
    };

    handleConfirmBtn = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,
        };
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data,
        });
    };
    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {},
        });
    };
    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true,
        });
        let res = await postSendRemedy({
            email: dataChild.email,
            imageBase64: dataChild.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
        });
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false,
            });
            toast.success('send remedy success');
            this.closeRemedyModal();
            await this.getDataPatient();
        } else {
            this.setState({
                isShowLoading: false,
            });
            toast.error('something wrongs...');
        }
    };

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;

        return (
            <>
                <LoadingOverLay active={this.state.isShowLoading} spinner text="loading..." className="loading-overlay">
                    <div className="manage-patient-container container">
                        <div className="manage-patient-title">Quản lý Bệnh nhân đặt lịch khám bệnh</div>
                        <div className="manage-patient-body row">
                            <div className="col-4 form-group">
                                <label>Chọn Ngày Khám</label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnchangeDatePicker}
                                    value={this.state.currentDate}
                                    // minDate={new Date()}
                                />
                            </div>
                            <div className="manage-patient-table">
                                <table style={{ width: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <td>STT</td>
                                            <td>Thời Gian</td>
                                            <td>Họ Và Tên</td>
                                            <td>Địa Chỉ</td>
                                            <td>Giới tính</td>
                                            <td>Actions</td>
                                        </tr>

                                        {dataPatient && dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let gender =
                                                    language === LANGUAGES.VI
                                                        ? item.patientData.genderData.valueVi
                                                        : item.patientData.genderData.valueEn;
                                                let time =
                                                    language === LANGUAGES.VI
                                                        ? item.timeTypeDataPatient.valueVi
                                                        : item.timeTypeDataPatient.valueEn;
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{gender}</td>
                                                        <td>
                                                            <button
                                                                className="btn-conform"
                                                                onClick={() => this.handleConfirmBtn(item)}
                                                            >
                                                                Xác Nhận
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="6"
                                                    style={{
                                                        textAlign: 'center',
                                                        fontSize: '1.5rem',
                                                        fontWeight: '600',
                                                    }}
                                                >
                                                    No data
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverLay>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
