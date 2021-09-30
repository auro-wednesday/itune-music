import { trackIdApi } from '@app/services/trackIdApi';
import { takeLatest, call, put } from 'redux-saga/effects';
import { trackTypes, trackCreators } from './reducer';
import { notification } from 'antd';

const { REQUEST_GET_TRACK_DATA } = trackTypes;
const { successGetTrackData, failureGetTrackData } = trackCreators;

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Warning',
    description: 'This URL does not return any Data'
  });
};

export function* getTrackData(action) {
  try {
    const response = yield call(trackIdApi, action.trackId);
    const {
      data: { results }
    } = response;
    if (!results.length) {
      openNotificationWithIcon('warning');
    } else {
      yield put(successGetTrackData(results[0]));
    }
  } catch (error) {
    yield put(failureGetTrackData(error));
  }
}

export default function* trackSaga() {
  yield takeLatest(REQUEST_GET_TRACK_DATA, getTrackData);
}
