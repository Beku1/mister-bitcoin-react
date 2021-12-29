import { Component } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export class ChartMarketPrice extends Component {
  state = {
    data: null,
    values: null,
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  }

  async componentDidMount() {
      console.log(this.props)
    let values = this.props.price.values.map((value) => {
      let date = new Date(value.x * 1000)
      // let options = {dateStyle:'full'}
      // date = date.toLocaleDateString("en-US", options)
      return { date, USD: value.y }
    })
    this.setState({ data: this.props.price,values })
  }

  formatTicks = (tickItem) => {
    let {months} = this.state
   let month = tickItem.getMonth()
   let day = tickItem.getDate()
   let time = `${months[month]} ${day}`
   return time
  };



  render() {
    let { data, values } = this.state
    if (!data && !values) return <div>Loading...</div>

    return (
      <div>
        <h1 className="chart-description">
          {data.description.substring(0, data.description.length - 1)} in the
          past 2 Months.
        </h1>
        <div className="chart chart-market">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={values}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis interval={10} stroke="#82ca9d"    tickFormatter={this.formatTicks}  dataKey="date"/>
              <YAxis />
              <Tooltip />
              <Legend />
              <Line activeDot={true} dot={false} type="monotone" dataKey="USD" strokeWidth={2.5} stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
}
