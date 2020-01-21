<template>
    <div class="author-page pt-4 pb-4">
        <div class="author-page-catalog hidden-sm-and-down" v-if="catalog.children && catalog.children.length > 0">
            <article-catalog :catalog="catalog"></article-catalog>
        </div>

        <div class="author-page-content pb-5">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import {ArticleCatalog} from '../_common';

export default {
    name: 'author-page',
    components: {ArticleCatalog},
    data: function() {
        return {
            catalog: {
                children: []
            }
        };
    },
    methods: {
        updateCatalog: function() {
            let userId = this.$route.params.userId;
            this.$api.Article.queryArticleCatalog(userId).then(data => {
                this.catalog.children = data;

                this.catalog.children.forEach(item => {
                    item.classify = true;
                });

                Utils.sort(this.catalog, (a, b) => (a._id.localeCompare ? a._id.localeCompare(b._id) : a - b));
            });
        }
    },
    created: function() {
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
    padding: 0 1rem;

    &-catalog {
        position: relative;
        width: 240px;
        min-width: 240px;
    }

    &-content {
        position: relative;
        flex: 1;
        overflow: hidden;
    }
}
</style>
