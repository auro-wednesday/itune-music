import { get } from 'lodash';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itunes state domain
 */

const selectItunesDomain = (state) => state.itunes || initialState;

export const makeSelectItunes = () => createSelector(selectItunesDomain, (substate) => substate);

export const selectItunesData =()=>
createSelector(selectItunesDomain,(substate)=> get(substate,'itunesData'));

export const selectItunesError=()=>
createSelector(selectItunesDomain,(substate)=> get(substate,'itunesError'));

export const selectItunesName=()=>
createSelector(selectItunesDomain,(substate)=>get(substate,'itunesName'));



