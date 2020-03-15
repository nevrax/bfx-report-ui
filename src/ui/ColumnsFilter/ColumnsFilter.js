import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import { Button, InputGroup, Icon } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import _isEqual from 'lodash/isEqual'

import { selectTextOnFocus } from 'utils/inputs'
import { getValidSortedFilters } from 'state/filters/utils'
import { EMPTY_FILTER } from 'var/filterTypes'
import DEFAULT_FILTERS from 'ui/ColumnsFilter/var/defaultFilters'

import ColumnsFilterDialog from './Dialog'
import ColumnSelector from './ColumnSelector'
import FilterTypeSelector from './FilterTypeSelector'
import { propTypes, defaultProps } from './ColumnsFilter.props'

const MAX_FILTERS = 7

/* eslint-disable react/no-array-index-key */
class ColumnsFilter extends PureComponent {
  constructor(props) {
    super()

    const { filters } = props
    this.state = {
      isOpen: false,
      filters,
    }
  }

  toggleDialog = () => {
    const { isOpen } = this.state
    this.setState({ isOpen: !isOpen })
  }

  onClear = () => {
    const { target } = this.props

    this.setState({
      filters: DEFAULT_FILTERS[target],
    })
  }

  onCancel = () => {
    const { filters } = this.props

    this.toggleDialog()
    this.setState({
      filters,
    })
  }

  onFiltersApply = () => {
    const { filters } = this.state
    const { target, setFilters } = this.props

    const trimmedFilters = filters.map(filter => ({
      ...filter,
      value: filter.value.trim(),
    }))

    this.toggleDialog()
    setFilters({
      section: target,
      filters: trimmedFilters,
    })

    this.setState({
      filters: trimmedFilters,
    })
  }

  onFilterAdd = () => {
    const { filters } = this.state
    this.setState({
      filters: filters.concat(EMPTY_FILTER),
    })
  }

  onFilterRemove = (index) => {
    const { filters } = this.state

    // last filter removal
    if (filters.length === 1) {
      this.setState({
        filters: [EMPTY_FILTER],
      })
      return
    }

    this.setState({
      filters: filters.filter((el, i) => i !== index),
    })
  }

  updateFilter = (params) => {
    const { index, ...filterParams } = params
    const { filters } = this.state

    const updatedFilters = filters.map((filter, i) => {
      if (i === index) {
        return {
          ...filter,
          ...filterParams,
        }
      }

      return filter
    })

    this.setState({
      filters: updatedFilters,
    })
  }

  onInputChange = (index, e) => {
    const { value } = e.target
    this.updateFilter({ index, value })
  }

  haveFiltersChanged = () => {
    const { filters: currentFilters } = this.props
    const { filters } = this.state

    const currentValidFilters = getValidSortedFilters(currentFilters)
    const nextValidFilters = getValidSortedFilters(filters)

    const hasFilterValueChanged = nextValidFilters
      .some((filter, index) => !_isEqual(filter, currentValidFilters[index]))

    return currentValidFilters.length !== nextValidFilters.length || hasFilterValueChanged
  }

  /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events, no-shadow */
  render() {
    const { target, filters: currentFilters, t } = this.props
    const { isOpen, filters } = this.state

    const hasChanges = this.haveFiltersChanged()
    const hasAppliedFilters = currentFilters.some(filter => filter.value)

    return (
      <Fragment>
        <div className='columns-filter-wrapper'>
          <Button onClick={this.toggleDialog}>
            {t('columnsfilter.title')}
          </Button>
          {hasAppliedFilters && <div className='columns-filter-wrapper-mark' />}
        </div>

        <ColumnsFilterDialog
          target={target}
          isOpen={isOpen}
          hasChanges={hasChanges}
          onClear={this.onClear}
          onCancel={this.onCancel}
          onFiltersApply={this.onFiltersApply}
        >
          <div className='columns-filter'>
            <div>
              {filters.map((filter, index) => {
                const {
                  column, type, dataType, value,
                } = filter

                return (
                  <div key={index} className='columns-filter-item'>
                    <ColumnSelector
                      section={target}
                      value={column}
                      onChange={({ column, dataType }) => this.updateFilter({ index, column, dataType })}
                    />
                    <FilterTypeSelector
                      value={type}
                      dataType={dataType}
                      onChange={filterType => this.updateFilter({ index, type: filterType })}
                    />
                    <InputGroup
                      className='columns-filter-item-input'
                      value={value}
                      onChange={e => this.onInputChange(index, e)}
                      onFocus={selectTextOnFocus}
                    />
                    <Icon
                      className='columns-filter-item-remove'
                      icon={IconNames.SMALL_CROSS}
                      onClick={() => this.onFilterRemove(index)}
                    />
                  </div>
                )
              })}
            </div>

            {(filters.length < MAX_FILTERS) && (
              <div className='columns-filter-add' onClick={this.onFilterAdd}>
                {`+ ${t('preferences.sync.add-filter')}`}
              </div>
            )}
          </div>
        </ColumnsFilterDialog>
      </Fragment>
    )
  }
}

ColumnsFilter.propTypes = propTypes
ColumnsFilter.defaultProps = defaultProps

export default withTranslation('translations')(ColumnsFilter)
