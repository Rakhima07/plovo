import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://restcountries.com/v2',
});

export default axiosApi;
