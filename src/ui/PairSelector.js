import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Intent,
  MenuItem,
} from '@blueprintjs/core'
import { Select } from '@blueprintjs/select'
import { IconNames } from '@blueprintjs/icons'

class PairSelector extends PureComponent {
  filterPair = (query, pair) => pair.indexOf(query.toUpperCase()) >= 0

  renderPair = (pair, { modifiers }) => {
    const { active, disabled, matchesPredicate } = modifiers
    if (!matchesPredicate) {
      return null
    }
    const { currentPair } = this.props
    const isCurrent = currentPair === pair

    return (
      <MenuItem
        active={active}
        intent={isCurrent ? Intent.PRIMARY : Intent.NONE}
        disabled={disabled}
        key={pair}
        onClick={() => this.onPairSelect(pair)}
        text={pair}
      />
    )
  }

  onPairSelect = (pair) => {
    const { onPairSelect } = this.props

    onPairSelect(pair)
  }

  render() {
    const { currentPair, pairs } = this.props

    return (
      <Select
        disabled={!pairs.length}
        items={pairs}
        itemRenderer={this.renderPair}
        itemPredicate={this.filterPair}
        onItemSelect={this.onPairSelect}
      >
        <Button
          text={currentPair}
          rightIcon={IconNames.CARET_DOWN}
          disabled={!pairs.length}
        />
      </Select>
    )
  }
}

PairSelector.propTypes = {
  currentPair: PropTypes.string.isRequired,
  onPairSelect: PropTypes.func.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string),
}
PairSelector.defaultProps = {
  pairs: [],
}

export default PairSelector
