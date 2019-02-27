<template>
    <div class="article-catalog">
        <template v-for="(item, i) in catalog.children">
            <catalog-item :item="item" :key="i" :index="i" :parent="catalog"></catalog-item>
        </template>
    </div>
</template>

<script>
    import CatalogItem from './article-catalog-item.vue';

    export default {
        name: 'article-catalog',
        components: {CatalogItem},
        props: ['catalog'],
        data: function () {
            return {
                top: 0
            };
        },
        methods: {
            onScroll: function (event) {
                this.top = event.target.scrollTop;
            }
        }
    };
</script>

<style lang="scss">
    .article-catalog {
        position: fixed;
        width: 190px;
        max-height: 80vh;
        overflow: auto;
        font-size: 14px;
        cursor: default;
    }
</style>