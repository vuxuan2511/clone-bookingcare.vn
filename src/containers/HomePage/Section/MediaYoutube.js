import React, { Component } from 'react';
import { connect } from 'react-redux';

//

import './Section.scss';

class MediaYoutube extends Component {
    render() {
        return (
            <div className="media-youtube">
                <div className="media-youtube-title">Truyền Thông Nói Gì Về BookingCare</div>
                <div className="media-youtube-content">
                    <div className="media-youtube-video">
                        <iframe
                            width="100%"
                            height="350"
                            src="https://www.youtube.com/embed/JHuEUjgmF_c"
                            title="TRUNG AHRI | GÁNH TEAM LÀ MỘT VIỆC KHÔNG BAO GIỜ LÀ DỄ DÀNG"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="media-youtube-description">
                        100% ủy viên, thành viên Hội đồng thẩm định Quy hoạch tổng thể Quốc gia thời kỳ 2021-2030 tầm
                        nhìn đến 2050 đã nhất trí: Thông qua hồ sơ quy hoạch và dự thảo báo cáo thẩm định. --- Phó Thủ
                        tướng Lê Văn Thành thông báo
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MediaYoutube);
