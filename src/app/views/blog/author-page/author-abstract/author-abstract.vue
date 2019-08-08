<template>
    <div class="author-abstract" v-scroll:#blog_content="handleScroll">
        <template v-for="(item, i) in abstractList">
            <author-abstract-item :item="item" :key="i"></author-abstract-item>
        </template>
    </div>
</template>

<script>
    import AuthorAbstractItem from './author-abstract-item.vue';
    import {filter} from 'rxjs/operators';

    export default {
        name: 'author-abstract',
        components: {AuthorAbstractItem},
        data: function () {
            return {
                abstractList: [],
                pageNum: 1,
                debounceTime: new Utils.DebounceTime(),
                nomore: false
            };
        },
        methods: {
            queryAbstractList: function () {
                let params = {
                    pageNum: this.pageNum,
                    userId: this.$route.params.userId
                };

                this.$api.Article.queryAbstractList(params).then(data => {
                    if (!data.length > 0) {
                        this.nomore = true;
                    }
                    this.abstractList = this.abstractList.concat(data);
                });
            },
            handleScroll: function (event) {
                if (this.nomore) return;
                this.debounceTime.next(event);
            }
        },
        created: function () {
            this.queryAbstractList();
        },
        mounted: function () {
            this.debounceTime
                .pipe(filter((event) => {
                    return (event.target.clientHeight + event.target.scrollTop) > event.target.scrollHeight - 240;
                }))
                .subscribe(() => {
                    this.pageNum++;
                    this.queryAbstractList();
                });
        },
        destroyed: function () {
            this.debounceTime.unsubscribe();
        }
    };
</script>

<style lang="scss">
    .author-abstract {
        position: relative;
        width: 100%;
    }
</style>
