import axios from 'axios'
const request = () => {

}
/* this is a function to roll the data */
/* fn must be a function that take url res as params and return a tuple of nx and ny */
const rollup = (myChart, data, categories, interval, url, params, fn) => {
  setInterval(function () {
    let newCategories, newData
    axios.get(url, params)
      .then(res => {
        [newCategories, newData] = fn(res)
      })
      .catch(err => {
        console.error(err);
      })
    data.shift();
    data.push(newCategories);
    categories.shift();
    categories.push(newData);
    myChart.setOption({
      xAxis: [
        {
          data: categories
        }
      ],
      series: [
        {
          data: data
        }
      ]
    });
  }, interval);
}

const requestData = (url, params) => {
  axios.get(url, params)
    .then(res => {
      return res
    })
    .catch(err => {
      console.error(err);
    })
  return
}