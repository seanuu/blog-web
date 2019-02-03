<template>
    <v-dialog v-model="visible" persistent max-width="320">
        <v-card class="prompt-card">
            <v-card-title class="headline">{{title}}</v-card-title>

            <v-card-text>{{message}}</v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" small @click="confirm">确认</v-btn>
                <v-btn small @click="cancel">取消</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: 'prompt',
        data: function () {
            return {
                visible: false,
                title: 'title',
                message: 'message',

                resolve: null,
                reject: null
            };
        },
        methods: {
            confirm: function () {
                this.visible = false;
                this.resolve(true);
            },
            cancel: function () {
                this.visible = false;
                this.resolve(false);
            }
        }
    };
</script>

<style lang="scss">
    .prompt-card {
        .v-card__title {
            font-size: 20px !important;
            padding: 15px;
            padding-bottom: 10px;
        }

        .v-card__text {
            padding: 10px 15px;
        }

        .v-card__actions {
            padding-top: 10px;
            padding-bottom: 15px;
        }
    }
</style>