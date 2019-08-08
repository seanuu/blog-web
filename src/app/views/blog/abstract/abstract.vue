<template>
    <v-container class="abstract" v-scroll:#blog_content="handleScroll">
        <abstract-list :list="abstractList"></abstract-list>
    </v-container>
</template>

<script>
    import AbstractList from './abstract-list/abstract-list.vue';
    import {filter} from 'rxjs/operators';

    export default {
        name: 'abstract',
        components: {AbstractList},
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
    .abstract {
        max-width: $max-width;
    }
</style>
