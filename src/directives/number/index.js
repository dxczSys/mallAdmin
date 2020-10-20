const number = {
  bind(el, binding) {
    // 整数判断
    var wins_0 = /[^\d]/g
    // 小数判断
    var wins_1 = /[^\d^\.]/g
    var flag = true
    var points = 0
    var lengths = 0
    var remainder = 0
    var no_int = 0
    var timer = null
    const target = el instanceof HTMLInputElement ? el : el.querySelector('input')
    target.addEventListener('compositionstart', e => {
      flag = false
    })
    target.addEventListener('compositionend', e => {
      flag = true
    })
    target.addEventListener('input', e => {
      clearTimeout(timer)
      timer = null
      timer = setTimeout(function() {
        if (flag) {
          if (binding.value === 0) {
            if (wins_0.test(e.target.value)) {
              e.target.value = e.target.value.replace(wins_0, '')
              // 手动更新v-model值
              e.target.dispatchEvent(new Event('input'))
            }
          } else {
            if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/, '$1'))) {
              remainder = true
            }
            if ((e.target.value.split('.')).length - 1 > 1) {
              points = true
            }
            if (e.target.value.toString().split('.')[1] !== undefined) {
              if (e.target.value.toString().split('.')[1].length > binding.value) {
                lengths = true
              }
            }
            if (e.target.value.toString().indexOf('.') !== -1) {
              no_int = false
            } else {
              no_int = true
            }
            let reg = /^(\-)*(\d+)\.(\d\d).*$/
            binding.value === 3 && (reg = /^(\-)*(\d+)\.(\d\d\d).*$/)
            if (wins_1.test(e.target.value) || lengths || points || remainder) {
              if (!no_int) {
                e.target.value = e.target.value.replace(wins_1, '').replace('.', '$#$').replace(/\./g, '').replace(
                  '$#$', '.').replace(reg, '$1$2.$3').substring(0, (e.target.value.indexOf('.') + binding.value + 1))
              } else {
                e.target.value = e.target.value.replace(wins_0, '')
              }
              e.target.dispatchEvent(new Event('input'))
            }
          }
        }
      }, 0)
    })
  }
}

export { number }
