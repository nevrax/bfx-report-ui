import React from 'react'
import { withTranslation } from 'react-i18next'
import classNames from 'classnames'
import {
  ResponsiveContainer, Area, AreaChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from 'recharts'

import { propTypes, defaultProps } from './Chart.props'

const COLORS = [
  '#73c7ff',
  '#0e9803',
  '#d4d400',
  '#ff2727',
]

class Chart extends React.PureComponent {
  state = {
    hiddenKeys: {},
  }

  getGradients = () => {
    const { dataKeys } = this.props

    return dataKeys.map((dataKey, i) => {
      const { key = dataKey } = dataKey

      return (
        <linearGradient key={key} id={key} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor={COLORS[i]} stopOpacity={0.15} />
          <stop offset='100%' stopColor={COLORS[i]} stopOpacity={0.06} />
        </linearGradient>
      )
    })
  }

  getAreas = () => {
    const { hiddenKeys } = this.state
    const { dataKeys } = this.props

    return dataKeys.map((dataKey, i) => {
      const { key = dataKey, name } = dataKey

      return (
        <Area
          key={key}
          name={name}
          type='monotone'
          dataKey={key}
          stroke={COLORS[i]}
          strokeWidth={1.2}
          fill={`url(#${key})`}
          connectNulls
          dot={false}
          hide={hiddenKeys[key]}
        />
      )
    })
  }

  onLegendClick = ({ dataKey }) => {
    this.setState(({ hiddenKeys }) => ({
      hiddenKeys: {
        ...hiddenKeys,
        [dataKey]: !hiddenKeys[dataKey],
      },
    }))
  }

  render() {
    const { data, className } = this.props

    if (!data.length) {
      return null
    }

    const classes = classNames('line-chart', className)

    return (
      <div className={classes}>
        <ResponsiveContainer aspect={4.0 / 1.8}>
          <AreaChart
            data={data}
          >
            <defs>
              {this.getGradients()}
            </defs>
            <XAxis dataKey='name' stroke='#9e9494' />
            <YAxis stroke='#9e9494' />
            <Tooltip animationDuration={150} />
            <CartesianGrid stroke='#57636b' strokeDasharray='3 3' />
            <Legend
              verticalAlign='top'
              wrapperStyle={{ paddingBottom: 15 }}
              iconType='rect'
              onClick={this.onLegendClick}
            />
            {this.getAreas()}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

Chart.propTypes = propTypes
Chart.defaultProps = defaultProps

export default withTranslation('translations')(Chart)
