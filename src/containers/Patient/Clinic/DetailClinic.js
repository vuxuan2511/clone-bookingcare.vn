import React, { Component } from 'react';
// import * as actions from '../../../store/actions';
// import { FormattedMessage } from 'react-intl';
// import { LANGUAGES } from '../../../utils';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import { getDeatilClinicById } from '../../../services/userService';
import _ from 'lodash';
import './DetailClinic.scss';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataClinic: {},
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let arrDoctorId = [];
            let res = await getDeatilClinicById({
                id: id,
            });

            if (res && res.errCode === 0) {
                let data = res.data;
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                            return arrDoctorId;
                        });
                    }
                }
            }

            this.setState({
                dataClinic: res.data,
                arrDoctorId: arrDoctorId,
            });
        }
    }

    componentDidUpdate(preProps, preState, snapshot) {}

    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let arrDoctorId = [];

            let res = await getDeatilClinicById({
                id: id,
            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arr = data.doctorClinic;
                if (arr && arr.length > 0) {
                    arr.map((item) => {
                        arrDoctorId.push(item.doctorId);
                        return arrDoctorId;
                    });
                }
            }
            this.setState({
                dataClinic: res.data,
                arrDoctorId: arrDoctorId,
            });
        }
    };

    render() {
        let { arrDoctorId, dataClinic } = this.state;
        // let { language } = this.props;

        return (
            <div className="detail-clinic">
                <HomeHeader isShowBanner={false} />
                <div className="detail-clinic-container container">
                    <div className=" infor-clinic">
                        <div className="description-clinic ">
                            {dataClinic && !_.isEmpty(dataClinic) && (
                                <>
                                    <div className="name-clinic">{dataClinic.name}</div>
                                    <div dangerouslySetInnerHTML={{ __html: dataClinic.descriptionHTML }}></div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className=" list-doctor">
                        {arrDoctorId &&
                            arrDoctorId.length > 0 &&
                            arrDoctorId.map((item, index) => {
                                return (
                                    <div className="infor-doctor" key={index}>
                                        <div className="content-left">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescription={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                        <div className="content-right">
                                            <DoctorSchedule detailDoctorFromParent={item} />
                                            <DoctorExtraInfor detailDoctorFromParent={item} />
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
