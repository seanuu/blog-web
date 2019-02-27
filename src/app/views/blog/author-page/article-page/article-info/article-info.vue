<template>
    <div class="article-info">
        <!--<div class="article-info-avatar" :style="{'background-image': `url(${article.avatar})`}"></div>-->
        <v-avatar size="52" style="cursor: pointer" @click="goAuthorPage(article.userId)">
            <img :src="article.avatar">
        </v-avatar>

        <div class="article-info-detail">
            <div class="info-name" @click="goAuthorPage(article.userId)">{{article.author}}</div>
            <div class="info-detail">
                <v-tooltip right>
                    <span slot="activator" class="info-detail-date">{{createTime}}</span>
                    <span>最后编辑于{{lastEditTime}}</span>
                </v-tooltip>
                <v-icon class="mr-1 ml-3" color="grey darken-3">fas fa-tags</v-icon>
                <span>{{article.classification}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {timeFormat, isoParse} from 'd3-time-format';

    export default {
        name: 'article-info',
        props: ['article'],
        data: function () {
            return {
                format: timeFormat('%Y.%m.%d %H:%M')
            };
        },
        computed: {
            createTime: function () {
                return this.format(isoParse(this.article.createdAt));
            },
            lastEditTime: function () {
                return this.format(isoParse(this.article.updatedAt));
            },
        },
        methods: {
            goAuthorPage: function (userId) {
                this.$router.push({name: 'author', params: {userId: userId}});
            },
        }
    };
</script>

<style lang="scss">
    .article-info {
        display: flex;
        align-content: center;
        margin: 30px 0 40px;
        &-avatar {
            width: 3.5rem;
            height: 3.5rem;
            vertical-align: middle;
            display: inline-block;
            border: 1px solid #d0d0d0;
            border-radius: 50%;
        }
        &-detail {
            display: flex;
            flex-direction: column;
            vertical-align: middle;
            margin-left: 1.25rem;
            .info-name {
                font-size: 1rem;
                line-height: 1.7rem;
                cursor: pointer;
                outline: none;
                &:hover {
                    text-decoration: underline;
                }
            }
            .info-detail {
                cursor: default;
                &-date {
                    font-size: .85rem;
                }
            }
        }
    }
</style>