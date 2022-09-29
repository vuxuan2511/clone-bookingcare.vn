import actionTypes from '../actions/actionTypes';
const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTimes: [],
    allRequiredDoctorInfor: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        //gender
        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;

            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            };

        //position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            };

        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = [];
            return {
                ...state,
            };

        // roles

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;

            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            return {
                ...state,
            };
        //get all user
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USER_FAIL:
            state.users = [];
            return {
                ...state,
            };

        // fetch top doctor
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            state.topDoctors = [];
            return {
                ...state,
            };

        // FETCH_ALL_DOCTORS
        case actionTypes.FETCH_All_DOCTORS_SUCCESS:
            state.allDoctors = action.doctorsData;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTORS_FAIL:
            state.allDoctors = [];
            return {
                ...state,
            };
        //
        case actionTypes.FETCH_AllCODES_SCHEDULE_TIMES_SUCCESS:
            state.allScheduleTimes = action.timeData;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALLCODES_SCHEDULE_TIMES_FAIL:
            state.allScheduleTimes = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_FAIL:
            state.allRequiredDoctorInfor = [];
            return {
                ...state,
            };

        default:
            return state;
    }
};

export default adminReducer;
