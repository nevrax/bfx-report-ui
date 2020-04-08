import React, { Fragment, PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  ButtonGroup,
  Card,
  Elevation,
} from '@blueprintjs/core'

import DataTable from 'ui/DataTable'
import Loading from 'ui/Loading'
import NoData from 'ui/NoData'
import SectionHeader from 'ui/SectionHeader'
import RefreshButton from 'ui/RefreshButton'
import queryConstants from 'state/query/constants'
import { getPath } from 'state/query/utils'
import { checkFetch } from 'state/utils'

import getColumns from 'components/Positions/Positions.columns'
import { propTypes, defaultProps } from './PositionsActive.props'

const TYPE = queryConstants.MENU_POSITIONS_ACTIVE

class PositionsActive extends PureComponent {
  componentDidMount() {
    const { dataReceived, pageLoading, fetchData } = this.props
    if (!dataReceived && !pageLoading) {
      fetchData()
    }
  }

  componentDidUpdate(prevProps) {
    checkFetch(prevProps, this.props, TYPE)
  }

  jumpToPositionsAudit = (e) => {
    e.preventDefault()
    const { history } = this.props
    const id = e.target.getAttribute('value')
    history.push(`${getPath(queryConstants.MENU_POSITIONS_AUDIT)}/${id}${window.location.search}`)
  }

  jumpToPositions = (e) => {
    e.preventDefault()
    const { history } = this.props
    history.push(`${getPath(queryConstants.MENU_POSITIONS)}${window.location.search}`)
  }

  render() {
    const {
      getFullTime,
      entries,
      dataReceived,
      pageLoading,
      refresh,
      t,
      timeOffset,
    } = this.props
    const tableColumns = getColumns({
      target: TYPE,
      filteredData: entries,
      getFullTime,
      t,
      onIdClick: this.jumpToPositionsAudit,
      timeOffset,
    })

    const renderButtonGroup = (
      <ButtonGroup className='section-switch'>
        <Button onClick={this.jumpToPositions}>{t('positions.closed')}</Button>
        <Button active>{t('positions.active')}</Button>
        <RefreshButton handleClickRefresh={refresh} />
      </ButtonGroup>
    )

    let showContent
    if (!dataReceived && pageLoading) {
      showContent = <Loading />
    } else if (!entries.length) {
      showContent = (
        <Fragment>
          {renderButtonGroup}
          <br />
          <br />
          <NoData title='positions.no_active' />
        </Fragment>
      )
    } else {
      showContent = (
        <Fragment>
          {renderButtonGroup}
          <DataTable
            numRows={entries.length}
            tableColumns={tableColumns}
          />
        </Fragment>
      )
    }

    return (
      <Card elevation={Elevation.ZERO} className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <SectionHeader
          filter={false}
          target={TYPE}
          title='positions.title'
        />
        {showContent}
      </Card>
    )
  }
}

PositionsActive.propTypes = propTypes
PositionsActive.defaultProps = defaultProps

export default withTranslation('translations')(PositionsActive)
