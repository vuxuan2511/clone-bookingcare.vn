import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, USER_ROLE } from '../../utils';
import _ from 'lodash';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: [],
        };
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    };

    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }
        this.setState({
            menuApp: menu,
        });
    }

    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
                <div className="header-container-right-content">
                    <div className="languages">
                        <span className="languages-welcome">
                            <FormattedMessage id="homeheader.welcome" />
                            {userInfo && userInfo.firstName ? userInfo.firstName : ''} !
                        </span>
                        <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                            <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span>
                        </div>
                        <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                            <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                        </div>
                    </div>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Logout">
                        <i className="fas fa-sign-out-alt"></i>
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
