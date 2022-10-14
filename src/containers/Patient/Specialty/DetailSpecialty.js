import React, { Component } from 'react';
// import * as actions from '../../../store/actions';
// import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import { getDeatilSpecialtyById, getAllcodeService } from '../../../services/userService';
import _ from 'lodash';
import './DetailSpecialty.scss';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataSpecialty: {},
            listProvince: [],
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let arrDoctorId = [];
            let res = await getDeatilSpecialtyById({
                id: id,
                location: 'ALL',
            });
            let resProvince = await getAllcodeService('PROVINCE');
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctorId.push(item.doctorId);
                            return arrDoctorId;
                        });
                    }
                }
            }
            let dataProvince = resProvince.data;
            if (dataProvince && dataProvince.length > 0) {
                dataProvince.unshift({
                    createedAt: null,
                    keyMap: 'ALL',
                    type: 'PROVINCE',
                    valueEN: 'All',
                    valueVI: 'Toàn Quốc',
                });
            }
            this.setState({
                dataSpecialty: res.data,
                arrDoctorId: arrDoctorId,
                listProvince: dataProvince ? dataProvince : [],
            });
        }
    }

    componentDidUpdate(preProps, preState, snapshot) {}

    handleOnchangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let arrDoctorId = [];

            let res = await getDeatilSpecialtyById({
                id: id,
                location: location,
            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arr = data.doctorSpecialty;
                if (arr && arr.length > 0) {
                    arr.map((item) => {
                        arrDoctorId.push(item.doctorId);
                        return arrDoctorId;
                    });
                }
            }
            this.setState({
                dataSpecialty: res.data,
                arrDoctorId: arrDoctorId,
            });
        }
    };

    render() {
        let { arrDoctorId, dataSpecialty, listProvince } = this.state;
        let { language } = this.props;

        return (
            <div className="detail-specialty">
                <HomeHeader isShowBanner={false} />
                <div className="detail-specialty-container container">
                    <div className=" infor-specialty">
                        <div className="description-specialty ">
                            {dataSpecialty && !_.isEmpty(dataSpecialty) && (
                                <div dangerouslySetInnerHTML={{ __html: dataSpecialty.descriptionHTML }}></div>
                            )}
                        </div>
                        <div className="search-sp-doctor">
                            <select onChange={(event) => this.handleOnchangeSelect(event)}>
                                {listProvince &&
                                    listProvince.length > 0 &&
                                    listProvince.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                            </option>
                                        );
                                    })}
                            </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
