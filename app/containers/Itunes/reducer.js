/*
 *
 * Itunes reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const initialState = { itunesName: null, itunesData: [], itunesError: null };

export const { Types: itunesTypes, Creators: itunesCreators } = createActions({
  requestGetItunesList: ['itunesName'],
  successGetItunesList: ['data'],
  failureGetitunesList: ['error'],
  clearItunesList: []
});

/* eslint-disable default-case, no-param-reassign */
export const itunesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case itunesTypes.REQUEST_GET_ITUNES_LIST:
        draft.itunesName = action.itunesName;

        break;
      case itunesTypes.CLEAR_ITUNES_LIST: {
        return initialState;
      }
      case itunesTypes.SUCCESS_GET_ITUNES_LIST:
        draft.itunesData = action.data;

        break;
      case itunesTypes.FAILURE_GET_ITUNES_LIST:
        draft.itunesError = get(action.error, 'message', 'something_went_wrong');

      default:
        return state;
    }
  });

export default itunesReducer;
