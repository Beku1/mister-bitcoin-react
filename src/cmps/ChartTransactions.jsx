import { Component } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export class ChartTransactions extends Component {
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
    let values = this.props.transData.values.map((value) => {
      return { date: new Date(value.x * 1000), USD: value.y }
    })
    this.setState({ data: this.props.transData,values })
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

        <div className="chart chart-transactions">
          <ResponsiveContainer>
            <AreaChart
              width={500}
              height={300}
              data={values}
              margin={{
                top: 40,
                right: 30,
                left: 100,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis interval={10} tickFormatter={this.formatTicks} dataKey="date" />
              <YAxis />
              <Tooltip/>

              <Area activeDot={true}
            dot={false}
                type="monotone"
                dataKey="USD"
                stroke="#8844d8"
                
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
}
