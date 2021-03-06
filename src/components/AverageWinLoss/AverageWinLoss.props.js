import PropTypes from 'prop-types'

const WIN_LOSS_ENTRIES_PROPS = PropTypes.shape({
  mts: PropTypes.number.isRequired,
})

export const propTypes = {
  currentFetchParams: PropTypes.object.isRequired,
  entries: PropTypes.arrayOf(WIN_LOSS_ENTRIES_PROPS).isRequired,
  dataReceived: PropTypes.bool.isRequired,
  pageLoading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,
  setParams: PropTypes.func.isRequired,
}

export const defaultProps = {}
