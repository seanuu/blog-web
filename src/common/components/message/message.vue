<template>
    <div class="message">
        <v-snackbar class="message" v-model="visible" top right :timeout="3200">
            {{ message }}
            <v-btn color="pink" flat @click="visible = false">Close</v-btn>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: 'message',
    data: function() {
        return {
            visible: false,
            message: ''
        };
    },
    methods: {
        destroyElement() {
            this.$el.removeEventListener('transitionend', this.destroyElement);
            this.$destroy();
            this.$el.parentNode.removeChild(this.$el);
        }
    },
    watch: {
        visible(value) {
            if (!value) {
                this.$el.addEventListener('transitionend', this.destroyElement);
            }
        }
    }
};
</script>
