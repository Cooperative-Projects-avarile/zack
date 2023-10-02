import React, { useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

function App() {
  const defaultProps = {
    center: {
      lat: -37.8340428,
      lng: 144.9368477,
    },
    zoom: 11,
  };

  const markers: Array<{ lat: number; lng: number, address:string, name: string }> = [
    {
      lat: -25.365,
      lng: 131.043,
      address: "test1",
      name: "test1_location",
    },
    {
      lat: -25.323,
      lng: 131.017,
      address: "test2",
      name: "test2_location",
    },
    {
      lat: -25.362,
      lng: 131.043,
      address: "test3",
      name: "test3_location",
    },
  ];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC2UQBWd-kkALximl2gxxBxuVTJ9rE2b7w",
  });

  // const onLoad = (map: any) => {
  //   const bounds = new google.maps.LatLngBounds();
  //   if (markers && markers.length > 0) {
  //     for (let item of markers) {
  //       bounds.extend(item);
  //     }
  //   }
  //   map.fitBounds(bounds);
  // };

  const center = useMemo(() => ({ lat: -25.363, lng: 131.044 }), []);

  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            gap: "10px",
          }}>
          <GoogleMap mapContainerClassName="map-container" center={center} zoom={10} >
            {markers.map((marker, index) => (
              <MarkerF key={index} position={marker} onClick={() => { 
                console.log('marker clicked'+ marker.lat + " " + marker.lng)
              }} />
            ))}
        </GoogleMap>
        <div className="list-container">
              
        </div>
        </div>
    
    </div>
  );
}

export default App;
