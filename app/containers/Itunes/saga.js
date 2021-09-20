import { itunesApi } from '@app/services/itunesApi';
import { takeLatest, call, put } from 'redux-saga/effects';
import { itunesTypes, itunesCreators } from './reducer';
// Individual exports for testing
const { REQUEST_GET_ITUNES_LIST } = itunesTypes;
const { successGetItunesList, failureGetItunesList } = itunesCreators;

export function* getItuneData(action) {
  try {
    const response = yield call(itunesApi, action.itunesName);
    const { data } = response;

    yield put(successGetItunesList(data));
  } catch (error) {
    yield put(failureGetItunesList(error));
  }
}

export default function* itunesSaga() {
  yield takeLatest(REQUEST_GET_ITUNES_LIST, getItuneData);
}
