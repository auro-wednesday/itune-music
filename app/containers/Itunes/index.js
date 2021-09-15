/**
 *
 * Itunes
 *
 */
import React, { useState } from 'react';
// import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
// import { Helmet } from 'react-helmet';
import debounce from 'lodash/debounce';
import get from 'lodash/get';
import { injectSaga } from 'redux-injectors';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {makeSelectItunes, selectItunesData, selectItunesError, selectItunesName} from './selectors'
import { isEmpty } from 'lodash';
import { itunesCreators } from './reducer';

import itunesSaga from './saga';

export function Itunes({ itunesName, itunesData={}, ituneError, dispatchItunesList, dispatchClearItunesList }) {
  const [name, SetName] = useState();
  const [data, SetData] = useState('');
  const API = 'https://itunes.apple.com/search?term=';

  const handleOnChange = (txt) => {
    SetName(txt);
  };
  const handleOnClick = (txt) => {
    if (!isEmpty(txt)) {
      dispatchItunesList(txt);
      console.log(get(itunesData,'results'));
    } else {
      dispatchClearItunesList();
    }
  };

  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderItunesList=()=>{
    const data= get(itunesData,'results',[]);
    if(!isEmpty(data)){
      return(
        <div>{Object.keys(data).map((item,id)=>{
          return(
            <div key={id}>
              {data[item].artistName}   <span style={{fontWeight:"bold"}}>{data[item].trackName}</span>
            </div>
          )
        })}

        </div>


      )
    }

  }
  return (
    <div>
      <input
        type="text"
        data-testid="search-bar"
        className="songNameInput"
        placeholder="search"
        onChange={(e) => {
          debouncedHandleOnChange(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          handleOnClick(name);
        }}
      >
        SEARCH
      </button>
      <div>
        {renderItunesList()}
      </div>
    </div>
  );
}

Itunes.propTypes = {};

const mapStateToProps = createStructuredSelector({
  itunes: makeSelectItunes(),
  itunesData: selectItunesData(),
  itunesError: selectItunesError(),
  ItunesName: selectItunesName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetItunesList, clearItunesList } = itunesCreators;
  return {
    dispatchItunesList: (txt) => dispatch(requestGetItunesList(txt)),
    dispatchClearItunesList: () => dispatch(clearItunesList())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'itunes', saga: itunesSaga }))(Itunes);

export const ItunesTest = compose(injectIntl)(Itunes);
