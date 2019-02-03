import * as Components from './components';
import * as Directives from './directives';
import Message from './components/message/message';
import Prompt from './components/prompt/prompt';

export default {
    install: (Vue) => {
        for (let name in Components) {
            Vue.component(Components[name]['name'], Components[name]);
        }

        for (let name in Directives) {
            Vue.directive(name, Directives[name]);
        }

        Vue.prototype.$message = Message;
        Vue.prototype.$prompt = new Prompt();
    }
};
