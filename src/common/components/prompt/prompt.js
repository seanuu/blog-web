import Vue from 'vue';
import Component from './prompt.vue';

const PromptConstructor = Vue.extend(Component);

const Prompt = function(options) {
    options = options || {};

    this.instance = new PromptConstructor({
        data: options
    });

    this.instance.$mount();

    document.body.appendChild(this.instance.$el);
    this.instance.visible = false;

    this.instance.dom = this.instance.$el;
};

Prompt.prototype = {
    send: function({title = '提示', message = '确认执行操作！'}) {
        return new Promise((resolve, reject) => {
            this.instance.title = title;
            this.instance.message = message;

            this.instance.resolve = resolve;
            this.instance.reject = reject;

            this.instance.visible = true;
        });
    }
};

export default Prompt;
