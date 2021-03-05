<template>
    <div class="author-abstract-item" @click="goArticle">
        <div class="item-info">
            <span class="item-info-author">{{ item.author }}</span>
            <!--<span style="margin-right: 1rem;">{{createTime}}</span>-->
            <v-icon>fas fa-tags</v-icon>
            <span>{{ item.classification }}</span>
        </div>

        <div :class="`item-title ${item.private === '1' ? 'red--text text--darken-2' : ''}`">{{ item.title }}</div>

        <div class="item-content">
            <v-layout>
                <v-flex :xs8="!!item.img">
                    <span class="item-content-text">{{ item.abstract }}</span>
                </v-flex>
                <v-flex v-if="item.img" xs4 style="padding-left: 8px;">
                    <div class="item-content-img" :style="{'background-image': `url(${item.img})`}"></div>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>

<script>
import {timeFormat, isoParse} from 'd3-time-format';

export default {
    name: 'author-abstract-item',
    props: ['item'],
    data: function() {
        return {
            format: timeFormat('%Y.%m.%d %H:%M')
        };
    },
    computed: {
        createTime: function() {
            return this.format(isoParse(this.item.createdAt));
        }
    },
    methods: {
        goArticle: function() {
            this.$router.push({name: 'article', query: {id: this.item._id || ''}});
        }
    }
};
</script>

<style lang="scss">
.author-abstract-item {
    margin: 0 0 1rem 0;
    padding: 0 0 0.75rem 0;
    border-bottom: 1px solid #cfcfcf;
    color: #2f2f2f;

    .item-info {
        font-size: 14px;
        & > * {
            margin-right: 0.5rem;
        }
        &-author {
            cursor: pointer;
            outline: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }

    .item-title {
        display: inline-block;
        cursor: pointer;
        outline: none;
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 0.9;
        margin: 0.75rem 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0);
        &:hover {
            border-bottom: 1px solid;
        }
    }

    .item-content {
        position: relative;
        cursor: default;
        &-text {
            padding: 0 1rem 0 0;
            word-break: break-all;
            font-size: 14px;
        }
        &-img {
            position: relative;
            display: block;
            top: -58px;
            height: calc(100% + 58px);
            width: 100%;
            border-radius: 0.25rem;
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
        }
    }
}
</style>
