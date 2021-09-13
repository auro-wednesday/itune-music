import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itunes state domain
 */

const selectItunesDomain = (state) => state.itunes || initialState;

const makeSelectItunes = () => createSelector(selectItunesDomain, (substate) => substate);

export default makeSelectItunes;
export { selectItunesDomain };
