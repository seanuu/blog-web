import './polyfills';
import './plugins';
import './styles.scss';

import Vue from 'vue';
import App from './App.vue';
import router from './app/router/router';
import store from './app/store/store';
import * as $api from './app/api';

Vue.prototype.$api = $api;
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
