import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import * as actions from '../../../store/actions';
// import Select from 'react-select';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import { createNewSpecialty } from '../../../services/userService';

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        };
    }
    componentDidMount() {}
    componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleSaveSpecialty = async () => {
        let res = await createNewSpecialty({
            name: this.state.name,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
        });
        if (res && res.errCode === 0) {
            toast.success('add new specialty succsess!');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            });
        } else {
            toast.error('Something wrong, plz try again ');
        }
    };

    render() {
        return (
            <div className="manage-specialty-container container">
                <div className="manage-specialty-title">Quản Lý Chuyên Khoa</div>
                <div className="form-input-manage-specialty">
                    <div className="col-6 form-group">
                        <label>Tên Chuyên Khoa</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.name}
                            onChange={(event) => this.handleOnchangeInput(event, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group ">
                        <label>Chọn Ảnh Chuên Khoa</label>
                        <input
                            type="file"
                            className="form-control-file"
                            onChange={(event) => this.handleOnchangeImage(event)}
                        />
                    </div>
                </div>
                <MdEditor
                    style={{ height: '300px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.descriptionMarkdown}
                />
                <div className="col-12">
                    <button className="btn-save-specialty" onClick={() => this.handleSaveSpecialty()}>
                        Lưu
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
