/** @format */

import axios from 'axios';

// Configuração padrão do Axios
axios.defaults.baseURL = "http://127.0.0.1:8000/api/api";

// Adiciona o token de autenticação se estiver presente no localStorage
const token = localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null;
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
  axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin";
  axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  axios.defaults.headers.common["allowedMethods"] = "*";
  axios.defaults.headers.common["Accept"] = "application/json";
}

// const app = createApp(App);

// Adiciona o Axios às propriedades globais da aplicação
// app.config.globalProperties.$http = axios;

// app.mount('#app');
