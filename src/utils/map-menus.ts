import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb'
// import { keyOf } from 'element-plus/es/utils/props'
// import menu from '@/router/main/system/menu/menu'

let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  firstMenu = null
  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // console.log(r);
  routeFiles.keys().forEach((key) => {
    // ./analysis/dashboard/dashboard.ts
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)
  // 2.根据菜单获取需要添加的routes
  // userMenus:
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  const _recurseGetRoute = (menus: any[]) => {
    console.log(menus, 'menus')
    for (const menu of menus) {
      if (menu.superId !== null && menu.children) {
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
          console.log(firstMenu, 'fm')
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)
  return routes
}
// 面包屑获取值
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

// 选中当前的菜单
// /main/system/role  -> type === 2 对应menu
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.superId.length === '1') {
      // console.log(menu, 'meunid')
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else {
      return menu
    }
  }
}

// 用户权限得映射
export function mapMenusToPermissions(userMenus: string[]) {
  const pageName = {}
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      // 把获取的的url中，最后/的值放入对象中，最为一个
      if (menu.superId !== null && menu.children) {
        const pname = menu.url.slice(menu.url.lastIndexOf('/') + 1)
        pageName[pname] = []
        // 判断权限状态
        if (menu.status === 1) {
          for (const submenu of menu.children) {
            // 判断权限状态
            if (submenu.status === 1) {
              pageName[pname].push(submenu.button)
            }
          }
        }
        // console.log(pname)
      } else {
        _recurseGetPermission(menu.children)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return pageName
}
//   _recurseGetRoute(userMenus)
//   const permissions: string[] = []
//   const _recurseGetPermission = (menus: any[]) => {
//     for (const menu of menus) {
//       if (!menu.button) {
//         _recurseGetPermission(menu.children ?? [])
//       } else {
//         permissions.push(menu.button)
//       }
//     }
//   }
//   _recurseGetPermission(userMenus)

//   return permissions
// }

export function onlySecondMenus(userMenus: string[]) {
  const secondMenus: number[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      // 把获取的的url中，最后/的值放入对象中，最为一个
      if (menu.superId !== null && menu.children.length === 0) {
        // console.log(menu.id)
        secondMenus.push(menu.id)
      } else {
        _recurseGetPermission(menu.children)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return secondMenus
}

export function menuMapLeafKeys(menuList: any[], permissions: number[]) {
  const leftKeys: number[] = []
  for (const menu of permissions) {
    const hasMenu = menuList.find((item) => {
      return item == menu
    })
    if (hasMenu) {
      leftKeys.push(menu)
    }
  }
  return leftKeys
}
export { firstMenu }
