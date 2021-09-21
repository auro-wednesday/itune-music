import { takeLatest } from 'redux-saga/effects';
import { tracksTypes } from './reducer';
// Individual exports for testing
const { DEFAULT_ACTION } = tracksTypes;

export function* defaultFunction(/* action */) {
  // console.log('Do something here')
}

export default function* tracksSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultFunction);
}
