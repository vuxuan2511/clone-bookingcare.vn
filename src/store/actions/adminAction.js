import actionTypes from './actionTypes';
import {
    getAllcodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctorsService,
    saveDetailDoctorServicer,
    getAllSpecialties,
    getAllClinic,
} from '../../services/userService';
import { toast } from 'react-toastify';

//Gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            dispatch(fetchGenderFail());
            console.log('fetch Gender Fail: ', e);
        }
    };
};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL,
});

// Position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (e) {
            dispatch(fetchPositionFail());
            console.log('fetch Position Fail: ', e);
        }
    };
};
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL,
});

// Role

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (e) {
            dispatch(fetchRoleFail());
            console.log('fetch Role Fail:', e);
        }
    };
};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL,
});

//create user

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Create a new User succeed!');
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFail());
            }
        } catch (e) {
            dispatch(saveUserFail());
            console.log('create user fail:', e);
        }
    };
};
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL,
});

// EDIT USER
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success('Update the User succeed!');
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(editUserFail());
            }
        } catch (e) {
            dispatch(editUserFail());
            console.log('update user fail:', e);
        }
    };
};
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL,
});

// delete user
export const deleteAUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('Delete the User succeed!');
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUserFail());
            }
        } catch (e) {
            dispatch(deleteUserFail());
            console.log('Delete user fail:', e);
        }
    };
};
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL,
});

// Get all users
export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('All');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFail());
            }
        } catch (e) {
            dispatch(fetchAllUsersFail());
            console.log('fetch All Users Fail:', e);
        }
    };
};
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data,
});

export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL,
});

// let res1 = await getTopDoctorHomeService(3);
// console.log('check res1 adcscvdfg:', res1);

// fetch top doctor home
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
                });
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTOR_FAIL:', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
            });
        }
    };
};

// get all doctors
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService('');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_All_DOCTORS_SUCCESS,
                    doctorsData: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
                });
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAIL:', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAIL,
            });
        }
    };
};

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorServicer(data);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
                toast.success('Save the detail Doctor succeed!');
            } else {
                toast.error('Save error the detail Doctor succeed!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
                });
            }
        } catch (e) {
            toast.error('Save error the detail Doctor succeed!');
            console.log('SAVE_DETAIL_DOCTOR_FAIL:', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
            });
        }
    };
};

// fetch allcodes schedule hour
export const fetchAllScheduleTimes = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_AllCODES_SCHEDULE_TIMES_SUCCESS,
                    timeData: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODES_SCHEDULE_TIMES_FAIL,
                });
            }
        } catch (e) {
            console.log('FETCH_ALLCODES_SCHEDULE_TIMES_FAIL:', e);
            dispatch({
                type: actionTypes.FETCH_ALLCODES_SCHEDULE_TIMES_FAIL,
            });
        }
    };
};

// get Require Doctor Infor
export const getRequireDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_START });
            let resPrice = await getAllcodeService('PRICE');
            let resPayment = await getAllcodeService('PAYMENT');
            let resProvince = await getAllcodeService('PROVINCE');
            let resSpecialty = await getAllSpecialties();
            let resClinic = await getAllClinic();
            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0 &&
                resSpecialty &&
                resSpecialty.errCode === 0 &&
                resClinic &&
                resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                };
                dispatch(getRequireDoctorPriceSuccess(data));
            } else {
                dispatch(getRequireDoctorPriceSuccessFail());
            }
        } catch (e) {
            dispatch(getRequireDoctorPriceSuccessFail());
            console.log('get Require DoctorPrice Success Fail: ', e);
        }
    };
};
export const getRequireDoctorPriceSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_SUCCESS,
    data: allRequiredData,
});
export const getRequireDoctorPriceSuccessFail = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_FAIL,
});
