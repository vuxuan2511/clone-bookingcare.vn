import React, { Component } from 'react';
import * as actions from '../../../store/actions';
// import { FormattedMessage } from 'react-intl';
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
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedDoctor: null,
            listDoctor: [],
            hasOldData: false,
        };
    }
    componentDidMount() {
        this.props.fetchAllDoctorsRedux();
    }

    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInput(this.props.allDoctors);
            this.setState({
                listDoctor: dataSelect,
            });
        }
        if (preProps.language !== this.props.language) {
            let dataSelect = this.buildDataInput(this.props.allDoctors);
            this.setState({
                listDoctor: dataSelect,
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

    buildDataInput = (inputData) => {
        let result = [];
        let language = this.props.language;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.lastName} ${item.firstName}`;
                return (
                    (object.label = language === LANGUAGES.VI ? labelVi : labelEn),
                    (object.value = item.id),
                    result.push(object)
                );
            });
        }
        return result;
    };

    render() {
        let { hasOldData } = this.state;
        return (
            <div className="container manage-doctor-container">
                <div className="manage-doctor-title ">
                    <h2>Manage Doctor</h2>
                </div>
                <div className="more-infor">
                    <div className="content-left form-group">
                        <label>Chọn Bác Sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctor}
                        />
                    </div>
                    <div className="content-right form-group">
                        <label>Thông tin giới thiệu:</label>
                        <textarea
                            className="form-control"
                            rows={4}
                            placeholder="Doctor information"
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <label>Mô tả thông tin chi tiết bác sĩ</label>
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
                    {hasOldData === true ? <>Lưu Thông Tin</> : <>Tạo Thông Tin</>}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctorRedux: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
