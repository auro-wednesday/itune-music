import React from 'react';

const Tracks = (props) => {
  console.log(props);
  return (
    <div>
      <img src={props.location.state.artworkUrl100}></img>
      <div>
        <span style={{ fontWeight: 'bold' }}>Artist: {props.location.state.artistName}</span>
        <hr />
        <span style={{ fontWeight: 'bold' }}>Album Name: {props.location.state.collectionName}</span>
      </div>
    </div>
  );
};
export default Tracks;
