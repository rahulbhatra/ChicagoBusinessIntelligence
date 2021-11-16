import React, { useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const MapContainer = ({markers, google}) => {
  console.log('inside map container', markers);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

   

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
    
  }

  return (
    <div
      style={{
        position: "relative",
        height: "calc(100vh - 20px)"
      }}
    > 
    <div>{markers[0].latitude + " " + markers[0].longitude}</div>
      <Map google={google} zoom={14} initialCenter={{lat: 41.881832, lng: -87.623177}}>
        <Marker
          onClick={() => onMarkerClick({name:'rahul sharma'})}
          position={{lat: markers[0].longitude, lng: markers[0].latitude}}
          name={"Current location"}
        />

        {markers.map((marker) => {
          return(
            <Marker key={marker.key} position={{lat: 41.881832, lng: -87.623177}} />
          )
        })}
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
        >
          <div>
            <h1>{selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCkKisr7W-gLnHjsEY55jurta3qb8-IVaw",
  v: "3.30"
})(MapContainer);
