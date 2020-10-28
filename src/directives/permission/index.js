export default {
  bind (bind_el, binding) {
    console.log('bind 执行了', { bind_el }, { binding })
  },
  inserted (el, binding) {
    console.log('inserted 执行了', { el }, { binding })
  },
  update(el, binding) {
    console.log('update 执行了', { el }, { binding })
  },
  componentUpdated(el, binding) {
    console.log('componentUpdated 执行了', { el }, { binding })
  },
  unbind(el, binding) {
    console.log('unbind 执行了', { el }, { binding })
  }
}