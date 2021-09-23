// import produce from 'immer'
import { tracksReducer, tracksTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('Tracks reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(tracksReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...state, somePayload: 'Mohammed Ali Chherawalla' };
    expect(
      tracksReducer(state, {
        type: tracksTypes.DEFAULT_ACTION,
        somePayload: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
