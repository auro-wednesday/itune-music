/**
 *
 * Tests for Itunes
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { ItunesTest as Itunes } from '../index';

describe('<Itunes /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Itunes />);
    expect(baseElement).toMatchSnapshot();
  });
});
