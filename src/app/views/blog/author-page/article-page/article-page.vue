<template>
    <div class="article-page">
        <div class="article-page-title">{{article.title}}</div>

        <div class="article-page-operators" v-if="$store.state.login && $store.state.userId === article.userId">
            <v-btn color="primary" small @click="goEdit">编辑</v-btn>
            <v-btn color="primary" dark small @click="deleteArticle">删除</v-btn>
        </div>

        <article-info :article="article"></article-info>

        <div class="article-page-article" v-html="article.content"></div>
    </div>
</template>

<script>
    import ArticleInfo from './article-info/article-info.vue';

    export default {
        name: 'article-page',
        components: {ArticleInfo},
        data: function () {
            return {
                article: {},
            };
        },
        methods: {
            goEdit: function () {
                this.$router.push({name: 'edit', query: {id: this.$route.query.id}});
            },
            deleteArticle: function () {
                this.$prompt.send({title: '警告', message: `确认删除 ${this.article.title}！`}).then(data => {
                    if (!data) return;

                    this.$api.Article.deleteArticle(this.article._id).then(data => {
                        if (!data) return;
                        this.$parent.updateCatalog();
                        this.$router.push({name: 'author', params: {userId: this.$store.state.userId}});
                    });
                });
            },
            queryArticle: function () {
                let id = this.$route.query.id || null;
                this.$api.Article.queryArticle(id).then(data => {
                    if (!data) {
                        this.$message({message: '文章不存在!'});
                        this.$router.push({name: 'blog'});
                        return;
                    }

                    this.article = data;
                    this.$nextTick(function () {
                        $('pre').addClass('line-numbers');
                        Prism.highlightAll();
                    });
                });
            }
        },
        watch: {
            $route: function () {
                this.queryArticle();
            }
        },
        created: function () {
            this.queryArticle();
        }
    };
</script>

<style lang="scss">
    .article-page {
        position: relative;
        width: 100%;
        &-title {
            word-break: break-all;
            font-size: 2rem;
            font-weight: 700;
            line-height: 1.3;
            max-width: 80%;
        }
        &-operators {
            position: absolute;
            right: 0;
            top: 0;
        }
        &-article {
            @import "~@public/prism/prism.css";
            font-size: 16px;
            line-height: 1.7;
            pre[class*="language-"] {
                @include box-shadow;
            }
            .toolbar-item {
                cursor: pointer;
                margin-left: 4px;
            }
            code, kbd {
                font-size: inherit;
                font-weight: inherit;
                box-shadow: none;
                background-color: inherit;
            }
        }
    }
</style>