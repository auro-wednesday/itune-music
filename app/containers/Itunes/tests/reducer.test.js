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

  it('should return the initital state when action of type FETCH_SONG is dispatched', () => {
    const itunesName = 'Adele';
    const expectedResult = { ...state, itunesName };
    expect(
      itunesReducer(state, {
        type: itunesTypes.REQUEST_GET_ITUNES_LIST,
        itunesName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the itunes data is present and itunesError=null', () => {
    const data = { ItunesName: 'Adele' };
    const expectedResult = { ...state, itunesError: null, itunesData: data };
    expect(
      itunesReducer(state, {
        type: itunesTypes.SUCCESS_GET_ITUNES_LIST,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that when FAILURE_GET_ITUNES_LIST it shows itunesError', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, itunesError: error };
    expect(
      itunesReducer(state, {
        type: itunesTypes.FAILURE_GET_ITUNES_LIST,
        error
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that when CLEAR_ITUNES_LIST is dispactched it clears all data', () => {
    const expectedResult = { ...state, itunesData: {} };
    expect(
      itunesReducer(state, {
        type: itunesTypes.CLEAR_ITUNES_LIST
      })
    ).toEqual(expectedResult);
  });
});
