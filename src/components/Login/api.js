import AXIOS from '../../config/api';

export const login = data => AXIOS.post('/users', data);

