import { Message } from 'element-ui'

let notifityTimer = null
export const checkPermission = () => {
  if (window.Notification) {
    Notification.requestPermission().then(res => {
      console.log('权限', res)
    })
  } else {
    Message({
      message: '浏览器实时聊天，请更换chrome浏览器',
      type: 'info',
      duration: 1500
    })
  }
}