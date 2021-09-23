/*
 *
 * Tracks reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {};

export const { Types: tracksTypes, Creators: tracksCreators } = createActions({
  defaultAction: ['somePayload']
});

/* eslint-disable default-case, no-param-reassign */
export const tracksReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case tracksTypes.DEFAULT_ACTION:
        return { ...state, somePayload: action.somePayload };
      default:
        return state;
    }
  });

export default tracksReducer;
