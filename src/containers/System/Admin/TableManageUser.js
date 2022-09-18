import React, { Component } from 'react';
import * as actions from '../../../store/actions';

// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: [],
        };
    }
    componentDidMount() {
        this.props.fetchUserRedux();
    }
    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers,
            });
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id);
    };
    handleEditaUser = (user) => {
        this.props.handleEditUserFromParentKey(user);
    };
    render() {
        let arrUsers = this.state.userRedux;
        return (
            <div className="table-manage-user-redux mt-4 mx-4">
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Addres</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers &&
                            arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td> {item.firstName}</td>
                                        <td> {item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit " onClick={() => this.handleEditaUser(item)}>
                                                <i className="far fa-edit"></i>
                                            </button>
                                            <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                                                <i className="far fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
