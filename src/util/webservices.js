import axios from 'axios';

const instance = axios.create({
  baseURL: `http://132.145.58.252:8081/spaciofm/api/`,
  withCredentials: false,
});

instance.interceptors.request.use(
  async config => {
    let token = localStorage.getItem('spfmtoken');
    let provider = localStorage.getItem('provider');
    let tenantId = localStorage.getItem('tenantId');
    let userId = localStorage.getItem('userId');
    //console.log(token);
    //'JAGG66'

    config.headers = {
      'Authorization': `Bearer ${token}`,
      'provider': 'CRX',
      'tenantId' : 'INJREAM26606',
      'userId' : 'JAGG66'
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

export default instance;
