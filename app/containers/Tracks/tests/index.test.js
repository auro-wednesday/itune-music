/**
 *
 * Tests for Tracks
 *
 *
 */

import React from 'react';
// import { mapDispatchToProps } from '../index';
// // import { fireEvent } from '@testing-library/dom';
import { mapDispatchToProps, TracksTest as Tracks } from '../index';

import { renderProvider, renderWithIntl, timeout } from '@app/utils/testUtils';

jest.unmock('react-router-dom');
jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ trackId: '120954025' })
}));

describe('<Tracks/>', () => {
  const trackId = '120954025';
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
  it('should call dispatch when required', () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).dispatchRequestGetTrackData(trackId);
    mapDispatchToProps(dispatch).dispatchClearTrackData();
    expect(dispatch.mock.calls[0][0]).toEqual({ trackId: '120954025', type: 'REQUEST_GET_TRACK_DATA' });
  });
});
