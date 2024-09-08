import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { VueMaskPlugin } from 'v-mask';
import Multiselect from 'vue-multiselect';
import VueSweetalert2 from "vue-sweetalert2";
import BootstrapVue3 from 'bootstrap-vue-3';

// import "./api/axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/api";

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

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  // Import Bootstrap JS
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import "sweetalert2/dist/sweetalert2.min.css";

import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {faPaw} from "@fortawesome/free-solid-svg-icons";
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import {faUserDoctor} from "@fortawesome/free-solid-svg-icons";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {faCircleChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-solid-svg-icons";

library.add(faUsers);
library.add(faPaw);
library.add(faCalendarDays);
library.add(faUserDoctor);
library.add(faRightFromBracket);
library.add(faPlus);
library.add(faCircleChevronLeft);
library.add(faTrash);
library.add(faPenToSquare);
library.add(faChevronRight);
library.add(faUser);

import LoginComponent from './pages/login/LoginComponent';
import DashboardComponent from './pages/dashboard/DashboardComponent';

import UserIndexComponent from './pages/users/IndexComponent';
import UserCreateComponent from './pages/users/CreateComponent';
import ProfileComponent from './pages/users/ProfileComponent';

import ClientIndexComponent from './pages/clients/IndexComponent';
import ClientCreateComponent from './pages/clients/CreateComponent';

import AnimalIndexComponent from './pages/animals/IndexComponent';
import AnimalCreateComponent from './pages/animals/CreateComponent';

import ReceptionistIndexComponent from './pages/receptionists/IndexComponent';
import ReceptionistCreateComponent from './pages/receptionists/CreateComponent';

import DoctorIndexComponent from './pages/doctors/IndexComponent';
import DoctorCreateComponent from './pages/doctors/CreateComponent';

import AgendaComponent from './pages/agenda/AgendaComponent';
import AgendaCreateComponent from './pages/agenda/CreateComponent';


// Define routes
const routes = [
  { path: '/', name: 'login', component: LoginComponent },
  { path: '/dashboard', name: 'dashboard', component: DashboardComponent },

  { path: '/users', name: 'users-index', component: UserIndexComponent },
  { path: '/users/register', name: 'users-register', component: UserCreateComponent },
  { path: '/profile', name: 'profile', component: ProfileComponent },

  { path: '/clients', name: 'clients-index', component: ClientIndexComponent },
  { path: '/clients/register', name: 'clients-register', component: ClientCreateComponent },

  { path: '/animals', name: 'animals-index', component: AnimalIndexComponent },
  { path: '/animals/register', name: 'animals-register', component: AnimalCreateComponent },

  { path: '/receptionists', name: 'receptionists-index', component: ReceptionistIndexComponent },
  { path: '/receptionists/register', name: 'receptionists-register', component: ReceptionistCreateComponent },

  { path: '/doctors', name: 'doctors-index', component: DoctorIndexComponent },
  { path: '/doctors/register', name: 'doctors-register', component: DoctorCreateComponent },

  { path: '/agenda', name: 'agenda-index', component: AgendaComponent },
  { path: '/agenda/register', name: 'agenda-register', component: AgendaCreateComponent },

];

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

// Create Vue app and mount it
const app = createApp(App)
            .use(router)
            .use(BootstrapVue3)
            // .use(VueMaskPlugin)
            .component('Multiselect', Multiselect)
            .use(VueSweetalert2)

            .component("font-awesome-icon", FontAwesomeIcon);
app.config.globalProperties.$http = axios;

app.mount('#app');
