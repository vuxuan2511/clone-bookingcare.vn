import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            iconClear: false,
        };
    }
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    };
    //
    OnChangeInput = (e) => {
        let value = e.target.value;
        this.setState({
            searchValue: value,
            iconClear: true,
        });
    };
    handleClearInputSearch = (e) => {
        this.setState({
            searchValue: '',
            iconClear: false,
        });
    };
    render() {
        let languagess = this.props.language;

        return (
            <div className="container-header">
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="btn-menu-group fas fa-bars"></i>

                            <div className="logo" onClick={() => this.returnToHome()}></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <a href="/" className="center-header-link">
                                    <div className="text-header">
                                        <FormattedMessage id="homeheader.specialist" />
                                    </div>
                                    <div className="text-header-desc">
                                        <FormattedMessage id="homeheader.searchBySpecialty" />
                                    </div>
                                </a>
                            </div>
                            <div className="child-content">
                                <a href="/" className="center-header-link">
                                    <div className="text-header">
                                        <FormattedMessage id="homeheader.healthFacilities" />
                                    </div>
                                    <div className="text-header-desc">
                                        <FormattedMessage id="homeheader.chooseHospitalClinic" />
                                    </div>
                                </a>
                            </div>
                            <div className="child-content">
                                <a href="/" className="center-header-link">
                                    <div className="text-header">
                                        <FormattedMessage id="homeheader.doctor" />
                                    </div>
                                    <div className="text-header-desc">
                                        <FormattedMessage id="homeheader.chooseDoctor" />
                                    </div>
                                </a>
                            </div>
                            <div className="child-content">
                                <a href="/" className="center-header-link">
                                    <div className="text-header">
                                        <FormattedMessage id="homeheader.medicalPackage" />
                                    </div>
                                    <div className="text-header-desc">
                                        <FormattedMessage id="homeheader.generalHealthCheck" />
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className={languagess === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span>
                            </div>
                            <div className={languagess === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                            <a href="/" className="right-header-link">
                                <div className="support">
                                    <i className="far fa-question-circle"></i>
                                    <FormattedMessage id="homeheader.support" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true && (
                    <div className="home-header-banner">
                        <div className="banner-up">
                            <div className="title-1">
                                <FormattedMessage id="banner.communityHealth" />
                            </div>
                            <div className="title-2">
                                <FormattedMessage id="banner.comprehensiveHealthCare" />
                            </div>
                            <div className="header-search">
                                <i className="btn-search fas fa-search"></i>
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="T??m ph??ng kh??m"
                                    value={this.state.searchValue}
                                    onChange={(e) => this.OnChangeInput(e)}
                                />
                                {this.state.iconClear === true && (
                                    <i
                                        className="btn-clear fas fa-times"
                                        onClick={(e) => this.handleClearInputSearch(e)}
                                    ></i>
                                )}
                            </div>
                        </div>
                        <div className="banner-down">
                            <div className="options">
                                <a href="/" className="option-link">
                                    <div className="item">
                                        <div className="option-img1"></div>
                                        <FormattedMessage id="banner.child1" />
                                    </div>
                                </a>
                                <a href="/" className="option-link">
                                    <div className="item">
                                        <div className="option-img2"></div>
                                        <FormattedMessage id="banner.child2" />
                                    </div>
                                </a>
                                <a href="/" className="option-link">
                                    <div className="item">
                                        <div className="option-img3"></div>
                                        <FormattedMessage id="banner.child3" />
                                    </div>
                                </a>
                                <a href="/" className="option-link">
                                    <div className="item">
                                        <div className="option-img4"></div>
                                        <FormattedMessage id="banner.child4" />
                                    </div>
                                </a>
                                <a href="/" className="option-link">
                                    <div className="item">
                                        <div className="option-img5"></div>
                                        <FormattedMessage id="banner.child5" />
                                    </div>
                                </a>
                                <a href="/" className="option-link">
                                    <div className="item">
                                        <div className="option-img6"></div>
                                        <FormattedMessage id="banner.child6" />
                                    </div>
                                </a>
                                <a href="/" className="option-link">
                                    <div className="item">
                                        <div className="option-img7"></div>
                                        <FormattedMessage id="banner.child7" />
                                    </div>
                                </a>
                                <a href="/" className="option-link">
                                    <div className="item">
                                        <div className="option-img8"></div>
                                        <FormattedMessage id="banner.child8" />
                                    </div>
                                </a>
                                <a href="/" className="option-link">
                                    <div className="item">
                                        <div className="option-img9"></div>
                                        <FormattedMessage id="banner.child9" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
