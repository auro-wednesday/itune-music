import { itunesApi } from '@app/services/itunesApi';
import { takeLatest, call, put } from 'redux-saga/effects';
import { itunesTypes, itunesCreators } from './reducer';
// Individual exports for testing
const { REQUEST_GET_ITUNE_LIST } = itunesTypes;
const { successGetItunesList, failureGetitunesList } = itunesCreators;

export function* getItuneData(action) {
  console.log('saga==', action.ituneName);
  const response = yield call(itunesApi, action.ituneName);
  const { data } = response;
  if (ok) {
    yield put(successGetItunesList(data));
    console.log('insaga');
  } else {
    yield put(failureGetitunesList(data));
    console.log('insaga fail');
  }
}

export default function* itunesSaga() {
  yield takeLatest(REQUEST_GET_ITUNE_LIST, getItuneData);
}
