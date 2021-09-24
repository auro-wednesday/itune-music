// import produce from 'immer'
import { tracksReducer, trackTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('Tracks reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(tracksReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type REQUEST_GET_TRACK_DATA is dispatched', () => {
    const trackId = null;
    const expectedResult = { ...state, trackId };
    expect(
      tracksReducer(state, {
        type: trackTypes.REQUEST_GET_TRACK_DATA,
        trackId
      })
    ).toEqual(expectedResult);
  });
  it('should ensure that the track data is present and the trackError = null', () => {
    const data = { trackId: '120954025' };
    const expectedResult = { ...state, trackError: null, trackData: data };
    expect(
      tracksReducer(state, {
        type: trackTypes.SUCCESS_GET_TRACK_DATA,
        data
      })
    ).toEqual(expectedResult);
  });
  it('should ensure that when CLEAR_TRACK_DATA is dispactched it clears all data', () => {
    const expectedResult = { ...state, trackData: [] };
    expect(
      tracksReducer(state, {
        type: trackTypes.CLEAR_TRACK_DATA
      })
    ).toEqual(expectedResult);
  });
  it('should ensure that when FAILURE_GET_TRACK_DATA it shows trackError', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, trackError: error };
    expect(
      tracksReducer(state, {
        type: trackTypes.FAILURE_GET_TRACK_DATA,
        error
      })
    ).toEqual(expectedResult);
  });
});
