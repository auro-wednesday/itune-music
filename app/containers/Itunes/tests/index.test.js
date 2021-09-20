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
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(
      <Itunes dispatchRequestItunesList={submitSpy} dispatchClearItunesList={submitSpy} />
    );
    expect(baseElement).toMatchSnapshot();
  });
  // it('should update playing state on button click', () => {
  //   const mockbuttonclick = jest.fn();

  //   const { getByTestId } = renderProvider(<button onClick={mockbuttonclick}></button>);

  //   fireEvent.click(getByTestId('play-button'));
  //   expect(mockbuttonclick).toHaveBeenCalled();
  // });

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

  it('should call dispatchItunesList on change', async () => {
    const { getByTestId } = renderProvider(
      <Itunes dispatchRequestItunesList={submitSpy} dispatchClearItunesList={submitSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'any' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
