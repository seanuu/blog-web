<template>
    <v-app dark>
        <div class="register">
            <div class="register-title" @click="goBlog">博客</div>

            <v-form ref="form" class="register-form" v-model="valid" lazy-validation>
                <v-text-field
                    label="username"
                    :rules="usernameRules"
                    ref="password"
                    required
                    placeholder="用户名"
                    @input="checkUsername"
                    validate-on-blur
                    @keydown.enter="register"
                    v-model="user.username"
                ></v-text-field>

                <v-text-field
                    label="password"
                    :rules="passwordRules"
                    required
                    placeholder="密码"
                    type="password"
                    validate-on-blur
                    @keydown.enter="register"
                    v-model="user.password"
                ></v-text-field>

                <v-text-field
                    label="verification code"
                    :rules="verificationCodeRules"
                    required
                    placeholder="验证码"
                    validate-on-blur
                    @keydown.enter="register"
                    v-model="user.verificationCode"
                ></v-text-field>

                <v-btn class="register-form-button" block color="secondary" style="font-size: 12px" @click="register">Sign Up </v-btn>

                <a class="register-nav" @click="$router.push({name: 'login'})">already have an account.</a>
            </v-form>
        </div>
    </v-app>
</template>

<script>
export default {
    name: 'register',
    data: function() {
        return {
            valid: false,

            user: {
                username: '',
                password: '',
                verificationCode: ''
            },

            usernameStatus: false,

            usernameRules: [v => !!v || 'Username is required', v => !this.usernameStatus || 'Username already exist'],
            passwordRules: [v => !!v || 'Password is required'],
            verificationCodeRules: [v => !!v || 'VerificationCode is required']
        };
    },
    methods: {
        register: function() {
            if (this.$refs.form.validate()) {
                this.$api.Auth.register(this.user).then(data => {
                    if (data.register) {
                        this.$api.Auth.login(this.user).then(data => {
                            if (!data) {
                                this.$message({message: '登陆失败，请检查用户名密码是否输入正确'});
                                return;
                            }
                            this.$store.commit('signIn', {username: this.user.username, userId: data.userId});
                            this.goBlog();
                        });
                    }
                });
            }
        },
        goBlog: function() {
            this.$router.push({name: 'blog'});
        },
        checkUsername: function(username) {
            this.checkUsernameSubject.next(username);
        }
    },
    created: function() {
        this.checkUsernameSubject = new Utils.DebounceTime(500);
        this.checkUsernameSubject.subscribe(username => {
            this.$api.Auth.checkUsername(username).then(data => {
                this.usernameStatus = data;
            });
        });
    }
};
</script>

<style lang="scss">
.register {
    position: absolute;
    align-self: center;
    top: 12%;
    width: 200px;
    .v-input {
        font-size: 14px;
    }
    &-title {
        text-align: center;
        margin-bottom: 32px;
        cursor: pointer;
        color: hsla(0, 0%, 100%, 0.7);
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
        margin-top: 0.25rem;
        cursor: pointer;
        color: hsla(0, 0%, 100%, 0.7);
        font-size: 14px;
        &:hover {
            text-decoration: underline;
            color: white;
        }
    }
}
</style>
