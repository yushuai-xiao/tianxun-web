// import xsRequest from '@/service'

import {
  amountList,
  categoryGoodsCount,
  categoryGoodsSale,
  categoryGoodsFavor,
  addressGoodsSale
} from './data/data'

// enum DashboardAPI {
//   categoryGoodsCount = '/goods/category/count',
//   categoryGoodsSale = '/goods/category/sale',
//   categoryGoodsFavor = '/goods/category/favor',
//   addressGoodsSale = '/goods/address/sale',
//   amountList = '/goods/amount/list'
// }

export function getAmountList() {
  // return xsRequest.get({
  //   url: DashboardAPI.amountList
  // })
  return amountList
}
export function getCategoryGoodsCount() {
  // return xsRequest.get({
  //   url: DashboardAPI.categoryGoodsCount
  // })
  return categoryGoodsCount
}
export function getCategoryGoodsSale() {
  // return xsRequest.get({
  //   url: DashboardAPI.categoryGoodsSale
  // })
  return categoryGoodsSale
}

export function getCategoryGoodsFavor() {
  // return xsRequest.get({
  //   url: DashboardAPI.categoryGoodsFavor
  // })
  return categoryGoodsFavor
}

export function getAddressGoodsSale() {
  // return xsRequest.get({
  //   url: DashboardAPI.addressGoodsSale
  // })
  return addressGoodsSale
}
