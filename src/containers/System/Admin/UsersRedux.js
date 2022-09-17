import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';

import './UserReduc.scss';

//

//
class UsersRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        //this.props.dispatch(action.getGenderStart());
    }
    componentDidUpdate(preProps, preStates, snapshot) {
        if (preProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
            });
        }
        if (preProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
            });
        }
        if (preProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
            });
        }
    }
    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectURL,
            });
        }
    };
    openPreviewImg = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        });
    };
    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;

        return (
            <div className="user-redux-container">
                <div className="user-redux-loading"> {isGetGender === true ? 'is loading Gender' : ''}</div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mt-3 mb-3 title-manage-user">
                            <FormattedMessage id="manage-user.add" />
                        </div>
                        <div className="col-6 user-redux-input">
                            <label> Email</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="col-6 user-redux-input ">
                            <label>
                                <FormattedMessage id="manage-user.password" />
                            </label>
                            <input type="Password" className="form-control" />
                        </div>
                        <div className="col-6 user-redux-input">
                            <label>
                                <FormattedMessage id="manage-user.first-name" />
                            </label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-6 user-redux-input">
                            <label>
                                <FormattedMessage id="manage-user.last-name" />
                            </label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-9 user-redux-input">
                            <label>
                                <FormattedMessage id="manage-user.address" />
                            </label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-3 user-redux-input">
                            <label>
                                <FormattedMessage id="manage-user.phone-number" />
                            </label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-3 user-redux-input">
                            <label>
                                <FormattedMessage id="manage-user.gender" />
                            </label>
                            <select className="form-control">
                                {genders &&
                                    genders.length > 0 &&
                                    genders.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="col-3 user-redux-input">
                            <label>
                                <FormattedMessage id="manage-user.position" />
                            </label>
                            <select className="form-control">
                                {positions &&
                                    positions.length > 0 &&
                                    positions.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>
                        <div className="col-3 user-redux-input">
                            <label>
                                <FormattedMessage id="manage-user.role-id" />
                            </label>
                            <select className="form-control">
                                {roles &&
                                    roles.length > 0 &&
                                    roles.map((item, index) => {
                                        return (
                                            <option key={index}>
                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                            </option>
                                        );
                                    })}
                            </select>
                        </div>

                        <div className="col-3 user-redux-input">
                            <label>
                                <FormattedMessage id="manage-user.image" />
                            </label>
                            <div className="btn-upload">
                                <div>
                                    <input
                                        type="file"
                                        id="previewImg"
                                        hidden
                                        onChange={(e) => this.handleOnchangeImage(e)}
                                    />
                                    <label htmlFor="previewImg" className="btn-upload-img">
                                        <i className="fas fa-cloud-upload-alt"></i>
                                        <FormattedMessage id="manage-user.choose-flie" />
                                    </label>
                                </div>
                                <div
                                    className="preview-img"
                                    style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                    onClick={() => this.openPreviewImg()}
                                ></div>
                            </div>
                        </div>

                        <div className="col-12 mt-5 btn-save">
                            <button className="btn btn-primary">
                                <FormattedMessage id="manage-user.save" />
                            </button>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersRedux);
