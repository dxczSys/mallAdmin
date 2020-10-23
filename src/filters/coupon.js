import { coupon_type_options, preferential_form_options, coupon_modus_options, coupon_condition_options, coupon_limit_options } from '@/enumerate/coupon'

export function coupon_type_filter(v) {
  const obj = coupon_type_options.filter(item => {
    return v == item.value
  })
  if (obj.length) {
    return obj[0].label
  } else {
    return ''
  }
}

export function preferential_form_filter(v) {
  const obj = preferential_form_options.filter(item => {
    return v == item.value
  })
  if (obj.length) {
    return obj[0].label
  } else {
    return ''
  }
}

export function coupon_modus_filter(v) {
  const obj = coupon_modus_options.filter(item => {
    return v == item.value
  })
  if (obj.length) {
    return obj[0].label
  } else {
    return ''
  }
}

export function coupon_condition_filter(v) {
  const obj = coupon_condition_options.filter(item => {
    return v == item.value
  })
  if (obj.length) {
    return obj[0].label
  } else {
    return ''
  }
}

export function coupon_limit_filter(v) {
  const obj = coupon_limit_options.filter(item => {
    return v == item.value
  })
  if (obj.length) {
    return obj[0].label
  } else {
    return ''
  }
}