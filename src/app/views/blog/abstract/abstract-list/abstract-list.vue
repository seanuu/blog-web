<template>
    <div class="abstract-list">
        <!--非移动端-->
        <v-timeline class="hidden-xs-only">
            <v-timeline-item class="abstract-list-item" v-for="(item, i) in list" :key="i"
                             :color="$color[parseInt(Math.random() * $color.length)]" large>
                <v-avatar class="abstract-list-item-avatar" slot="icon" @click="goAuthorPage(item.userId)">
                    <img :src="item.avatar">
                </v-avatar>
                <div slot="opposite">
                    <div>{{formatTime(item.createdAt)}}</div>
                    <div>{{item.author}}</div>
                </div>
                <v-hover>
                    <v-card class="abstract-list-item-card" slot-scope="{ hover }"
                            :class="`elevation-${hover ? 8 : 1}`"
                            @click="goArticlePage(item)">
                        <v-card-title class="title">
                            <span class="abstract-list-item-title">{{item.title}}</span>
                        </v-card-title>
                        <v-card-text class="hidden-xs-only">{{item.content}}</v-card-text>
                    </v-card>
                </v-hover>
            </v-timeline-item>
        </v-timeline>

        <!--移动端-->
        <v-timeline class="hidden-sm-and-up" align-top dense>
            <v-timeline-item color="red lighten-2" large v-for="(item, i) in list" :key="i">
                <v-avatar class="abstract-list-item-avatar" slot="icon" @click="goAuthorPage(item.userId)">
                    <img :src="item.avatar">
                </v-avatar>

                <v-layout pt-2 pb-1 @click="goArticlePage(item)">
                    <span class="pr-2">{{formatData(item.createdAt)}}</span>

                    <v-flex>
                        <strong>{{item.title}}</strong>
                        <div class="caption" style=" word-break:break-all;">
                            {{item.content}}
                        </div>
                    </v-flex>
                </v-layout>
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
                format: timeFormat('%Y.%m.%d %H:%M'),
                formatDate: timeFormat('%Y.%m.%d'),
            };
        },
        methods: {
            formatTime: function (time) {
                return this.format(isoParse(time));
            },
            formatData: function (time) {
                return this.formatDate(isoParse(time));
            },
            goArticlePage: function (item) {
                this.$router.push({name: 'article', params: {userId: item.userId}, query: {id: item._id}});
            },
            goAuthorPage: function (userId) {
                this.$router.push({name: 'author', params: {userId: userId}});
            },
        },
    };
</script>

<style lang="scss">
    .abstract-list {
        position: relative;
        .abstract-list-item {
            &-avatar {
                cursor: pointer;
            }
            &-card {
                cursor: default;
                .v-card__title {

                }
                .v-card__text {
                    padding-top: 0;
                }
            }
        }
    }
</style>
