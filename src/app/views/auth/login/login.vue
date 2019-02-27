<template>
    <v-app dark>
        <div class="login">
            <div class="login-title" @click="goBlog">博客</div>

            <v-form ref="form" class="login-form" v-model="valid">
                <v-text-field label="username" :rules="usernameRules" required placeholder="用户名"
                              v-model="user.username" @keydown.enter="login"></v-text-field>

                <v-text-field label="password" :rules="passwordRules" required placeholder="密码" type="password"
                              v-model="user.password" @keydown.enter="login"></v-text-field>

                <v-btn class="login-form-button" block color="secondary" style="font-size: 12px"
                       @click="login">Sign In
                </v-btn>

                <a class="login-nav" @click="goRegister">create an account.</a>
            </v-form>
        </div>
    </v-app>
</template>

<script>
    export default {
        name: 'login',
        data: function () {
            return {
                valid: false,

                user: {
                    username: '',
                    password: ''
                },

                usernameRules: [
                    v => !!v || 'Username is required',
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                ],
            };
        },
        methods: {
            login: function () {
                if (this.$refs.form.validate()) {
                    this.$api.Auth.login(this.user).then(data => {
                        if (!data.login) {
                            this.$message({message: '登陆失败，请检查用户名密码是否输入正确'});
                            return;
                        }
                        this.$store.commit('signIn', {username: this.user.username, userId: data.userId});
                        this.goBlog();
                    });
                }
            },
            goBlog: function () {
                this.$router.push({name: 'blog'});
            },
            goRegister: function () {
                this.$router.push({name: 'register'});
            }
        }
    };
</script>

<style lang="scss">
    .login {
        position: absolute;
        align-self: center;
        top: 15%;
        width: 200px;
        .v-input {
            font-size: 14px;
        }
        &-title {
            text-align: center;
            margin-bottom: 32px;
            cursor: pointer;
            color: hsla(0, 0%, 100%, .7);
            font-size: 17px;
            &:hover {
                color: white;
            }
        }
        &-form {
            & > * {
                margin: 0;
                margin-top: 12px;
                padding-top: 0;
            }
        }
        &-nav {
            display: block;
            text-align: right;
            margin-top: .25rem;
            cursor: pointer;
            color: hsla(0, 0%, 100%, .7);
            font-size: 14px;
            &:hover {
                text-decoration: underline;
                color: white;
            }
        }
    }
</style>