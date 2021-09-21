import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tracks state domain
 */

const selectTracksDomain = (state) => state.tracks || initialState;

const makeSelectTracks = () => createSelector(selectTracksDomain, (substate) => substate);

export default makeSelectTracks;
export { selectTracksDomain };
