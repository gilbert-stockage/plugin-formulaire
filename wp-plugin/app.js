/**
 * Instance plugin generator
 * @generateFunction: createNewInstance
 */

 function createNewInstance(myInstanceId) {
  Vue.use(FormPlugin());

  new Vue({
    el: '#instanceForm',
    template: `<gilbert-plugin></gilbert-plugin>`
  })
}

createNewInstance();