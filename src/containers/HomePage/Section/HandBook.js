import React, { Component } from 'react';
import { connect } from 'react-redux';

//
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

//
import './Section.scss';

class HandBook extends Component {
    render() {
        return (
            <div className="section-wrapper medical-facility">
                <div className="section-specialty-content">
                    <h2> Cẩm Nang</h2>
                    <button className="section-more-btn">Xem thêm...</button>
                </div>
                <div className="section-specialty-container">
                    <Slider {...this.props.settings}>
                        <div className="slide-item">
                            <div className="medical-facility-slide-item">
                                <img
                                    className="medical-facility-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="slide-description">Bệnh viện hữu nghị Việt - Đức</div>
                        </div>
                        <div className="slide-item">
                            <div className="medical-facility-slide-item">
                                <img
                                    className="medical-facility-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="slide-description">Bệnh viện hữu nghị Việt - Đức</div>
                        </div>
                        <div className="slide-item">
                            <div className="medical-facility-slide-item">
                                <img
                                    className="medical-facility-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="slide-description">Bệnh viện hữu nghị Việt - Đức</div>
                        </div>
                        <div className="slide-item">
                            <div className="medical-facility-slide-item">
                                <img
                                    className="medical-facility-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="slide-description">Bệnh viện hữu nghị Việt - Đức</div>
                        </div>
                        <div className="slide-item">
                            <div className="medical-facility-slide-item">
                                <img
                                    className="medical-facility-img-item"
                                    src="https://image.thanhnien.vn/w1024/Uploaded/2022/tnabtw/2021_12_09/ta03-7305.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="slide-description">Bệnh viện hữu nghị Việt - Đức</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
