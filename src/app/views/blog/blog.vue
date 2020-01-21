<template>
    <div class="blog">
        <v-toolbar class="blog-toolbar" height="55" color="info" dark>
            <div class="blog-toolbar-content">
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn flat icon @click="goBlog">
                        <v-icon style="font-size: 18px;">fas fa-home</v-icon>
                    </v-btn>

                    <v-btn flat class="blog-toolbar-item" v-if="!hasSignIn" @click="goLogin">登陆 </v-btn>
                    <v-btn flat class="blog-toolbar-item" v-if="!hasSignIn" @click="goRegister">注册 </v-btn>

                    <v-menu offset-y left light v-if="hasSignIn">
                        <v-btn slot="activator" flat icon>
                            <v-icon style="font-size: 18px;">fas fa-users-cog</v-icon>
                        </v-btn>
                        <v-list dense>
                            <template v-for="(item, i) in menu">
                                <v-list-tile :key="i" ripple v-if="!item.divider" @click="menuOperate(item.action)">
                                    <v-list-tile-action style="min-width: 32px;">
                                        <v-icon style="font-size: 16px;">{{ item.icon }}</v-icon>
                                    </v-list-tile-action>

                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-divider :key="i" v-if="item.divider"></v-divider>
                            </template>
                        </v-list>
                    </v-menu>
                </v-toolbar-items>
            </div>
        </v-toolbar>
        <div class="blog-content" id="blog_content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'blog',
    inject: ['IconMap'],
    data: function() {
        return {
            menu: [
                {title: '我的', icon: this.IconMap.user, action: 'goAuthorPage'},
                {divider: true},
                {title: '编辑', icon: this.IconMap.edit, action: 'goEdit'},
                {title: '管理文章', icon: this.IconMap.manage, action: 'test'},
                {title: '登出', icon: this.IconMap.logout, action: 'logout'}
            ]
        };
    },
    computed: {
        hasSignIn: function() {
            return this.$store.state.login;
        },
        username: function() {
            return this.$store.state.username;
        }
    },
    methods: {
        goBlog: function() {
            this.$router.push({name: 'blog'});
        },
        goEdit: function() {
            this.$router.push({name: 'edit', params: {userId: this.$store.state.userId, id: undefined}});
        },
        goLogin: function() {
            this.$router.push({name: 'login'});
        },
        goRegister: function() {
            this.$router.push({name: 'register'});
        },
        goAuthorPage: function() {
            this.$router.push({name: 'author', params: {userId: this.$store.state.userId}});
        },
        menuOperate: function(operation) {
            this[operation]();
        },
        logout: function() {
            this.$api.Auth.logout().then(data => {
                if (!data) return;
                this.$store.commit('signOut');

                window.location.reload();
            });
        },
        test: function() {}
    },
    watch: {
        username: function(value) {
            this.menu[0].title = value;
        }
    },
    created: function() {
        this.menu[0].title = this.username;
    }
};
</script>

<style lang="scss">
.blog {
    position: relative;
    width: 100%;
    height: 100%;
    /*overflow: hidden;*/
    &-toolbar {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
        &-content {
            position: relative;
            display: flex;
            height: 100%;
            width: 100%;
            max-width: $max-width;
            margin: auto !important;
            .v-btn__content {
                display: inline-block;
            }
        }
        &-item {
            min-width: 40px;
        }
    }
    &-content {
        position: relative;
        top: 55px;
        height: calc(100% - 55px);
        overflow-y: scroll;
        overflow-x: auto;
        margin-right: -5px;
    }
}
</style>
