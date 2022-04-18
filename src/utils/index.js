import axios from 'axios'

export default {
  /* this is a function to roll the data */
  /* fn must be a function that take url res as params and return a tuple of nx and ny */
  apiMap: {
    'hf': {
      id: '/hf-flow-by-id/',
      ts: '/hf-flow-by-ts/',
      average: '/hf-flow-average/',
      predict: '/hf-flow-prediction/'
    },
    'ta': {
      id: '/ta-flow-by-id/',
      ts: '/ta-flow-by-ts/',
      average: '/ta-flow-average/',
      predict: '/ta-flow-prediction/'
    },
    'ns': {
      id: '/ns-park-show-by-id/',
      ts: '/ns-park-show-by-ts/',
      average: '/ns-park-statistics/',
      predict: '/ns-park-prediction/'
    },
  },

  requestApi(TotalData, base, city, initTS, interval) {
    let ts = {
      ts: initTS
    }
    let id = {
      id: 4
    }
    this.requestById(TotalData, base, id, this.apiMap[city]['id'])
    this.requestByTs(TotalData, base, ts, this.apiMap[city]['ts'])
    this.requestAverage(TotalData, base, this.apiMap[city]['average'])
    setInterval(() => {
      this.requestById(TotalData, base, id, this.apiMap[city]['id'])
      this.requestByTs(TotalData, base, ts, this.apiMap[city]['ts'])
      this.requestAverage(TotalData, base, this.apiMap[city]['average'])
      id.id += 1
    }, interval);
  },

  async requestByTs(TotalData, base, ts, api) {
    let { data } = await this.requestData(base + api, ts)
    ts.ts += 30
    if (data.park_show) {
      this.processTimeDataPark(TotalData, data.park_show, ts.ts)
      return
    }
    if (!data.flow) return
    this.processTimeData(TotalData, data.flow, ts.ts)
  },

  async requestById(TotalData, base, _id, api) {
    let id = JSON.parse(JSON.stringify(_id))
    let { data } = await this.requestData(base + api, id)
    if (data.park_show) {
      this.processIdDataPark(TotalData, data.park_show, id.id)
      return
    }
    if (!data.flow) return
    this.processIdData(TotalData, data.flow, id.id)
  },

  async requestAverage(TotalData, base, api) {
    let { data } = await this.requestData(base + api)
    if (data.park_statistics) {
      this.processAverageDataPark(TotalData, data.park_statistics)
      return
    }
    if (!data) return
    this.processAverageData(TotalData, data)
  },

  async requestPredict(TotalData, base, id, rowData, api) {
    let { data } = await this.requestData(base + api)
    if (data.parking_prediction) {
      this.processPredictDataPark(TotalData, data.parking_prediction, id, rowData)
      return
    }
    if (!data) return
    this.processPredictData(TotalData, data.data, id, rowData)
  },

  processTimeData(TotalData, flow) {
    let { mapData, zoomData, pieData } = TotalData
    let ret = []
    let zoom = {
      categories: [],
      value: [],
      yTitle: '车流量',
      title: '当前时刻车流量分布'
    }
    let pieTmp = {
      '通畅': 0,
      '平衡': 0,
      '拥挤': 0,
    }
    flow.sort((a, b) => a.flow_id - b.flow_id)
    for (let bus of flow) {
      let tmp = { name: bus.flow_id, value: bus.bus_flow }
      zoom.categories.push(bus.flow_id)
      zoom.value.push(bus.bus_flow)
      ret.push(tmp)
    }
    let level = (Math.max(...zoom.value) - Math.min(...zoom.value)) / 3
    for (let bus of flow) {
      if (0 <= bus.bus_flow && bus.bus_flow < level) {
        pieTmp['通畅'] += 1
      } else if (level <= bus.bus_flow && bus.bus_flow < 2 * level) {
        pieTmp['平衡'] += 1
      } else if (2 * level <= bus.bus_flow && bus.bus_flow <= 3 * level) {
        pieTmp['拥挤'] += 1
      }
    }
    let pie = []
    for (let item in pieTmp) {
      pie.push({ value: pieTmp[item], name: item })
    }
    zoomData.value = zoom
    console.log(ret)
    mapData.value = ret
    pieData.value = pie
  },

  processIdData(TotalData, flow, flow_id) {
    let { idData } = TotalData
    let ret = {
      categories: [],
      categories2: [],
      value: [],
      value2: [],
      yTitle: '',
      yTitle2: '车流量',
      title: ''
    }
    ret.title = `Road ${flow_id} 历史车流量`
    for (let bus of flow) {
      let tmp = new Date(parseInt(bus.bus_timestamp) * 1000)
      ret.categories.push(tmp.toLocaleString())
      ret.value.push(bus.bus_flow)
    }
    idData.value = ret
  },

  processAverageData(TotalData, data) {
    let { lineData } = TotalData
    let ret = {
      categories: [],
      value: data.average,
      title: '平均车流量',
      title2: '车流量'
    }
    for (let t of data.bus_timestamp) {
      let tmp = new Date(parseInt(t) * 1000)
      ret.categories.push(tmp.toLocaleString())
    }
    lineData.value = ret
  },

  processPredictData(TotalData, flow, _id, data) {
    let id = JSON.parse(JSON.stringify(_id))
    let { gaugeDataPre, gaugeDataCur } = TotalData
    let max = Math.max.apply(Math, flow.map(item => item.bus_flow))
    let v = flow.filter((f) => f.flow_id === id.id)[0]
    let retPre = {
      range: max,
      data: v?.bus_flow,
      title: '预测流量'
    }
    let retCur = {
      range: max,
      data: data.value,
      title: '当前流量'
    }
    gaugeDataPre.value = retPre
    gaugeDataCur.value = retCur
  },

  processTimeDataPark(TotalData, park_show) {
    let { mapData, zoomData, pieData } = TotalData
    let ret = []
    let zoom = {
      categories: [],
      value: [],
      yTitle: '车位占用',
      title: '当前车位占用分布'
    }
    let pieTmp = {
      '通畅': 0,
      '平衡': 0,
      '拥挤': 0,
    }
    park_show.sort((a, b) => a.park_id - b.park_id)
    for (let p of park_show) {
      let tmp = { name: p.park_id, value: p.park_congestion }
      zoom.categories.push(p.park_id)
      zoom.value.push(p.park_congestion)
      ret.push(tmp)
    }
    for (let bus of park_show) {
      if (0 <= bus.park_congestion_rate && bus.park_congestion_rate < 0.33) {
        pieTmp['通畅'] += 1
      } else if (0.33 <= bus.park_congestion_rate && bus.park_congestion_rate < 0.66) {
        pieTmp['平衡'] += 1
      } else if (0.66 <= bus.park_congestion_rate && bus.park_congestion_rate <= 1) {
        pieTmp['拥挤'] += 1
      }
    }
    let pie = []
    for (let item in pieTmp) {
      pie.push({ value: pieTmp[item], name: item })
    }
    zoomData.value = zoom
    mapData.value = ret
    pieData.value = pie
  },

  processIdDataPark(TotalData, park_show, id) {
    let { idData } = TotalData
    let ret = {
      categories: [],
      categories2: [],
      value: [],
      value2: [],
      yTitle: '',
      yTitle2: '车流量',
      title: ''
    }
    ret.title = `Road ${id} 历史停车信息`
    for (let p of park_show) {
      ret.categories.push(p.park_timestamp)
      ret.value.push(p.park_congestion)
    }
    idData.value = ret
  },

  processAverageDataPark(TotalData, data) {
    let { lineData } = TotalData
    let ret = {
      categories: [],
      value: [],
      title: '平均停车占用数',
      title2: '占用数'
    }
    for (let item of data) {
      ret.categories.push(item.park_timestamp)
      ret.value.push(item.park_general_congestion)
    }
    lineData.value = ret
  },

  processPredictDataPark(TotalData, pp, _id, data) {
    let id = JSON.parse(JSON.stringify(_id))
    let { gaugeDataPre, gaugeDataCur } = TotalData
    let max = Math.max.apply(Math, pp.map(item => item.park_occupation))
    let v = pp.filter((f) => f.park_id === id.id)[0]
    let retPre = {
      range: max,
      data: v?.park_occupation,
      title: '预测流量'
    }
    let retCur = {
      range: max,
      data: data.value,
      title: '当前流量'
    }
    gaugeDataPre.value = retPre
    gaugeDataCur.value = retCur
  },

  changeSelect(TotalData, base, city, data) {
    if (data.value.length == 3) {
      data.value = data.value[2]
    }
    let { clickData } = TotalData
    clickData.value = data
    let id = {
      id: data.name
    }
    this.requestById(TotalData, base, id, this.apiMap[city]['id'])
    this.requestPredict(TotalData, base, id, data, this.apiMap[city]['predict'])
  },

  async requestData(url, params) {
    let res = await axios.get(url, { 'params': params })
    return res
  }
}
