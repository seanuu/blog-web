<template>
    <div class="abstract-list">
        <v-timeline>
            <v-timeline-item class="abstract-list-item" v-for="(item, i) in list" :key="i" color="red lighten-2" large>
                <v-avatar class="abstract-list-item-avatar" slot="icon" @click="goAuthorPage(item.userId)">
                    <img :src="item.avatar">
                </v-avatar>
                <div slot="opposite">
                    <div>{{formatTime(item.createdAt)}}</div>
                    <div>{{item.author}}</div>
                </div>
                <v-card class="elevation-2">
                    <v-card-title class="title" @click="goArticlePage(item)">
                        <span class="abstract-list-item-title">{{item.title}}</span>
                    </v-card-title>
                    <v-card-text>{{item.content}}</v-card-text>
                </v-card>
            </v-timeline-item>
        </v-timeline>
    </div>
</template>

<script>
    import {timeFormat, isoParse} from 'd3-time-format';

    export default {
        name: 'abstract-list',
        props: ['list'],
        data: function () {
            return {
                format: timeFormat('%Y.%m.%d %H:%M')
            };
        },
        methods: {
            formatTime: function (time) {
                return this.format(isoParse(time));
            },
            goArticlePage: function (item) {
                this.$router.push({name: 'article', params: {userId: item.userId}, query: {id: item._id}});
            },
            goAuthorPage: function (userId) {
                this.$router.push({name: 'author', params: {userId: userId}});
            },
        }
    };
</script>

<style lang="scss">
    .abstract-list {
        position: relative;

        .abstract-list-item {
            &-avatar {
                cursor: pointer;
            }

            &-title {
                cursor: pointer;
                outline: none;
                border-bottom: 1px solid transparent;
                &:hover {
                    border-bottom: 1px solid;
                }
            }
        }
    }
</style>