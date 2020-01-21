<template>
    <v-app>
        <router-view />
    </v-app>
</template>

<script>
import {IconMap} from './assets/icon-manage/icon-map';

export default {
    provide: {IconMap},
    data: function() {
        return {
            snackbar: false,
            timeout: 2000,
            message: ''
        };
    },
    created: function() {
        this.$api.Auth.checkStatus().then(data => {
            if (data.isLogin) {
                this.$store.commit('signIn', {username: data.username, userId: data.userId});
            }
        });
    }
};
</script>
