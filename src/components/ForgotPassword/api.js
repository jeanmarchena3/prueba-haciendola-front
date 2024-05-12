import AXIOS from '../../config/api';

export const verifyUsernameEmail = data => AXIOS.post('/users/verify-username-email', data);

export const changePasswordForgot = data => AXIOS.put('/users/forgot_password', data);

