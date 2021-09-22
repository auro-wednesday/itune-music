/**
 *
 * Tracks
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { T } from '@app/components/T/index';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { useInjectSaga } from '@utils/injectSaga';
import makeSelectTracks from './selectors';
// import saga from './saga';
import { useLocation } from 'react-router';
import { Card } from 'antd';
import styled from 'styled-components';

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

export function Tracks({ intl }) {
  // useInjectSaga({ key: 'tracks', saga });
  let location = useLocation();

  return (
    <div>
      <Container>
        <CustomCard title={intl.formatMessage({ id: 'track-Name' })}>
          <img src={location.state.artworkUrl100}></img>
          <div>
            <span style={{ fontWeight: 'bold' }}>
              <T id="artist-Name" values={{ artistName: `${location.state.artistName}` }} />
            </span>
            <br />
            <span>
              <T id="collection-Name" values={{ collectionName: `${location.state.collectionName}` }} />
            </span>
            <br />
            <span style={{ fontWeight: 'bold' }}>
              <T id="country" values={{ country: `${location.state.country}` }} />
            </span>
          </div>
        </CustomCard>
      </Container>
    </div>
  );
}

Tracks.propTypes = {
  results: PropTypes.object,
  intl: PropTypes.object
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

export default compose(withConnect, injectIntl)(Tracks);

export const TracksTest = compose(injectIntl)(Tracks);
