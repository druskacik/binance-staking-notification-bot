import { default as Button } from 'ant-design/es/button';
import { default as Checkbox } from 'ant-design/es/checkbox';
import { default as Input } from 'ant-design/es/input';
import { default as message } from 'ant-design/es/message';
import { default as Modal } from 'ant-design/es/modal';
import { default as notification } from 'ant-design/es/notification';
import { default as Radio } from 'ant-design/es/radio';
import { default as Select } from 'ant-design/es/select';
import { default as version } from 'ant-design/es/version';

var components = [Button, Checkbox, Input, Modal, Radio, Select];

var install = function install(Vue) {
  components.map(function (component) {
    Vue.use(component);
  });

  Vue.prototype.$message = message;
  Vue.prototype.$notification = notification;
  Vue.prototype.$info = Modal.info;
  Vue.prototype.$success = Modal.success;
  Vue.prototype.$error = Modal.error;
  Vue.prototype.$warning = Modal.warning;
  Vue.prototype.$confirm = Modal.confirm;
  Vue.prototype.$destroyAll = Modal.destroyAll;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export { version, install, message, notification, Button, Checkbox, Input, Modal, notification, Radio, Select };

export default {
  version: version,
  install: install
};