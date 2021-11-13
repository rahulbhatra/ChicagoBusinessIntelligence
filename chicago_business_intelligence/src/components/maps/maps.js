import React, { Component, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Place from './place';

const AnyReactComponent = ({ text }) => <div>{text}</div>;


const Map = () => {
    const [lat, setLat] = useState(41.878113);
    const [lon, setLon] = useState(-87.629799);
    const [zoom, setZoom] = useState(11);

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCkKisr7W-gLnHjsEY55jurta3qb8-IVaw" }}
          defaultCenter={{lat: lat, lng: lon}}
          defaultZoom={zoom}
        >
          <AnyReactComponent lat={lat} lng={lon} text={'High'} />
          <Place lat={lat} lng={lon} text={'Low'} />
        </GoogleMapReact>
      </div>
    );
}

export default Map;