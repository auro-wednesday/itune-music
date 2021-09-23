import { trackIdApi } from '@app/services/tests/trackIdApi';
import { takeLatest, call, put } from 'redux-saga/effects';
import { trackTypes, trackCreators } from './reducer';
// Individual exports for testing
const { REQUEST_GET_TRACK_DATA } = trackTypes;
const { successGetTrackData, failureGetTrackData } = trackCreators;

export function* getTrackData(action) {
  try {
    const response = yield call(trackIdApi, action.trackId);
    const {
      data: { results }
    } = response;

    yield put(successGetTrackData(results[0]));
  } catch (error) {
    yield put(failureGetTrackData(error));
  }
}

export default function* trackSaga() {
  yield takeLatest(REQUEST_GET_TRACK_DATA, getTrackData);
}
