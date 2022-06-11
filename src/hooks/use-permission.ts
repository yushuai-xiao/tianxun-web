import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions[pageName]
  console.log(permissions)
  // const verifyPermission = `system:${pageName}:${hanldeName}`
  // const verifyPermission = `system:${pageName}:${hanldeName}`

  // name = "xs"
  // !name -> false
  // !!name -> true
  if (permissions) {
    return !!permissions.find((item: string) => item === handleName)
  }
}
