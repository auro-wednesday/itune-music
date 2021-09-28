/**
 *
 * Tests for Itunes
 *
 *
 */

import React from 'react';
import { renderProvider, renderWithIntl, timeout } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ItunesTest as Itunes, mapDispatchToProps } from '../index';

import { mockItunes } from '@app/utils/mockdata';

jest.unmock('react-router-dom');
const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: '5nvxpbdafa'
  }),
  useHistory: jest.fn().mockReturnValue({
    length: 2,
    action: 'POP',
    location: {
      pathname: '/',
      search: '',
      hash: ''
    },
    push: (route) => mockPush(route)
  })
}));
describe('<Itunes /> container tests', () => {
  const mockDispatchRequestItunesList = jest.fn();
  const mockClearItunesList = jest.fn();
  const mockItunesData = mockItunes;

  const props = {
    dispatchRequestItunesList: mockDispatchRequestItunesList,
    dispatchClearItunesList: mockClearItunesList,
    itunesData: mockItunesData
  };

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Itunes {...props} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dipatchClearItunesList on empty change', async () => {
    const getItunesListSpy = jest.fn();
    const clearItunesListSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <Itunes dispatchClearItunesList={clearItunesListSpy} dispatchRequestItunesList={getItunesListSpy} />
    );

    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getItunesListSpy).toBeCalled();

    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearItunesListSpy).toBeCalled();
  });

  it('should call dispatchRequestItunesList on change', async () => {
    const { getByTestId } = renderProvider(<Itunes {...props} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'any' }
    });
    await timeout(500);
    expect(mockDispatchRequestItunesList).toBeCalled();
  });

  it('shoud push track details page onClick', () => {
    const { getAllByTestId } = renderWithIntl(<Itunes {...props} />);
    expect(getAllByTestId('track-card').length).toBe(2);
    fireEvent.click(getAllByTestId('track-card')[0]);
    expect(mockPush).toHaveBeenCalled();
  });

  it('should call dispatch when required', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).dispatchRequestItunesList('adele');
    mapDispatchToProps(dispatch).dispatchClearItunesList();

    expect(dispatch.mock.calls[0][0]).toEqual({ itunesName: 'adele', type: 'REQUEST_GET_ITUNES_LIST' });
    expect(dispatch.mock.calls[1][0]).toEqual({ type: 'CLEAR_ITUNES_LIST' });
  });
});
