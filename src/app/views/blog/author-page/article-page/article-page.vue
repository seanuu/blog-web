<template>
    <div class="page-wrap">
        <div class="article-page">
            <v-fab-transition>
                <v-btn v-if="$store.state.login && $store.state.userId === article.userId" v-show="!hidden"
                       class="hidden-sm-and-up" color="primary" fab small fixed right
                       @click="goEdit">
                    <v-icon>fas fa-pen-nib</v-icon>
                </v-btn>
            </v-fab-transition>

            <div class="article-page-title">{{article.title}}</div>
            <div class="article-page-operators" v-if="$store.state.login && $store.state.userId === article.userId">
                <v-btn class="hidden-xs-only" color="primary" small @click="goEdit">编辑</v-btn>
                <v-btn class="hidden-xs-only" color="primary" dark small @click="deleteArticle">删除</v-btn>
            </div>
            <article-info :article="article"></article-info>
            <div class="article-page-article" v-html="article.content" ref="content"></div>
        </div>

        <div class="article-page-nav hidden-md-and-down">
            <v-timeline align-top dense class="page-nav" v-if="articleNav && articleNav.length > 0">
                <v-timeline-item color="teal lighten-3" hide-dot small v-for="(item, i) in articleNav" :key="i">
                    <div class="page-nav-item" @click="setScrollTop(item)"
                         :style="{'text-indent': `${(item.level - 1) * 12}px`}">{{item.text}}
                    </div>
                </v-timeline-item>
            </v-timeline>
        </div>
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
            top: 0,
            articleNav: [],
        };
    },
    computed: {
        hidden: function () {
            return this.top > 200;
        }
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

                document.title = data.title;

                this.article = data;
                this.$nextTick(function () {
                    $('pre').addClass('line-numbers');
                    Prism.highlightAll();

                    this.setArticleNav();
                });
            });
        },
        setArticleNav: function () {
            let children = $(this.$refs.content).children('h1, h2, h3, h4, h5, h6');
            let content = document.getElementById('blog_content');
            this.articleNav = [];
            children.each((index, element) => {
                let tagLevel = (/(?<=h)[0-9]/i.exec(element.tagName)) || [];
                this.articleNav.push({text: $(element).text(), offsetTop: 0, level: tagLevel[0], el: element});
            });

            setTimeout(() => {
                this.articleNav.forEach(item => {
                    item.offsetTop = this.edgeTop(item.el, content);
                });
            }, 500);
        },
        setScrollTop: function (item) {
            let content = $('#blog_content');
            content.animate({scrollTop: `${item.offsetTop}px`});
        },
        onScroll: function (event) {
            this.top = event.target.scrollTop;
        },
        edgeTop(el, bounding) {
            let offsetTop = el.offsetTop;
            let offsetParent = el.offsetParent;
            while (offsetParent && (offsetParent !== bounding)) {
                offsetTop += offsetParent.offsetTop;
                offsetParent = offsetParent.offsetParent;
            }
            return offsetTop;
        },
    },
    watch: {
        $route: function () {
            this.queryArticle();
        }
    },
    created: function () {
        this.queryArticle();
    },
};
</script>

<style lang="scss">
.page-wrap {
    position: relative;
    width: 100%;
    display: flex;
}

.article-page-nav {
    position: relative;
    width: 240px;
    min-width: 240px;
    .page-nav {
        position: fixed;
        width: 190px;
        max-height: 80vh;
        margin-left: 30px;
        overflow: visible;
        font-size: 14px;
        cursor: default;
        &-item {
            white-space: nowrap;
            overflow: visible;
            &:hover {
                color: $color-primary;
            }
        }
    }
    .v-timeline {
        padding-top: 0;
    }
    .v-timeline-item {
        padding-bottom: 8px;
    }
    .v-timeline--dense .v-timeline-item__body {
        max-width: calc(100% - 40px);
    }
}

.article-page {
    position: relative;
    flex: 1;
    overflow: hidden;
    /*max-width: calc(100% - 240px);*/
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
        & * {
            max-width: 100%;
        }
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
