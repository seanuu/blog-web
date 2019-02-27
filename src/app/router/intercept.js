import store from '../store/store';
import * as  $api from '../api';

const actions = {
    needLogin: function (to, from, next) {
        if (from.matched.length === 0) {
            $api.Auth.checkStatus().then(data => {
                if (data.isLogin) {
                    next();
                } else {
                    next({name: 'blog'});
                }
            });
        }
        else if (store.state.login) {
            next();
        }
        else {
            next({name: 'blog'});
        }
    },
    needUnLogin: function (to, from, next) {
        if (from.matched.length === 0) {
            $api.Auth.checkStatus().then(data => {
                if (data.isLogin) {
                    next({name: 'blog'});
                } else {
                    next();
                }
            }).catch(() => {
                next({name: 'blog'});
            });
        }
        else if (!store.state.login) {
            next();
        }
        else {
            next({name: 'blog'});
        }

    }
};


export default function (Router) {
    Router.beforeEach((to, from, next) => {
        if (to.meta.action && actions[to.meta.action]) {
            actions[to.meta.action](to, from, next);
        } else {
            next();
        }

        if (to.meta.title) {
            document.title = to.meta.title;
        }
    });
}
