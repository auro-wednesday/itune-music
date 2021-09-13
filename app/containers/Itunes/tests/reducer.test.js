// import produce from 'immer'
import { itunesReducer, itunesTypes, initialState } from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('Itunes reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesReducer(undefined, {})).toEqual(state);
  });

  it('should return the update the state when an action of type DEFAULT is dispatched', () => {
    const expectedResult = { ...state, somePayload: 'Mohammed Ali Chherawalla' };
    expect(
      itunesReducer(state, {
        type: itunesTypes.DEFAULT_ACTION,
        somePayload: 'Mohammed Ali Chherawalla'
      })
    ).toEqual(expectedResult);
  });
});
