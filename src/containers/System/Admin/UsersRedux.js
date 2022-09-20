import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTION, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import TableManageUser from './TableManageUser';

import './UserRedux.scss';

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

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
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
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
            });
        }
        if (preProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
            });
        }
        if (preProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
            });
        }
        if (preProps.listUsers !== this.props.listUsers) {
            let arrGender = this.props.genderRedux;
            let arrPosition = this.props.positionRedux;
            let arrRole = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                avatar: '',
                previewImgURL: '',
                action: CRUD_ACTION.CREATE,
            });
        }
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectURL,
                avatar: base64,
            });
        }
    };
    openPreviewImg = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        });
    };

    handleSaveUser = () => {
        let isvalid = this.checkValidateInput();
        if (isvalid === false) return;
        let { action } = this.state;
        //redux action create
        if (action === CRUD_ACTION.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }
        if (action === CRUD_ACTION.EDIT) {
            // action edit user
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            });
        }
    };

    checkValidateInput = () => {
        let isvalid = true;
        let arrCkeck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrCkeck.length; i++) {
            if (!this.state[arrCkeck[i]]) {
                isvalid = false;
                alert('this input is required :', arrCkeck[i]);
                break;
            }
        }
        return isvalid;
    };
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'Password dont show',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTION.EDIT,
            userEditId: user.id,
        });
    };
    //
    render() {
        let language = this.props.language;
        let genders = this.state.genderArr;
        let isGetGender = this.props.isLoadingGender;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;

        let { email, password, firstName, lastName, phoneNumber, address, role, position, gender } = this.state;

        return (
            <div className="user-redux-container">
                <div className="user-redux-loading"> {isGetGender === true ? 'is loading Gender' : ''}</div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mt-3 mb-3 title-manage-user">
                            <FormattedMessage id="manage-user.add" />
                        </div>
                        <div className="col-3 user-redux-input">
                            <label> Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'email');
                                }}
                                disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                            />
                        </div>
                        <div className="col-3 user-redux-input ">
                            <label>
                                <FormattedMessage id="manage-user.password" />
                            </label>
                            <input
                                type="Password"
                                className="form-control"
                                value={password}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'password');
                                }}
                                disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                            />
                        </div>
                        <div className="col-3 user-redux-input">
                            <label>
                                <FormattedMessage id="manage-user.first-name" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'firstName');
                                }}
                            />
                        </div>
                        <div className="col-3 user-redux-input">
                            <label>
                                <FormattedMessage id="manage-user.last-name" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'lastName');
                                }}
                            />
                        </div>
                        <div className="col-9 user-redux-input">
                            <label>
                                <FormattedMessage id="manage-user.address" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'address');
                                }}
                            />
                        </div>
                        <div className="col-3 user-redux-input">
                            <label>
                                <FormattedMessage id="manage-user.phone-number" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={phoneNumber}
                                onChange={(event) => {
                                    this.onChangeInput(event, 'phoneNumber');
                                }}
                            />
                        </div>
                        <div className="col-3 user-redux-input">
                            <label>
                                <FormattedMessage id="manage-user.gender" />
                            </label>
                            <select
                                value={gender}
                                className="form-control"
                                onChange={(event) => {
                                    this.onChangeInput(event, 'gender');
                                }}
                            >
                                {genders &&
                                    genders.length > 0 &&
                                    genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
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
                            <select
                                value={position}
                                className="form-control"
                                onChange={(event) => {
                                    this.onChangeInput(event, 'position');
                                }}
                            >
                                {positions &&
                                    positions.length > 0 &&
                                    positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
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
                            <select
                                value={role}
                                className="form-control"
                                onChange={(event) => {
                                    this.onChangeInput(event, 'role');
                                }}
                            >
                                {roles &&
                                    roles.length > 0 &&
                                    roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
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

                        <div className="col-12 btn-save">
                            <button
                                className={
                                    this.state.action === CRUD_ACTION.EDIT ? 'btn btn-warning' : 'btn btn-primary'
                                }
                                onClick={() => this.handleSaveUser()}
                            >
                                {this.state.action === CRUD_ACTION.EDIT ? (
                                    <FormattedMessage id="manage-user.edit" />
                                ) : (
                                    <FormattedMessage id="manage-user.save" />
                                )}
                            </button>
                        </div>
                        <div className="col-12 mb-5">
                            <TableManageUser
                                handleEditUserFromParentKey={this.handleEditUserFromParent}
                                action={this.state.action}
                            />
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
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersRedux);
