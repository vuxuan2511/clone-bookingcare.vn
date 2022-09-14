import React, { Component } from 'react';
import { connect } from 'react-redux';

//
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//
import './Section.scss';

class SectionDoctor extends Component {
    render() {
        return (
            <div className="section-wrapper section-doctor">
                <div className="section-specialty-content">
                    <h2> Bác Sĩ Nổi Bật Tuần Qua</h2>
                    <button className="section-more-btn">Xem thêm...</button>
                </div>
                <div className="section-specialty-container">
                    <Slider {...this.props.settings}>
                        <div className="slide-item-doctor">
                            <div className="section-doctor-slide-item">
                                <img
                                    className="section-doctor-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />

                                <div className="name-doctor">Phó Giáo Sư, Tiến Sĩ, Bác Sĩ Cao Cấp Vũ Ngọc Xuân</div>
                            </div>
                            <div className="slide-description">Da Liễu </div>
                        </div>
                        <div className="slide-item-doctor">
                            <div className="section-doctor-slide-item">
                                <img
                                    className="section-doctor-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />

                                <div className="name-doctor">Phó Giáo Sư, Tiến Sĩ, Bác Sĩ Cao Cấp Vũ Ngọc Xuân</div>
                            </div>
                            <div className="slide-description">Da Liễu</div>
                        </div>
                        <div className="slide-item-doctor">
                            <div className="section-doctor-slide-item">
                                <img
                                    className="section-doctor-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />

                                <div className="name-doctor">Phó Giáo Sư, Tiến Sĩ, Bác Sĩ Cao Cấp Vũ Ngọc Xuân</div>
                            </div>
                            <div className="slide-description">Da Liễu</div>
                        </div>
                        <div className="slide-item-doctor">
                            <div className="section-doctor-slide-item">
                                <img
                                    className="section-doctor-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />

                                <div className="name-doctor">Phó Giáo Sư, Tiến Sĩ, Bác Sĩ Cao Cấp Vũ Ngọc Xuân</div>
                            </div>
                            <div className="slide-description">Da Liễu</div>
                        </div>
                        <div className="slide-item-doctor">
                            <div className="section-doctor-slide-item">
                                <img
                                    className="section-doctor-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />

                                <div className="name-doctor">Phó Giáo Sư, Tiến Sĩ, Bác Sĩ Cao Cấp Vũ Ngọc Xuân</div>
                            </div>
                            <div className="slide-description">Da Liễu</div>
                        </div>
                        <div className="slide-item-doctor">
                            <div className="section-doctor-slide-item">
                                <img
                                    className="section-doctor-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />

                                <div className="name-doctor">Phó Giáo Sư, Tiến Sĩ, Bác Sĩ Cao Cấp Vũ Ngọc Xuân</div>
                            </div>
                            <div className="slide-description">Da Liễu</div>
                        </div>

                        <div className="slide-item-doctor">
                            <div className="section-doctor-slide-item">
                                <img
                                    className="section-doctor-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />

                                <div className="name-doctor">Phó Giáo Sư, Tiến Sĩ, Bác Sĩ Cao Cấp Vũ Ngọc Xuân</div>
                            </div>
                            <div className="slide-description">Da Liễu</div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionDoctor);
