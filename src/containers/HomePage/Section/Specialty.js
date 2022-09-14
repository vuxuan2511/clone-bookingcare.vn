import React, { Component } from 'react';
import { connect } from 'react-redux';

//
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//
import './Section.scss';

class Specialty extends Component {
    render() {
        return (
            <div className="section-wrapper specialty">
                <div className="section-specialty-content">
                    <h2> Chuyên Khoa Phổ Biến</h2>
                    <button className="section-more-btn">Xem thêm...</button>
                </div>
                <div className="section-specialty-container">
                    <Slider {...this.props.settings}>
                        <div className="slide-item">
                            <div className="specialty-slide-item">
                                <img
                                    className="specialty-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="slide-description">Cơ Xương Khớp</div>
                        </div>
                        <div className="slide-item">
                            <div className="specialty-slide-item">
                                <img
                                    className="specialty-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="slide-description">Cơ Xương Khớp</div>
                        </div>
                        <div className="slide-item">
                            <div className="specialty-slide-item">
                                <img
                                    className="specialty-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="slide-description">Cơ Xương Khớp</div>
                        </div>
                        <div className="slide-item">
                            <div className="specialty-slide-item">
                                <img
                                    className="specialty-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="slide-description">Cơ Xương Khớp</div>
                        </div>
                        <div className="slide-item">
                            <div className="specialty-slide-item">
                                <img
                                    className="specialty-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="slide-description">Cơ Xương Khớp</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
