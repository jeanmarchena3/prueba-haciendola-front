import AXIOS from '../../config/api';

export const changePassword = ({ token, data }) => AXIOS.put('/users/update_password', data, { headers: { Authorization: `Bearer ${token}` } });
