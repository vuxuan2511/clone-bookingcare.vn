import React, { Component } from 'react';
// import * as actions from '../../../store/actions';
// import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailInforDoctor } from '../../../services/userService';

import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
import './DetailDoctor.scss';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        };
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            this.setState({
                currentDoctorId: id,
            });
            if (res && res.data) {
                this.setState({
                    detailDoctor: res.data,
                });
            }
        }
    }

    componentDidUpdate(preProps, preState, snapshot) {}

    render() {
        let { language } = this.props;
        let { detailDoctor } = this.state;
        let nameVi = '';
        let nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container ">
                    <div className="intro-doctor">
                        <div className="intro-doctor-content-left">
                            <img className="intro-doctor-img" src={this.state.detailDoctor.image} alt="" />
                        </div>
                        <div className="intro-doctor-content-right">
                            <div className="doctor-content-up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                            <div className="doctor-content-down">
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description && (
                                    <span>{detailDoctor.Markdown.description}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="schedule-doctor-content-left">
                            <DoctorSchedule detailDoctorFromParent={this.state.currentDoctorId} />
                        </div>
                        <div className="schedule-doctor-content-right">
                            <DoctorExtraInfor detailDoctorFromParent={this.state.currentDoctorId} />
                        </div>
                    </div>
                    <div className="detail-infor-doctor">
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
                            <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>
                        )}
                    </div>
                    <div className="comment-doctor"></div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
