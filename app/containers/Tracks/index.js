/**
 *
 * Tracks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
// import { FormattedMessage as T } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { useInjectSaga } from '@utils/injectSaga';
import makeSelectTracks from './selectors';
// import saga from './saga';
import { useLocation } from 'react-router';

export function Tracks() {
  // useInjectSaga({ key: 'tracks', saga });
  let location = useLocation();

  return (
    <div>
      <div>TRACK</div>
      <div style={{ textAlign: 'center' }}>
        <img src={location.state.artworkUrl100}></img>
        <div>
          <span style={{ fontWeight: 'bold' }}>Artist: {location.state.artistName}</span>
          <br />
          <span style={{ fontWeight: 'bold' }}>Album Name: {location.state.collectionName}</span>
        </div>
      </div>
    </div>
  );
}

Tracks.propTypes = {
  results: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  tracks: makeSelectTracks()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Tracks);

export const TracksTest = compose(injectIntl)(Tracks);
