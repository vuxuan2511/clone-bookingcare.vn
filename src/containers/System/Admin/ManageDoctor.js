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
            selectedPrive: '',
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
            let dataSelectPrice = this.buildDataInput(resPrice);
            let dataSelectPayment = this.buildDataInput(resPayment);
            let dataSelectProvince = this.buildDataInput(resProvince);
            this.setState({
                listDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }
        if (preProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            let dataSelectPrice = this.buildDataInput(resPrice);
            let dataSelectPayment = this.buildDataInput(resPayment);
            let dataSelectProvince = this.buildDataInput(resProvince);
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
        });
    };

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            });
        }
    };

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value,
        });
    };

    buildDataInput = (inputData, type) => {
        let result = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueVI;
                let labelEn = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueEN;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                return result.push(object);
            });
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
                            placeholder={'Chọn bác sĩ...'}
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
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="more-infor-extra-doctor row">
                    <div className="input-select col-4 form-group">
                        <label>Chọn Giá</label>
                        <Select
                            placeholder={'Chọn giá...'}
                            // value={this.state.selectedDoctor}
                            //  onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                        />
                    </div>

                    <div className="input-select col-4 form-group">
                        <label>Chọn Phương Thức Thanh Toán</label>
                        <Select
                            placeholder={'Chọn phương thức thanh toán...'}
                            // value={this.state.selectedDoctor}
                            //  onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                        />
                    </div>
                    <div className="input-select col-4 form-group">
                        <label>Chọn Tỉnh Thành</label>
                        <Select
                            placeholder={'Chọn tỉnh thành...'}
                            // value={this.state.selectedDoctor}
                            //  onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                        />
                    </div>
                    <div className="input-select col-4 form-group">
                        <label>Tên Phòng Khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="input-select col-4 form-group">
                        <label>Địa Chỉ Phòng Khám</label>
                        <input className="form-control" />
                    </div>
                    <div className="input-select col-4 form-group">
                        <label>Note</label>
                        <input className="form-control" />
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
