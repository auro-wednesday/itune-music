/**
 * Test itunes sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { call, takeLatest, put } from 'redux-saga/effects';
import { itunesApi } from '@app/services/itunesApi';

import itunesSaga, { getItuneData } from '../saga';
import { itunesTypes } from '../reducer';

describe('Itunes saga tests', () => {
  const generator = itunesSaga();
  const itunesName = 'adele';
  let getItunesListGenerator = getItuneData({ itunesName });

  it('should start task to watch for REQUEST_GET_ITUNES_LIST action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesTypes.REQUEST_GET_ITUNES_LIST, getItuneData));
  });

  it('should ensure that the action FAILURE_GET_ITUNES_LIST is dispatched when the api call fails', () => {
    const res = getItunesListGenerator.next().value;
    expect(res).toEqual(call(itunesApi, itunesName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching data'
    };
    expect(getItunesListGenerator.next().value).toEqual(
      put({
        type: itunesTypes.FAILURE_GET_ITUNES_LIST,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNES_LIST is dispatched when the api call succeeds', () => {
    getItunesListGenerator = getItuneData({ itunesName });
    const res = getItunesListGenerator.next().value;
    expect(res).toEqual(call(itunesApi, itunesName));
    const reposResponse = {
      totalCount: 50,
      items: [{ songName: itunesName }]
    };
    expect(getItunesListGenerator.nest().value).toEqual(
      put({
        type: itunesTypes.SUCCESS_GET_ITUNES_LIST,
        data: reposResponse
      })
    );
  });
});
