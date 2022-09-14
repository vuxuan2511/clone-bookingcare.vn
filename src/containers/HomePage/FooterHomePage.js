import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FooterHomePage.scss';
class FooterHomePage extends Component {
    render() {
        return (
            <div className="footer-home-page">
                <div className="footer-hp-container">
                    <div className="footer-about cot-6">
                        <div className="logo-footer"></div>
                        <div className="name-company">Công ty cổ Phần phần Công Nghệ Vũ Ngọc Xuân</div>
                        <div className="location-company">
                            <i className="fas fa-map-marker-alt"></i>
                            28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                        </div>
                        <div className="footer-register">
                            <i className="far fa-check-square"></i>
                            ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
                        </div>
                        <div className="img-BCT"></div>
                    </div>
                    <div className="footer-connect cot-3">
                        <ul>
                            <li>
                                <a className="link-footer-connect" href="/">
                                    Liên hệ hợp tác
                                </a>
                            </li>
                            <li>
                                <a className="link-footer-connect" href="/">
                                    Gói chuyển đổi số doanh nghiệp
                                </a>
                            </li>
                            <li>
                                <a className="link-footer-connect" href="/">
                                    Tuyển dụng
                                </a>
                            </li>
                            <li>
                                <a className="link-footer-connect" href="/">
                                    Câu hỏi thường gặp
                                </a>
                            </li>
                            <li>
                                <a className="link-footer-connect" href="/">
                                    Điều khoản sử dụng
                                </a>
                            </li>
                            <li>
                                <a className="link-footer-connect" href="/">
                                    Chính sách bảo mật
                                </a>
                            </li>
                            <li>
                                <a className="link-footer-connect" href="/">
                                    Quy trình giải quyết khiếu nại
                                </a>
                            </li>
                            <li>
                                <a className="link-footer-connect" href="/">
                                    Quy chế hoạt động
                                </a>
                            </li>
                            <li>
                                <a className="link-footer-connect" href="/">
                                    Liên hệ hợp tác
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-address cot-3">
                        <div className="footer-address-item">
                            <span> Trụ sở tại Hà Nội</span> 28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                        </div>
                        <div className="footer-address-item">
                            <span> Văn phòng tại TP Hồ Chí Minh </span>Số 01, Hồ Bá Kiện, Phường 15, Quận 10
                        </div>
                        <div className="footer-address-item">
                            <span>Hỗ trợ khách hàng </span>support@vuxuan.vn (7h - 18h)
                        </div>
                    </div>
                </div>
                <div className="social-footer">
                    <div>
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-youtube"></i>
                        <i className="fab fa-google"></i>
                    </div>
                    <div className="footer-download">
                        <a href="/">
                            <i className="fas fa-mobile"></i>
                            Tải ứng dụng BookingCare
                        </a>
                    </div>
                </div>
                <div className="copy-right">© 2022 BookingCare and @vuxuan.</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterHomePage);
