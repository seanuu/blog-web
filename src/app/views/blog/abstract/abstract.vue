<template>
    <v-container class="abstract">
        <abstract-list :list="abstractList"></abstract-list>
    </v-container>
</template>

<script>
    import AbstractList from './abstract-list/abstract-list.vue';

    export default {
        name: 'abstract',
        components: {AbstractList},
        data: function () {
            return {
                abstractList: []
            };
        },
        methods: {
            queryAbstractList: function () {
                let params = {
                    pageNum: 1,
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
    .abstract {
        max-width: $max-width;
    }
</style>