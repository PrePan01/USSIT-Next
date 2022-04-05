import axios from 'axios'

export default {
  /* this is a function to roll the data */
  /* fn must be a function that take url res as params and return a tuple of nx and ny */
  requestApi(TotalData, base, city, initTS, interval) {
    let ts = {
      bus_timestamp: initTS
    }
    let id = {
      flow_id: 4
    }
    this.requestById(TotalData, base, id, `/${city}-flow-by-id/`)
    this.requestByTs(TotalData, base, ts, `/${city}-flow-by-ts/`)
    this.requestAverage(TotalData, base, `/${city}-flow-average/`)
    setInterval(() => {
      this.requestById(TotalData, base, id, `/${city}-flow-by-id/`)
      this.requestByTs(TotalData, base, ts, `/${city}-flow-by-ts/`)
      this.requestAverage(TotalData, base, `/${city}-flow-average/`)
    }, interval);
  },

  async requestByTs(TotalData, base, ts, api) {
    let { data } = await this.requestData(base + api, ts)
    ts.bus_timestamp += 30
    if (!data.flow) return
    this.processTimeData(TotalData, data.flow, ts.bus_timestamp)
  },

  async requestById(TotalData, base, _id, api) {
    let id = JSON.parse(JSON.stringify(_id))
    let { data } = await this.requestData(base + api, id)
    id.flow_id += 1
    if (!data.flow) return
    this.processIdData(TotalData, data.flow, id.flow_id - 1)
  },

  async requestAverage(TotalData, base, api) {
    let { data } = await this.requestData(base + api)
    if (!data) return
    this.processAverageData(TotalData, data)
  },

  async requestPredict(TotalData, base, id, rowData, api) {
    let { data } = await this.requestData(base + api)
    if (!data.flow) return
    this.processPredictData(TotalData, data.flow, id, rowData)
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
      } else if (2 * level <= bus.bus_flow && bus.bus_flow < 3 * level) {
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
    let {gaugeDataPre, gaugeDataCur} = TotalData
    let max = Math.max.apply(Math, flow.map(item => item.bus_flow))
    let v = flow.filter((f) => f.flow_id === id.flow_id)[0]
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
  changeSelect(TotalData, base, city, data) {
    if (data.value.length == 3) {
      data.value = data.value[2]
    }
    let { clickData } = TotalData
    clickData.value = data
    let id = {
      flow_id: data.name
    }
    this.requestById(TotalData, base, id, `/${city}-flow-by-id/`)
    this.requestPredict(TotalData, base, id, data, `/${city}-flow-prediction/`)
  },

  async requestData(url, params) {
    let res = await axios.get(url, { 'params': params })
    return res
  }
}
