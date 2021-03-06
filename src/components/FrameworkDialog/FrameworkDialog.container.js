import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getSyncMode } from 'state/sync/selectors'
import { toggleFrameworkDialog, proceedFrameworkRequest } from 'state/ui/actions'
import { getIsFrameworkDialogOpen } from 'state/ui/selectors'

import FrameworkDialog from './FrameworkDialog'

const mapStateToProps = state => ({
  syncMode: getSyncMode(state),
  isOpen: getIsFrameworkDialogOpen(state),
})

const mapDispatchToProps = {
  toggleDialog: toggleFrameworkDialog,
  proceedRequest: proceedFrameworkRequest,
}

const FrameworkDialogContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(FrameworkDialog))

export default FrameworkDialogContainer
