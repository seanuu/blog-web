import Vue from 'vue';
import Common from './common';
import Vuetify from 'vuetify';
import './assets/vuetify.css';
import '@fortawesome/fontawesome-free/css/all.css';

Vue.use(Vuetify, {
    iconfont: 'fa',
    theme: {
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#1867c0',
        success: '#4CAF50',
        warning: '#FFC107'
    }
});

Vue.use(Common);
