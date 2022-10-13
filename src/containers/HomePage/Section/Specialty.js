import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
// import * as actions from '../../../store/actions';
// import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllSpecialties } from '../../../services/userService';
//
import './Section.scss';

class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
        };
    }
    async componentDidMount() {
        let res = await getAllSpecialties();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data,
            });
        }
    }
    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    };

    render() {
        let { dataSpecialty } = this.state;

        return (
            <div className="section-wrapper specialty">
                <div className="section-specialty-content">
                    <h2>
                        <FormattedMessage id="homepage.Popular-medical-specialties" />
                    </h2>
                    <button className="section-more-btn">Xem thêm...</button>
                </div>
                <div className="section-specialty-container">
                    <Slider {...this.props.settings}>
                        {dataSpecialty &&
                            dataSpecialty.length > 0 &&
                            dataSpecialty.map((item, index) => {
                                let imagebase64 = '';
                                if (item.image) {
                                    imagebase64 = new Buffer.from(item.image, 'base64').toString('binary');
                                }
                                return (
                                    <div
                                        className="slide-item"
                                        key={index}
                                        onClick={() => this.handleViewDetailSpecialty(item)}
                                    >
                                        <div className="specialty-slide-item">
                                            <img className="specialty-img-item" src={imagebase64} alt={item.name} />
                                        </div>
                                        <div className="slide-description">{item.name}</div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
