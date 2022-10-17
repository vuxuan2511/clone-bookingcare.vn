import axios from '../axios';

//

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
};

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

//
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
};

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId,
        },
    });
};
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
};
const getAllcodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`);
};

const saveDetailDoctorServicer = (data) => {
    return axios.post('/api/save-infor-doctor', data);
};

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-dcotor-by-date?doctorId=${doctorId}&date=${date}`);
};

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientbookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data);
};
const postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data);
};
const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data);
};
const getAllSpecialties = () => {
    return axios.get(`/api/get-all-specialties`);
};

const getDeatilSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};
const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data);
};
const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`);
};
const getDeatilClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};
//
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllcodeService,
    getTopDoctorHomeService,
    getAllDoctorsService,
    saveDetailDoctorServicer,
    getDetailInforDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    postPatientbookAppointment,
    postVerifyBookAppointment,
    createNewSpecialty,
    getAllSpecialties,
    getDeatilSpecialtyById,
    createNewClinic,
    getAllClinic,
    getDeatilClinicById,
};
