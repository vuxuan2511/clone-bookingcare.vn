import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';

import './Section.scss';

class SectionDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    componentDidUpdate(preProps, preStates, snapshot) {
        if (preProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux,
            });
        }
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        return (
            <div className="section-wrapper section-doctor">
                <div className="section-specialty-content">
                    <h2>
                        <FormattedMessage id="homepage.out-standing-doctor" />
                    </h2>
                    <button className="section-more-btn">
                        <FormattedMessage id="homepage.more-btn" />
                    </button>
                </div>
                <div className="section-specialty-container">
                    <Slider {...this.props.settings}>
                        {arrDoctors &&
                            arrDoctors.length > 0 &&
                            arrDoctors.map((item, index) => {
                                let imagebase64 = '';
                                if (item.image) {
                                    imagebase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div className="slide-item-doctor" key={index}>
                                        <div className="section-doctor-slide-item">
                                            <img className="section-doctor-img-item" src={imagebase64} alt="" />

                                            <div className="name-doctor">
                                                {language === LANGUAGES.VI ? nameVi : nameEn}
                                            </div>
                                        </div>
                                        <div className="slide-description">Da Liễu </div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionDoctor);
