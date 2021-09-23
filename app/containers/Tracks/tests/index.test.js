/**
 *
 * Tests for Tracks
 *
 *
 */

import React from 'react';

// import { fireEvent } from '@testing-library/dom';
import { TracksTest as Tracks } from '../index';

import { renderWithIntl } from '@app/utils/testUtils';

describe('<Tracks/>', () => {
  it('should render tracks component', () => {
    const { baseElement } = renderWithIntl(() => <Tracks />);

    expect(baseElement).toMatchSnapshot();
  });
  // it('should get the passed data', () => {
  //   const { getAllByTestId } = renderProvider(() => <Tracks />);
  //   expect(getAllByTestId('artist-name').textContent).toHaveTextContent();
  // });
});