import { withdraw_state_options } from '@/enumerate/userFinance'

export function withdraw_state_filter(v) {
  const obj = withdraw_state_options.filter(item => {
    return v == item.value
  })
  if (obj.length) {
    return obj[0].label
  } else {
    return ''
  }
}