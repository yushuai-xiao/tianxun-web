import { ElMessageBox } from 'element-plus'

import router from '@/router'
interface codeData {
  code: number
  message: string
}

export function messagePrompt(title: string) {
  ElMessageBox.alert(title, 'Title', {
    confirmButtonText: 'OK',
    callback: () => {
      return
    }
  })
}
export function codeJudge(data: codeData) {
  switch (data.code) {
    case 401:
      messagePrompt(data.message)
      router.push('/login')
      break
    default:
      messagePrompt(data.message)
    // console.log('请求错误')
  }
}
