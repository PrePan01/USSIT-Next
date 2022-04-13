import Mock from 'mockjs';

Mock.mock('/list', { //输出数据
  'name': '@name', //随机生成姓名
  'age|10-20': 10
  //还可以自定义其他数据
});
Mock.mock('/mapData2_3', {
  'small|960': [
    {
      'name|+1': 1,
      'value|0-50': 1,
    }
  ],
  'medium|480': [
    {
      'name|+1': 960,
      'value|0-200': 1,
    }
  ],
  'large|160': [
    {
      'name|+1': 1440,
      'value|0-1000': 1,
    }
  ]
})
Mock.mock('/lineData12_4', {
  "data|7": [

  ]
})