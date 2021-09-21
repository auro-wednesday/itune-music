/**
 *
 * Tests for Tracks
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
// import { fireEvent } from '@testing-library/dom'
import { TracksTest as Tracks } from '../index';

describe('<Tracks /> container tests', () => {
  // let submitSpy

  beforeEach(() => {
    // submitSpy = jest.fn()
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<Tracks />);
    expect(baseElement).toMatchSnapshot();
  });
});
