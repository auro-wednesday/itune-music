/*
 *
 * Itunes reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = { ituneName: null, ituneData: [], ituneError: null };

export const { Types: itunesTypes, Creators: itunesCreators } = createActions({
  requestGetItunesList: ['ituneName'],
  successGetItunesList: ['data'],
  failureGetitunesList: ['error'],
  clearItunesList: []
});

/* eslint-disable default-case, no-param-reassign */
export const itunesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case itunesTypes.REQUEST_GET_ITUNES_LIST:
        draft.ituneName = action.ituneName;
        console.log('REQUEST_GET_ITUNE++', action.ituneName);
        break;
      case itunesTypes.CLEAR_ITUNES_LIST: {
        console.log('clr list');
        return initialState;
      }
      case itunesTypes.SUCCESS_GET_ITUNE_LIST:
        draft.ituneData = action.data;
        break;
      case itunesTypes.FAILURE_GET_ITUNES_LIST:
        draft.ituneError = get(action.error, 'message', 'something_went_wrong');

      default:
        return state;
    }
  });

export default itunesReducer;
