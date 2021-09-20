/**
 * Test itunes sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import * as api from '@app/services/itunesApi';
import { runSaga } from 'redux-saga';
import itunesSaga, { getItuneData } from '../saga';
import { itunesTypes } from '../reducer';

describe('Itunes saga tests', () => {
  const generator = itunesSaga();
  const itunesName = 'adele';

  it('should start task to watch for REQUEST_GET_ITUNES_LIST action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesTypes.REQUEST_GET_ITUNES_LIST, getItuneData));
  });

  it('should ensure that the action FAILURE_GET_ITUNES_LIST is dispatched when the api call fails', async () => {
    const response = { message: 'something is wrong' };
    const requestApi = jest.spyOn(api, 'itunesApi').mockImplementation(() => Promise.reject(response));

    const dispatched = [];

    await runSaga({ dispatch: (action) => dispatched.push(action) }, getItuneData, {});
    expect(dispatched[0]).toEqual({
      type: itunesTypes.FAILURE_GET_ITUNES_LIST,
      error: { message: 'something is wrong' }
    });
    expect(requestApi).toHaveBeenCalledTimes(1);
  });

  it('should ensure that the action SUCCESS_GET_ITUNES_LIST is dispatched when the api call succeeds', async () => {
    const response = { data: { results: [{ artistName: 'adele' }] } };
    const requestAPi = jest.spyOn(api, 'itunesApi').mockImplementation(() => Promise.resolve(response));

    const dispatched = [];

    await runSaga({ dispatch: (action) => dispatched.push(action) }, getItuneData, { itunesName });
    expect(dispatched[0]).toEqual({
      type: itunesTypes.SUCCESS_GET_ITUNES_LIST,
      data: { results: [{ artistName: 'adele' }] }
    });
    expect(requestAPi).toHaveBeenCalledWith(itunesName);
  });
});
