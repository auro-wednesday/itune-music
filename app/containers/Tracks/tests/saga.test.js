/**
 * Test tracks sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import * as api from '@app/services/trackIdApi';
import tracksSaga, { getTrackData } from '../saga';
import { trackTypes } from '../reducer';

describe('Tracks saga tests', () => {
  const generator = tracksSaga();
  const trackId = '120954025';

  it('should start task to watch for REQUEST_GET_TRACK_DATA action', () => {
    expect(generator.next().value).toEqual(takeLatest(trackTypes.REQUEST_GET_TRACK_DATA, getTrackData));
  });
  it('should ensure that the action FAILURE_GET_TRACK_DATA is dispatched when the api call fails', async () => {
    const response = { message: 'something is wrong' };
    const requestApi = jest.spyOn(api, 'trackIdApi').mockImplementation(() => Promise.reject(response));

    const dispatched = [];

    await runSaga({ dispatch: (action) => dispatched.push(action) }, getTrackData, {});
    expect(dispatched[0]).toEqual({
      type: trackTypes.FAILURE_GET_TRACK_DATA,
      error: { message: 'something is wrong' }
    });
    expect(requestApi).toHaveBeenCalledTimes(1);
  });
  it('should ensure that the action SUCCESS_GET_TRACK_DATA is dispatched when the api call succeeds', async () => {
    const response = { data: { results: [{ artistName: 'Jack Johnson' }] } };
    const requestAPi = jest.spyOn(api, 'trackIdApi').mockImplementation(() => Promise.resolve(response));

    const dispatched = [];

    await runSaga({ dispatch: (action) => dispatched.push(action) }, getTrackData, { trackId });
    expect(dispatched[0]).toEqual({
      type: trackTypes.SUCCESS_GET_TRACK_DATA,
      data: { artistName: 'Jack Johnson' }
    });
    expect(requestAPi).toHaveBeenCalledWith(trackId);
  });
  it('should show notification and push itunes page', async () => {
    const response = { data: { results: [] } };
    const requestAPi = jest.spyOn(api, 'trackIdApi').mockImplementation(() => Promise.resolve(response));

    const dispatched = [];

    await runSaga({ dispatch: (action) => dispatched.push(action) }, getTrackData, { trackId });
    expect(dispatched[0]).toEqual({
      type: '@@router/CALL_HISTORY_METHOD',
      payload: {
        args: ['/itunes'],
        method: 'push'
      }
    });
    expect(requestAPi).toHaveBeenCalledWith(trackId);
  });
});
