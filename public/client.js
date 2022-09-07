import axios from './axios.js';

axios.interceptors.request.use(config => {
  console.log('拦截咯~')
  return config;
}, error => {
  return Promise.error(error)
})


axios.request({  url: 'http://localhost:3000/user/info'}).then(res => {
  console.log(res);
})