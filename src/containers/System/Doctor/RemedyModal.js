import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import { toast } from 'react-toastify';
// import { LANGUAGES } from '../../../utils';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

import './ManageSchedule.scss';
import { CommonUtils } from '../../../utils';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: '',
        };
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }
    componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {
        }
        if (preProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }
    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
    };
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };
    handleSendRemedy = () => {
        this.props.closeRemedyModal();
        this.props.sendRemedy({
            email: this.state.email,
            imageBase64: this.state.imageBase64,
        });
    };

    render() {
        let { isOpenModal, closeRemedyModal } = this.props;
        return (
            <Modal isOpen={isOpenModal} className="booking-modal-content" size="md" centered>
                <div className="modal-header">
                    <h5> Gửi hóa đơn khám bệnh thành công</h5>
                    <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                        <span aria-hidden="true">x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className="row">
                        <div className="col-6 form-group">
                            <label>Email bệnh nhân</label>
                            <input
                                type="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={(event) => this.handleOnchangeEmail(event)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Chọn đơn thuốc</label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>
                        Send
                    </Button>
                    <Button color="secondary" onClick={closeRemedyModal}>
                        Cancle
                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
