import Vue from 'vue';
import Router from 'vue-router';
import ViewRoute from '../views/view.route';
import Intercept from './intercept';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: ViewRoute
});

Intercept(router);

export default router;
