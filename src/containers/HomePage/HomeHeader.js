import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
class HomeHeader extends Component {
    render() {
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-conten">
                        <div className="left-content">
                            <i className="btn-menu-group fas fa-bars"></i>
                            <div className="logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <a href="/" className="center-header-link">
                                    <div className="text-header"> Chuyên khoa</div>
                                    <div className="text-header-desc">Tìm theo bác sĩ chuyên khoa</div>
                                </a>
                            </div>
                            <div className="child-content">
                                <a href="/" className="center-header-link">
                                    <div className="text-header">Cơ sở y tế</div>
                                    <div className="text-header-desc">Chọn bệnh viện phòng khám</div>
                                </a>
                            </div>
                            <div className="child-content">
                                <a href="/" className="center-header-link">
                                    <div className="text-header"> bác sĩ</div>
                                    <div className="text-header-desc">Chọn bác sĩ giỏi</div>
                                </a>
                            </div>
                            <div className="child-content">
                                <a href="/" className="center-header-link">
                                    <div className="text-header"> Gói khám </div>
                                    <div className="text-header-desc">Khám sức khỏe tổng quát</div>
                                </a>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="flag">VN</div>
                            <a href="/" className="right-header-link">
                                <div className="support">
                                    <i className="far fa-question-circle"></i>
                                    Hỗ trợ
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="banner-up">
                        <div className="title-1">Nền tảng y tế</div>
                        <div className="title-2">Chăm sóc sức khỏe toàn diện</div>
                        <div className="header-search">
                            <i className="btn-search fas fa-search"></i>
                            <input type="text" className="search-input" placeholder="Tìm phòng khám" />
                            <i className="btn-clear fas fa-times"></i>
                        </div>
                    </div>
                    <div className="banner-down">
                        <div className="options">
                            <a href="/" className="option-link">
                                <div className="item">
                                    <div className="option-img1"></div>
                                    <div className="option-text">Khám Chuyên Khoa</div>
                                </div>
                            </a>
                            <a href="/" className="option-link">
                                <div className="item">
                                    <div className="option-img2"></div>
                                    <div className="option-text">Khám Từ Xa</div>
                                </div>
                            </a>
                            <a href="/" className="option-link">
                                <div className="item">
                                    <div className="option-img3"></div>
                                    <div className="option-text">Khám Tổng quát</div>
                                </div>
                            </a>
                            <a href="/" className="option-link">
                                <div className="item">
                                    <div className="option-img4"></div>
                                    <div className="option-text">Xét Nghiệm Y Học</div>
                                </div>
                            </a>
                            <a href="/" className="option-link">
                                <div className="item">
                                    <div className="option-img5"></div>
                                    <div className="option-text">Sức Khỏe Tinh Thần</div>
                                </div>
                            </a>
                            <a href="/" className="option-link">
                                <div className="item">
                                    <div className="option-img6"></div>
                                    <div className="option-text">Khám Nha Khoa</div>
                                </div>
                            </a>
                            <a href="/" className="option-link">
                                <div className="item">
                                    <div className="option-img7"></div>
                                    <div className="option-text">Gói Phẫu Thuật</div>
                                </div>
                            </a>
                            <a href="/" className="option-link">
                                <div className="item">
                                    <div className="option-img8"></div>
                                    <div className="option-text">Sản Phẩm Y Tế</div>
                                </div>
                            </a>
                            <a href="/" className="option-link">
                                <div className="item">
                                    <div className="option-img9"></div>
                                    <div className="option-text">Sức Khỏe Danh Nghiệp</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
