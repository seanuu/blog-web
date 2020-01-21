export const Auth = {
    // 登陆
    login: function(user) {
        let url = '/user/login';
        return Axios.post(url, {
            username: user.username,
            password: user.password
        }).then(response => {
            return response.data;
        });
    },
    // 登出
    logout: function() {
        let url = '/user/logout';
        return Axios.post(url).then(response => {
            return response.data.logout;
        });
    },
    // 注册
    register: function(user) {
        let url = '/user/register';
        return Axios.post(url, {
            username: user.username,
            password: user.password,
            verificationCode: user.verificationCode
        }).then(response => {
            return response.data;
        });
    },
    // 检查用户名是否存在
    checkUsername: function(username) {
        let url = '/user/checkUsername';
        return Axios.post(url, {
            username: username
        }).then(response => {
            return response.data.exist;
        });
    },
    // 检查登陆状态
    checkStatus: function() {
        let url = '/user/checkStatus';
        return Axios.post(url).then(response => {
            return response.data;
        });
    }
};
