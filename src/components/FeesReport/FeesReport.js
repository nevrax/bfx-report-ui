import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import { Card, Elevation } from '@blueprintjs/core'
import _sortBy from 'lodash/sortBy'
import _isEqual from 'lodash/isEqual'

import {
  SectionHeader,
  SectionHeaderTitle,
  SectionHeaderRow,
  SectionHeaderItem,
  SectionHeaderItemLabel,
} from 'ui/SectionHeader'
import MultiPairSelector from 'ui/MultiPairSelector'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import Chart from 'ui/Charts/Chart'
import parseChartData from 'ui/Charts/Charts.helpers'
import TimeFrameSelector from 'ui/TimeFrameSelector'
import QueryButton from 'ui/QueryButton'
import RefreshButton from 'ui/RefreshButton'
import TimeRange from 'ui/TimeRange'
import queryConstants from 'state/query/constants'
import { checkFetch, checkInit, togglePair } from 'state/utils'

import { propTypes, defaultProps } from './FeesReport.props'

const TYPE = queryConstants.MENU_FEES_REPORT

class FeesReport extends PureComponent {
  componentDidMount() {
    checkInit(this.props, TYPE)
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  handleQuery = () => {
    const { fetchData } = this.props
    fetchData()
  }

  handleTimeframeChange = (timeframe) => {
    const { setParams } = this.props
    setParams({ timeframe })
  }

  hasChanges = () => {
    const { currentFetchParams, params } = this.props
    return !_isEqual(currentFetchParams, params)
  }

  render() {
    const {
      entries,
      targetPairs,
      params: { timeframe },
      dataReceived,
      pageLoading,
      refresh,
      t,
    } = this.props
    const hasChanges = this.hasChanges()

    const { chartData, presentCurrencies } = parseChartData({
      data: _sortBy(entries, ['mts']),
      timeframe,
    })

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = <NoData />
    } else {
      showContent = (
        <Chart
          data={chartData}
          dataKeys={presentCurrencies}
        />
      )
    }
    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader>
          <SectionHeaderTitle>{t('feesreport.title')}</SectionHeaderTitle>
          <TimeRange className='section-header-time-range' />
          <SectionHeaderRow>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.filter.symbol')}
              </SectionHeaderItemLabel>
              <MultiPairSelector
                currentFilters={targetPairs}
                togglePair={pair => togglePair(TYPE, this.props, pair)}
              />
            </SectionHeaderItem>
            <SectionHeaderItem>
              <SectionHeaderItemLabel>
                {t('selector.select')}
              </SectionHeaderItemLabel>
              <TimeFrameSelector
                value={timeframe}
                onChange={this.handleTimeframeChange}
              />
            </SectionHeaderItem>

            <QueryButton
              disabled={!hasChanges}
              onClick={this.handleQuery}
            />
            <RefreshButton onClick={refresh} />
          </SectionHeaderRow>
        </SectionHeader>
        {showContent}
      </Card>
    )
  }
}

FeesReport.propTypes = propTypes
FeesReport.defaultProps = defaultProps

export default withTranslation('translations')(FeesReport)
