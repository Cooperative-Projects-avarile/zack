import React, {useMemo, useState} from "react";
import logo from "./logo.svg";
import "./App.css";
import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
import {ISite} from "./interfaces";
import Autocomplete from "react-google-autocomplete";


function App() {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState<Array<ISite>>([]);
  const [siteSelected, setSiteSelected] = useState<ISite | null>(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    city: "",
    postcode: "",
  })
  const [step, setStep] = useState(0);

  const defaultProps = {
    center: {
      lat: -37.8340428,
      lng: 144.9368477,
    },
    zoom: 11,
  };

  const testSites: Array<ISite> = [
    {
      lat: -25.365,
      lng: 131.043,
      name: "test1_location",
      site_id: 1,
      location: "test Site 1"
    },
    {
      lat: -29.365,
      lng: 135.043,
      name: "test2_location",
      site_id: 2,
      location: "test Site 2"
    },
    {
      lat: -23.365,
      lng: 151.043,
      name: "test3_location",
      site_id: 3,
      location: "test Site 3"
    },
  ]

  const markers: Array<ISite> = [
    {
      lat: -25.365,
      lng: 131.043,
      name: "test1_location",
      site_id: 1,
      location: "test Site 1"
    },
    {
      lat: -29.365,
      lng: 135.043,
      name: "test2_location",
      site_id: 2,
      location: "test Site 2"
    },
    {
      lat: -23.365,
      lng: 151.043,
      name: "test3_location",
      site_id: 3,
      location: "test Site 3"
    },
  ];

  const {isLoaded} = useLoadScript({
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

  const center = useMemo(() => ({lat: -25.363, lng: 131.044}), []);

  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          gap: "10px",
        }}>
        {
          !isLoaded ? <div>Loading...</div> : (
            <GoogleMap mapContainerClassName="map-container" center={center} zoom={10}>
              {markers.map((marker: ISite, index: number) => (
                <MarkerF key={index} position={marker} onClick={() => {
                  console.log('marker clicked' + marker.lat + " " + marker.lng)
                  setSiteSelected(marker)
                }}/>
              ))}
            </GoogleMap>
          )
        }
        <div style={{
          width: "500px",
        }}>
          <input placeholder={"Search"} value={searchString} onChange={(event) => {
            setSearchString(event.target.value);
          }}/>
          <div className="list">
            {step === 0 && siteSelected &&
              (
                <div style={{
                  height: "100%",
                  width: "500px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}>
                  <h4>{siteSelected.name}</h4>
                  <div>{siteSelected.location}</div>
                  <div>{siteSelected.site_id}</div>
                  <h6>Become a volunteer</h6>

                  <div style={{marginTop: "10px"}}/>

                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Your name.." value={user.name}
                         onChange={(event) => {
                           setUser({
                             ...user,
                             name: event.target.value,
                           })
                         }}/>
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" name="email" placeholder="Your email.." value={user.email} onChange={
                    (event) => {
                      setUser({
                        ...user,
                        email: event.target.value,
                      })
                    }
                  }/>
                  <button disabled={!user.name || !user.email} onClick={() => {
                    console.log(user);
                    setStep(1);
                  }}
                          style={{
                            marginTop: "10px",
                          }}
                  >Create My Account
                  </button>

                </div>
              )}
            {
              step === 1 && (
                <div style={{
                  height: "100%",
                  width: "500px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}>
                  <h4>Choose your password</h4>
                  <label htmlFor="password">Password</label>
                  <input type="text" id="password" name="password" placeholder="Your password.." value={user.password}
                         onChange={(event) => {
                           setUser({
                             ...user,
                             password: event.target.value,
                           })
                         }}/>
                  <label htmlFor="confirmpasswd">Confirm Password</label>
                  <input type="text" id="confirm_password" name="confirm_passwd" placeholder="Confirm your Password.."
                         value={user.confirm_password} onChange={
                    (event) => {
                      setUser({
                        ...user,
                        confirm_password: event.target.value,
                      })
                    }
                  }/>

                  <button disabled={user.password !== user.confirm_password ? true : false} onClick={() => {
                    console.log(user);
                    setStep(2);
                  }}
                          style={{
                            marginTop: "10px",
                          }}
                  >Save Password
                  </button>
                </div>
              )
            }
            {
              step === 2 && (
                <div style={{
                  height: "100%",
                  width: "500px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}>
                  <h4>Shipping address</h4>
                  <label htmlFor="Address">Address</label>
                  <input type="text" id="address" name="address" placeholder="" value={user.address}
                         onChange={(event) => {
                           setUser({
                             ...user,
                             address: event.target.value,
                           })
                         }}/>
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" name="city" placeholder="City"
                         value={user.city} onChange={
                    (event) => {
                      setUser({
                        ...user,
                        city: event.target.value,
                      })
                    }
                  }/>
                  <label htmlFor="postcode">Postcode</label>
                  <input type="text" id="postcode" name="postcode" placeholder="Postcode"
                         value={user.postcode} onChange={
                    (event) => {
                      setUser({
                        ...user,
                        postcode: event.target.value,
                      })
                    }
                  }/>

                  <button disabled={!user.password || !user.city || !user.postcode} onClick={() => {
                    console.log(user);
                    setStep(3);
                  }}
                          style={{
                            marginTop: "10px",
                          }}
                  >Save Delivery Address
                  </button>
                </div>
              )
            }
            {
              step === 3 && (
                <div style={{
                  height: "100%",
                  width: "500px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                }}>
                  <h4>Welcome and Congratulations</h4>

                  <p>Your site at {siteSelected?.location} has been reserved.</p>

                  <p>a Sample kit has been sent to {user.address} {user.city} {user.postcode}</p>
                </div>
              )
            }
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
