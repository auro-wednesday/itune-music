/**
 * Test tracks sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import tracksSaga, { defaultFunction } from '../saga';
import { tracksTypes } from '../reducer';

describe('Tracks saga tests', () => {
  const generator = tracksSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(tracksTypes.DEFAULT_ACTION, defaultFunction));
  });
});
