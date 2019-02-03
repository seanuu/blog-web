<template>
    <div class="catalog-item">
        <v-tooltip right style="z-index: 1">
            <div class="catalog-item-wrap" slot="activator" @click="itemClick"
                 v-ripple="{class: item.children ? 'ripple-white' : 'ripple-grey'}"
                 :class="{active: item.expand, 'active-link': linkActivated}">
                <span class="catalog-item-title">{{item._id}}</span>
                <v-icon class="catalog-item-icon" v-if="item.children && !item.expand">fas fa-caret-right fa-fw</v-icon>
                <v-icon class="catalog-item-icon" v-if="item.children && item.expand">fas fa-caret-down fa-fw</v-icon>
            </div>
            <span>{{item._id}}</span>
        </v-tooltip>

        <v-expand-transition>
            <div v-if="item.children" v-show="item.expand" :class="{'catalog-item-list' : item.classify}">
                <catalog-item v-for="(item_child, i) in item.children"
                              :item="item_child" :index="i" :parent="item" :key="i"></catalog-item>
            </div>
        </v-expand-transition>
    </div>
</template>

<script>
    export default {
        name: 'catalog-item',
        props: ['item', 'index', 'parent'],
        data: function () {
            return {};
        },
        computed: {
            linkActivated: function () {
                return this.$route.query.id && this.item.route && this.$route.query.id === this.item.route;
            }
        },
        methods: {
            itemClick: function () {
                // 路由文章
                if (!this.item.children) {
                    this.$router.push({name: 'article', query: {id: this.item.route || ''}});
                    return;
                }

                // 折叠操作
                let status = this.item.expand;
                this.parent.children.forEach(item => {
                    this.$set(item, 'expand', false);
                });
                this.$set(this.item, 'expand', !status);
            }
        }
    };
</script>

<style lang="scss">
    .catalog-item {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        &-wrap {
            display: flex;
            padding: 0.5rem 0.25rem 0.5rem 0.75rem;
            cursor: pointer;
            transition: background 300ms;
            &.active {
                background: $color-primary;
                color: #FFFFFF;
                border-radius: 2px;
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                box-shadow: 0 .1rem .1rem rgba(68, 68, 68, 0.3);
                z-index: 1;
                .catalog-item-icon {
                    color: inherit !important;
                }
            }
            &.active-link {
                color: $color-primary;
            }
            &:hover:not(.active) {
                background: #EEEEEE;
            }
            & * {
                line-height: 1;
            }
        }
        &-title {
            flex: 1;
        }
        &-icon {
            font-size: .75rem;
            color: #464646 !important;
        }
        &-list {
            background-color: #F5F5F5;
        }
    }
</style>