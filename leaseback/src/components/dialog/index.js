/**
 * Created by Administrator on 2018/8/2 0002.
 */
import DialogComponent from './dialog.vue'// 引入先前写好的vue

const Dialog = {};

// 注册Toast
Dialog.install = function (Vue) {
  // 生成一个Vue的子类
  const ToastConstructor = Vue.extend(DialogComponent);
  // 生成一个该子类的实例
  const instance = new ToastConstructor();

  // 将这个实例挂载在我创建的div上
  // 并将此div加入全局挂载点内部
  instance.$mount(document.createElement('div'));
  document.body.appendChild(instance.$el);

  // 通过Vue的原型注册一个方法
  // 让所有实例共享这个方法 <br>
  Vue.prototype.$dialog = { // 在Vue的原型上添加实例方法，以全局调用
    show(options) { // 控制toast显示的方法
      if (typeof options === 'string') { // 对参数进行判断
        instance.text = options // 传入props
      }
      else if (typeof options === 'object') {
        instance.assign(instance, options) // 合并参数与实例
      }
      instance.theToast = true // 显示toast
    },
    hide() { // 控制toast隐藏的方法
      $vm.theToast = false
    }
  }


//   Vue.prototype.$dialog = (msg) => {
//     instance.msg = msg;
//     instance.theToast = true;
//
//   }
}

export default Dialog
