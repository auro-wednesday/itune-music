/**
 *
 * Tracks
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { injectSaga } from 'redux-injectors';
import { T } from '@app/components/T/index';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { useInjectSaga } from '@utils/injectSaga';
import { makeSelectTrack, selectTrackData, selectTrackError, selectTrackId } from './selectors';

import { useParams } from 'react-router-dom';
import { Card } from 'antd';
import styled from 'styled-components';

import trackSaga from './saga';
import { trackCreators } from './reducer';

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: 450px;

    text-align: center;
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
  }
`;

export function Tracks({ intl, dispatchRequestGetTrackData, dispatchClearTrackData, trackData }) {
  const { trackId } = useParams();

  useEffect(() => {
    if (trackId !== trackData?.trackId) {
      dispatchRequestGetTrackData(trackId);
    }
  }, [trackId]);

  return (
    <Container>
      <CustomCard title={intl.formatMessage({ id: 'track-Name' })}>
        <img src={trackData.artworkUrl100}></img>

        <div>
          <T data-testid="artist-name" id="artist-Name" values={{ artistName: trackData.artistName }} />

          <T data-testid="album-name" id="collection-Name" values={{ collectionName: trackData.collectionName }} />

          <T data-testid="country-name" id="country" values={{ country: trackData.country }} />
          <T data-testid="release-date" id="release-date" values={{ releaseDate: trackData.releaseDate }} />
        </div>
      </CustomCard>
    </Container>
  );
}

Tracks.propTypes = {
  results: PropTypes.object,
  intl: PropTypes.object,
  trackData: PropTypes.object,
  dispatchClearTrackData: PropTypes.func,
  dispatchRequestGetTrackData: PropTypes.func
};
Tracks.defaultProps = {
  trackData: {}
};

const mapStateToProps = createStructuredSelector({
  tracks: makeSelectTrack(),
  trackData: selectTrackData(),
  trackError: selectTrackError(),
  trackId: selectTrackId()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetTrackData, clearTrackData } = trackCreators;
  return {
    dispatchRequestGetTrackData: (trackId) => dispatch(requestGetTrackData(trackId)),
    dispatchClearTrackData: () => dispatch(clearTrackData())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl, injectSaga({ key: 'tracks', saga: trackSaga }))(Tracks);

export const TracksTest = compose(injectIntl)(Tracks);
