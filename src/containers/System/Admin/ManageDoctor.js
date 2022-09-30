import React, { Component } from 'react';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

import './ManageDoctor.scss';
import { CRUD_ACTION, LANGUAGES } from '../../../utils';
import { getDetailInforDoctor } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown-table
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedDoctor: null,
            listDoctor: [],

            hasOldData: false,
            //save to infor-doctor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.getAllRequireDoctorInfor();
    }

    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInput(this.props.allDoctors, 'USERS');
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (preProps.language !== this.props.language) {
            let dataSelect = this.buildDataInput(this.props.allDoctors, 'USERS');
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInput(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInput(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInput(resProvince, 'PROVINCE');
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }
        if (preProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInput(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInput(resPayment, 'PAYMENT');
            let dataSelectProvince = this.buildDataInput(resProvince, 'PROVINCE');
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctorRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        });
    };

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let { listPayment, listPrice, listProvince } = this.state;
        let selectedPayment = '',
            selectedPrice = '',
            selectedProvince = '';
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;

            let addressClinic = '',
                nameClinic = '',
                note = '',
                paymentId = '',
                priceId = '',
                provinceId = '';
            if (res.data.Doctor_Infor) {
                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;

                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                selectedPayment = listPayment.find((item) => {
                    return item && item.value === paymentId;
                });
                selectedPrice = listPrice.find((item) => {
                    return item && item.value === priceId;
                });
                selectedProvince = listProvince.find((item) => {
                    return item && item.value === provinceId;
                });
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                note: note,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                selectedPrice: '',
                selectedPayment: '',
                selectedProvince: '',
                nameClinic: '',
                addressClinic: '',
                note: '',
            });
        }
    };
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({
            ...stateCopy,
        });
    };

    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    buildDataInput = (inputData, type) => {
        let result = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.firstName} ${item.lastName}`;
                    let labelEn = `${item.lastName} ${item.firstName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    return result.push(object);
                });
            }
            if (type === 'PRICE' || type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVI} `;
                    let labelEn = `${item.valueEN} `;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    return result.push(object);
                });
            }
        }
        return result;
    };
    render() {
        let { hasOldData } = this.state;
        return (
            <div className="container manage-doctor-container">
                <div className="manage-doctor-title ">
                    <h2>
                        <FormattedMessage id="admin.doctor-manage.title" />
                    </h2>
                </div>
                <div className="more-infor">
                    <div className="content-left form-group">
                        <label>
                            <FormattedMessage id="admin.doctor-manage.choose-doctor" />
                        </label>
                        <Select
                            placeholder={<FormattedMessage id="admin.doctor-manage.choose-doctor" />}
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                        />
                    </div>
                    <div className="content-right form-group">
                        <label>
                            <FormattedMessage id="admin.doctor-manage.infor-introduce" />
                        </label>
                        <textarea
                            className="form-control"
                            rows={4}
                            placeholder="Doctor information"
                            onChange={(event) => this.handleOnChangeText(event, 'description')}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="more-infor-extra-doctor row">
                    <div className="input-select col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.doctor-manage.price" />
                        </label>
                        <Select
                            placeholder={<FormattedMessage id="admin.doctor-manage.price" />}
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            name="selectedPrice"
                        />
                    </div>

                    <div className="input-select col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.doctor-manage.payment" />
                        </label>
                        <Select
                            placeholder={<FormattedMessage id="admin.doctor-manage.payment" />}
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            name="selectedPayment"
                        />
                    </div>
                    <div className="input-select col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.doctor-manage.province" />
                        </label>
                        <Select
                            placeholder={<FormattedMessage id="admin.doctor-manage.province" />}
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            name="selectedProvince"
                        />
                    </div>
                    <div className="input-select col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.doctor-manage.clinic-name" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className="input-select col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.doctor-manage.address" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className="input-select col-4 form-group">
                        <label>
                            <FormattedMessage id="admin.doctor-manage.note" />
                        </label>
                        <input
                            className="form-control"
                            onChange={(event) => this.handleOnChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>
                <div className="manage-doctor-editor mt-3">
                    <label>
                        <FormattedMessage id="admin.doctor-manage.detail-infor-doctor" />
                    </label>
                    <MdEditor
                        style={{ height: '400px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={
                        hasOldData === true
                            ? 'btn-save-content-doctor btn btn-warning'
                            : 'btn-create-content-doctor btn btn-primary'
                    }
                >
                    {hasOldData === true ? (
                        <>
                            <FormattedMessage id="admin.doctor-manage.create-infor" />
                        </>
                    ) : (
                        <>
                            <FormattedMessage id="admin.doctor-manage.save-infor" />
                        </>
                    )}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
        getAllRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
