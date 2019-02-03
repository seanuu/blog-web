export const Article = {
    // 保存
    saveArticle: function (article) {
        let url = '/article/save';
        let body = Object.assign(article, {
            title: article.title || '未命名文章',
            classification: article.classification || '未分类',
            content: article.content || ''
        });
        return Axios.post(url, body).then(response => {
            return response.data;
        });
    },

    // 删除文章
    deleteArticle: function (id) {
        let url = '/article/delete';
        return Axios.post(url, {
            articleId: id,
        }).then(response => {
            return response.data.delete;
        });
    },

    // 查询文章内容
    queryArticle: function (id) {
        let url = '/article/queryArticle';
        return Axios.post(url, {
            id: id
        }).then(response => {
            return response.data;
        });
    },

    // 查询文章目录
    queryArticleCatalog: function (userId) {
        let url = '/article/queryArticleCatalog';
        return Axios.post(url, {
            userId: userId
        }).then(response => {
            return response.data;
        });
    },

    // 查询分类信息
    queryClassification: function () {
        let url = '/article/queryClassification';
        return Axios.post(url).then(response => {
            return response.data;
        });
    },

    // 查询列表
    queryAbstractList: function (params) {
        let url = '/article/queryAbstractList';
        return Axios.post(url, {
            pageNum: params.pageNum || 1,
            pageSize: params.pageSize || 20,
            userId: params.userId || null
        }).then(response => {
            return response.data;
        });
    },

};