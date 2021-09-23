/*
 *
 * Tracks reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { createActions } from 'reduxsauce';

export const initialState = { trackId: null, trackData: [], trackError: null };

export const { Types: trackTypes, Creators: trackCreators } = createActions({
  requestGetTrackData: ['trackId'],
  successGetTrackData: ['data'],
  failureGetTrackData: ['error'],
  clearTrackData: []
});

/* eslint-disable default-case, no-param-reassign */
export const tracksReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case trackTypes.CLEAR_TRACK_DATA:
        return initialState;
      case trackTypes.SUCCESS_GET_TRACK_DATA:
        draft.trackData = action.data;
        break;
      case trackTypes.FAILURE_GET_TRACK_DATA:
        draft.trackError = get(action.error, 'message', 'something_went_wrong');
    }
  });

export default tracksReducer;
