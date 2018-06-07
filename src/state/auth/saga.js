import { call, put, select, takeLatest } from 'redux-saga/effects'
import types from './constants'
import ledgersTypes from '../ledgers/constants'
import { postJsonfetch } from '../utils'

function getAuth(apiKey, apiSecret) {
  return postJsonfetch('http://localhost:31339/check-auth', {
    auth: {
      apiKey,
      apiSecret,
    },
  })
}

function* checkAuth() {
  const auth = yield select(state => state.auth)
  try {
    const data = yield call(getAuth, auth.apiKey, auth.apiSecret)
    yield put({
      type: types.UPDATE_AUTH_RESULT,
      payload: data && data.result,
    })
    if (data && data.result) { // fetch all
      yield put({
        type: ledgersTypes.FETCH_LEDGERS,
      })
    }
  } catch (error) {
    // TODO: handle error case
    // console.error(error)
    // yield put({ type: 'REQUEST_FAILED', error })
  }
}

// function* checkAuthWithApiKey(action = {}) {
// }

// function *checkAuthWithAuthKey(action = {}) {

// }

export default function* authSaga() {
  yield takeLatest(types.CHECK_AUTH, checkAuth)
  // yield takeLatest(types.SET_AUTH_KEY, checkAuthWithAuthKey)
}
