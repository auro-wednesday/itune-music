/*
 *
 * Itunes reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {};

export const { Types: itunesTypes, Creators: itunesCreators } = createActions({
  defaultAction: ['somePayload']
});

/* eslint-disable default-case, no-param-reassign */
export const itunesReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case itunesTypes.DEFAULT_ACTION:
        return { ...state, somePayload: action.somePayload };
      default:
        return state;
    }
  });

export default itunesReducer;
