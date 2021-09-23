import { get } from 'lodash';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tracks state domain
 */

const selectTracksDomain = (state) => state.tracks || initialState;

export const makeSelectTrack = () => createSelector(selectTracksDomain, (substate) => substate);

export const selectTrackData = () => createSelector(selectTracksDomain, (substate) => get(substate, 'trackData'));
export const selectTrackError = () => createSelector(selectTracksDomain, (substate) => get(substate, 'trackError'));
export const selectTrackId = () => createSelector(selectTracksDomain, (substate) => get(substate, 'trackId'));
