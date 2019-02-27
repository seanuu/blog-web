<template>
    <div class="author-abstract">
        <template v-for="(item, i) in abstractList">
            <author-abstract-item :item="item" :key="i"></author-abstract-item>
        </template>
    </div>
</template>

<script>
    import AuthorAbstractItem from './author-abstract-item.vue';

    export default {
        name: 'author-abstract',
        components: {AuthorAbstractItem},
        data: function () {
            return {
                abstractList: []
            };
        },
        methods: {
            queryAbstractList: function () {
                let params = {
                    pageNum: 1,
                    userId: this.$route.params.userId
                };

                this.$api.Article.queryAbstractList(params).then(data => {
                    if (!data.length > 0) {
                        this.$router.push({name: 'blog'});
                    }
                    this.abstractList = data;
                });
            }
        },
        created: function () {
            this.queryAbstractList();
        }
    };
</script>

<style lang="scss">
    .author-abstract {
        position: relative;
        width: 100%;
    }
</style>