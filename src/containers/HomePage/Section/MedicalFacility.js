import React, { Component } from 'react';
import { connect } from 'react-redux';

//
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
//
import './Section.scss';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
        };
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinics: res.data ? res.data : [],
            });
        }
    }
    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`);
        }
    };
    render() {
        let { dataClinics } = this.state;
        return (
            <div className="section-wrapper medical-facility">
                <div className="section-specialty-content">
                    <h2> Cơ sở Y Tế Nổi Bật</h2>
                    <button className="section-more-btn">Xem thêm...</button>
                </div>
                <div className="section-specialty-container">
                    <Slider {...this.props.settings}>
                        {dataClinics &&
                            dataClinics.length > 0 &&
                            dataClinics.map((item, index) => {
                                let imagebase64 = '';
                                if (item.image) {
                                    imagebase64 = new Buffer.from(item.image, 'base64').toString('binary');
                                }
                                return (
                                    <div
                                        className="slide-item"
                                        key={index}
                                        onClick={() => this.handleViewDetailClinic(item)}
                                    >
                                        <div className="medical-facility-slide-item">
                                            <img
                                                className="medical-facility-img-item"
                                                src={imagebase64}
                                                alt={item.name}
                                            />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
