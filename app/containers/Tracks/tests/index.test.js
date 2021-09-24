/**
 *
 * Tests for Tracks
 *
 *
 */

import React from 'react';
// import { mapDispatchToProps } from '../index';
// // import { fireEvent } from '@testing-library/dom';
import { TracksTest as Tracks } from '../index';

import { renderProvider, renderWithIntl, timeout } from '@app/utils/testUtils';
jest.unmock('react-router-dom');
jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ trackId: '120954025' })
}));

describe('<Tracks/>', () => {
  const mockRequestGetTrackDataSpy = jest.fn();
  const props = {
    dispatchRequestGetTrackData: mockRequestGetTrackDataSpy
  };
  it('should render tracks component', () => {
    const { baseElement } = renderWithIntl(() => <Tracks />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchRequestGetTrackData on mount', async () => {
    renderProvider(<Tracks {...props} />);
    await timeout(500);
    expect(mockRequestGetTrackDataSpy).toBeCalled();
  });
});
