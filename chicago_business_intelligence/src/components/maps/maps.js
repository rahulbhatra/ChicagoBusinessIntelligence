import React, { useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { CardContent, Typography, CardActions, Button, Box, Card } from "@mui/material";

const MapContainer = ({markers, google}) => {
  console.log('inside map container', markers);
  const [selected, setSelected] = useState({});
  const [showInfo, setShowInfo] = useState(false);


  const onSelect = (marker) => {
    console.log(marker);
    setSelected(marker);
    setShowInfo(true);
  };

  const onSelectClose = () => {
    setSelected({});
    setShowInfo(false);
  }

  return (
    <div
      style={{
        position: "relative",
        height: "calc(100vh - 20px)"
      }}
    > 
    <div>{markers[0].latitude + " " + markers[0].longitude + {selected}}</div>
      <Map google={google} zoom={10} initialCenter={{lat: 41.881832, lng: -87.623177}}>
        {markers.map((marker) => {
          return(
            <Marker icon={{url: marker.img, scaledSize: new google.maps.Size(32, 32)}} onClick={() => onSelect(marker)} key={marker.key} position={{lat: marker.latitude, lng: marker.longitude}} />
          )
        })}
        <InfoWindow
          position={{lat: selected.latitude, lng: selected.longitude}}
          clickable={true}
          visible={showInfo}
          onCloseClick={() => onSelectClose()}
        >
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" component="div">
                  {"Community Area Name: " + selected.community_area}
                </Typography>
                <Typography color="text.secondary">
                  {"Community Area Code: " + selected.ccvi_score}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {"CCVI Score: " + selected.ccvi_score}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">{selected.ccvi_category}</Button>
              </CardActions>
            </Card>
          </Box>
        </InfoWindow>
      </Map>
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCkKisr7W-gLnHjsEY55jurta3qb8-IVaw",
  v: "3.30"
})(MapContainer);
