import Vue from 'vue';
import App from '../capturer/App';


class CapturerService {
    getEl = selector => document.querySelector(selector);
    createEl = (tag) => document.createElement(tag);


    domInject(targetElSelector) {
        const targetEl = this.getEl(targetElSelector);
        if ( targetEl ) {
            const vueRootEl = this.createEl('div');
            vueRootEl.id = 'capturerVue';
            targetEl.append(vueRootEl);
            this.addVueApp(vueRootEl.id);
        } else {
            setTimeout(()=> this.domInject(), 1000);
        }
    }

    addVueApp(targetElSelector) {
        /* eslint-disable no-new */

        new Vue({
            el: '#'+targetElSelector,
            render: h => h(App),
        });
    }
}

(function (CapturerService) {
    var capturerService = new CapturerService();
    capturerService.domInject('#app');
})(CapturerService)
