import PropTypes from 'prop-types'
import { intlShape } from 'react-intl'

const ORDERS_ENTRIES_PROPS = PropTypes.shape({
  amountOrig: PropTypes.number,
  amountExecuted: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  mtsUpdate: PropTypes.number.isRequired,
  pair: PropTypes.string.isRequired,
  price: PropTypes.number,
  priceAvg: PropTypes.number,
  status: PropTypes.string,
  type: PropTypes.string.isRequired,
})

export const propTypes = {
  addTargetPair: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  entries: PropTypes.arrayOf(ORDERS_ENTRIES_PROPS).isRequired,
  existingPairs: PropTypes.arrayOf(PropTypes.string),
  fetchOrders: PropTypes.func.isRequired,
  fetchNext: PropTypes.func.isRequired,
  fetchPrev: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  jumpPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageOffset: PropTypes.number.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  pairs: PropTypes.arrayOf(PropTypes.string),
  refresh: PropTypes.func.isRequired,
  removeTargetPair: PropTypes.func.isRequired,
  targetPairs: PropTypes.arrayOf(PropTypes.string),
  getFullTime: PropTypes.func,
  nextPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
}

export const defaultProps = {
  addTargetPair: () => {},
  offset: 0,
  entries: [],
  existingPairs: [],
  fetchOrders: () => {},
  fetchNext: () => {},
  fetchPrev: () => {},
  getFullTime: () => {},
  intl: {},
  jumpPage: () => {},
  loading: true,
  pageOffset: 0,
  pageLoading: false,
  pairs: [],
  refresh: () => {},
  removeTargetPair: () => {},
  targetPairs: '',
  nextPage: false,
}
