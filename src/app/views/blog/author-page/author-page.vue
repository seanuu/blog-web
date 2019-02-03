<template>
    <div class="author-page mt-4 mb-4">
        <div class="author-page-catalog hidden-sm-and-down" v-if="catalog.children && catalog.children.length > 0">
            <article-catalog :catalog="catalog"></article-catalog>
        </div>

        <div class="author-page-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import {ArticleCatalog} from '../_common';

    export default {
        name: 'author-page',
        components: {ArticleCatalog},
        data: function () {
            return {
                catalog: {
                    children: []
                }
            };
        },
        methods: {
            updateCatalog: function () {
                let userId = this.$route.params.userId;
                this.$api.Article.queryArticleCatalog(userId).then(data => {
                    this.catalog.children = data;
                    this.catalog.children.forEach(item => {
                        item.classify = true;
                    });
                });
            }
        },
        created: function () {
            this.updateCatalog();
        }
    };
</script>

<style lang="scss">
    .author-page {
        display: flex;
        position: relative;
        width: 100%;
        max-width: $max-width;
        margin: auto;
        &-catalog {
            position: relative;
            width: 240px;
            padding-left: 1rem;
        }
        &-content {
            flex: 1;
            padding: 0 1rem;
        }
    }
</style>