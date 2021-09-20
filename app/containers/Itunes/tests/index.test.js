/**
 *
 * Tests for Itunes
 *
 *
 */

import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ItunesTest as Itunes } from '../index';

describe('<Itunes /> container tests', () => {
  let props;
  const mockDispatchRequestItunesList = jest.fn();
  const mockClearItunesList = jest.fn();
  beforeEach(() => {
    props = { dispatchRequestItunesList: mockDispatchRequestItunesList, dispatchClearItunesList: mockClearItunesList };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
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
});
