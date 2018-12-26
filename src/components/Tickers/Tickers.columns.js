import React from 'react'
import {
  Cell,
  TruncatedFormat,
} from '@blueprintjs/table'

export default function getColumns(props) {
  const { filteredData, getFullTime } = props

  return [
    {
      id: 'symbol',
      name: 'tickers.column.pair',
      width: 80,
      renderer: (rowIndex) => {
        const { pair } = filteredData[rowIndex]
        return (
          <Cell tooltip={pair}>
            {pair}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].pair,
    },
    {
      id: 'bid',
      name: 'tickers.column.bid',
      width: 100,
      renderer: (rowIndex) => {
        const { bid } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={bid}
          >
            {bid}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].bid,
    },
    {
      id: 'ask',
      name: 'tickers.column.ask',
      width: 100,
      renderer: (rowIndex) => {
        const { ask } = filteredData[rowIndex]
        return (
          <Cell
            className='bitfinex-text-align-right'
            tooltip={ask}
          >
            {ask}
          </Cell>
        )
      },
      tooltip: rowIndex => filteredData[rowIndex].ask,
    },
    {
      id: 'mtsUpdate',
      name: 'tickers.column.time',
      width: 200,
      renderer: (rowIndex) => {
        const timestamp = getFullTime(filteredData[rowIndex].mtsUpdate)
        return (
          <Cell tooltip={timestamp}>
            <TruncatedFormat>
              {timestamp}
            </TruncatedFormat>
          </Cell>
        )
      },
      tooltip: rowIndex => getFullTime(filteredData[rowIndex].mtsUpdate),
    },
  ]
}
