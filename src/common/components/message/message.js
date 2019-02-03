import Vue from 'vue';
import Component from './message.vue';

const MessageConstructor = Vue.extend(Component);

let instance;
let instances = [];
let seed = 1;

const Message = function (options) {
    options = options || {};
    const id = 'notification_' + seed++;

    instance = new MessageConstructor({
        data: options
    });

    instance.id = id;
    instance.$mount();

    document.body.appendChild(instance.$el);
    instance.visible = true;

    instance.dom = instance.$el;

    return instance;
};

export default Message;