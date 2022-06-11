// 商品数据统计的数量
const amountList = {
  code: 0,
  data: [
    {
      amount: 'sale',
      title: '商品总销量',
      tips: '所有商品的总销量',
      subtitle: '商品总销量',
      number1: 509989,
      number2: 509989
    },
    {
      amount: 'favor',
      title: '商品总收藏',
      tips: '所有商品的总收藏',
      subtitle: '商品总收藏',
      number1: 87226,
      number2: 87226
    },
    {
      amount: 'inventory',
      title: '商品总库存',
      tips: '所有商品的总库存',
      subtitle: '商品总库存',
      number1: 853667,
      number2: 853667
    },
    {
      amount: 'saleroom',
      title: '商品总销售额',
      tips: '所有商品的总销售额',
      subtitle: '商品总销售额',
      number1: 43118530,
      number2: 43118530
    }
  ]
}

// 每个分类商品的个数
const categoryGoodsCount = {
  code: 0,
  data: [
    {
      id: 2,
      name: '上衣',
      goodsCount: 14
    },
    {
      id: 3,
      name: '裤子',
      goodsCount: 19
    },
    {
      id: 4,
      name: '鞋子',
      goodsCount: 19
    },
    {
      id: 5,
      name: '厨具',
      goodsCount: 18
    },
    {
      id: 6,
      name: '家具',
      goodsCount: 18
    },
    {
      id: 7,
      name: '床上用品',
      goodsCount: 19
    },
    {
      id: 8,
      name: '女装',
      goodsCount: 35
    }
  ]
}

// 每个分类商品的销量
const categoryGoodsSale = {
  code: 0,
  data: [
    {
      id: 2,
      name: '上衣',
      goodsCount: 49749
    },
    {
      id: 3,
      name: '裤子',
      goodsCount: 84754
    },
    {
      id: 4,
      name: '鞋子',
      goodsCount: 58283
    },
    {
      id: 5,
      name: '厨具',
      goodsCount: 57354
    },
    {
      id: 6,
      name: '家具',
      goodsCount: 49002
    },
    {
      id: 7,
      name: '床上用品',
      goodsCount: 98579
    },
    {
      id: 8,
      name: '女装',
      goodsCount: 112268
    }
  ]
}

// 每个分类商品的收藏
const categoryGoodsFavor = {
  code: 0,
  data: [
    {
      id: 2,
      name: '上衣',
      goodsFavor: 6091
    },
    {
      id: 3,
      name: '裤子',
      goodsFavor: 4939
    },
    {
      id: 4,
      name: '鞋子',
      goodsFavor: 19647
    },
    {
      id: 5,
      name: '厨具',
      goodsFavor: 13906
    },
    {
      id: 6,
      name: '家具',
      goodsFavor: 15425
    },
    {
      id: 7,
      name: '床上用品',
      goodsFavor: 7307
    },
    {
      id: 8,
      name: '女装',
      goodsFavor: 19911
    }
  ]
}
// 不同城市的销量数据
const addressGoodsSale = {
  code: 0,
  data: [
    {
      address: '上海',
      count: 62239
    },
    {
      address: '南京',
      count: 55683
    },
    {
      address: '郑州',
      count: 53716
    },
    {
      address: '广州',
      count: 6364
    },
    {
      address: '西安',
      count: 64976
    },
    {
      address: '长沙',
      count: 4142
    },
    {
      address: '昆明',
      count: 9524
    },
    {
      address: '武汉',
      count: 28212
    },
    {
      address: '重庆',
      count: 60777
    },
    {
      address: '沈阳',
      count: 20900
    },
    {
      address: '宁波',
      count: 66584
    },
    {
      address: '苏州',
      count: 1136
    },
    {
      address: '青岛',
      count: 9021
    },
    {
      address: '成都',
      count: 23378
    },
    {
      address: '北京',
      count: 6107
    },
    {
      address: '天津',
      count: 5096
    },
    {
      address: '深圳',
      count: 12480
    },
    {
      address: '杭州',
      count: 19654
    }
  ]
}

export {
  amountList,
  categoryGoodsCount,
  categoryGoodsSale,
  categoryGoodsFavor,
  addressGoodsSale
}
