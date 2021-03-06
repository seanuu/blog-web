<template>
    <div class="content-edit" ref="container" v-scroll:#blog_content="onScroll">
        <v-form class="content-edit-form" ref="form">
            <v-text-field label="文章标题" v-model="article.title"></v-text-field>

            <v-combobox
                class="content-edit-form-classify"
                dense
                item-text="_id"
                item-value="_id"
                label="文章分类"
                v-model="article.classification"
                :items="classificationOptions"
            ></v-combobox>
        </v-form>

        <textarea ref="editor"></textarea>

        <v-btn class="content-edit-commit" color="primary" small @click="save">提交</v-btn>

        <v-switch color="orange darken-3" inset class="ml-3" v-model="article.private" value="1" label="私密"></v-switch>
    </div>
</template>

<script>
import TinymceConfig from './tinymce.config';
import '@public/tinymce/tinymce.min';

export default {
    name: 'content-edit',
    data: function() {
        return {
            valid: false,

            article: {
                title: '',
                classification: '',
                content: '',
                private: '1'
            },

            headOffsetTop: null,

            classificationOptions: []
        };
    },
    methods: {
        save: function() {
            this.article.content = this.editor.getContent();
            this.article.userId = this.$store.state.userId;
            this.article.private = this.article.private || '0';

            this.$api.Article.saveArticle(this.article).then(data => {
                if (data.id) {
                    this.$router.push({name: 'article', query: {id: data.id || ''}});
                    this.$parent.updateCatalog();
                }
            });
        },
        queryArticle: function() {
            let id = this.$route.query.id || null;
            if (!id) {
                this.clearAll();
                return;
            }

            this.$api.Article.queryArticle(id).then(data => {
                if (!data) return;
                if (data.userId !== this.$store.state.userId) {
                    this.$router.push({name: 'blog'});
                }
                data.private = data.private === undefined ? '0' : data.private;

                this.article = data;
                setTimeout(() => {
                    this.editor.setContent(data.content);
                });
            });
        },
        initEditor: function() {
            return new Promise(resolve => {
                const config = Object.assign(TinymceConfig, {
                    target: this.$refs.editor,
                    setup: editor => {
                        this.editor = editor;
                    }
                });
                tinymce.init(config);

                resolve();
            });
        },
        clearAll: function() {
            this.article.title = '';
            this.article.classification = '';
            this.article.content = '';
            this.editor.setContent(this.article.content);
        },
        queryClassification: function() {
            this.$api.Article.queryClassification().then(data => {
                this.classificationOptions = data;
            });
        },
        onScroll: function(event) {
            let head = $('.mce-top-part')[0];
            let target = event.target;
            if (!this.headOffsetTop) {
                this.headOffsetTop = this.edgeTop(head, target);
            }

            if (event.target.scrollTop > this.headOffsetTop) {
                $(head)
                    .css('position', 'relative')
                    .css('top', `${event.target.scrollTop - this.headOffsetTop}px`);
            } else {
                $(head)
                    .css('position', 'relative')
                    .css('top', '0px');
            }
        },
        edgeTop: function(el, target) {
            let offsetTop = el.offsetTop;
            let offsetParent = el.offsetParent;
            while (offsetParent && offsetParent !== target) {
                offsetTop += offsetParent.offsetTop;
                offsetParent = offsetParent.offsetParent;
            }
            return offsetTop;
        }
    },
    watch: {
        $route: function() {
            this.queryArticle();
        }
    },
    created: function() {
        this.queryClassification();
    },
    mounted: function() {
        this.initEditor().then(() => {
            this.queryArticle();
        });
    }
};
</script>

<style lang="scss">
.content-edit {
    position: relative;
    width: 100%;
    &-form {
        display: flex;
        &-classify {
            width: 240px;
            @media screen and (max-width: 600px) {
                width: 50%;
            }
            margin-left: 8px;
            flex: none;
        }
        .v-input__slot {
            margin-bottom: 4px;
        }
        .v-text-field__details {
            height: 16px;
        }
    }
    &-commit {
        margin: 0;
        margin-top: 12px;
        float: right;
    }
    .mce-panel {
        border: none;
    }
    .mce-top-part {
        background: white;
    }
}
</style>
