import React from 'react'
import slotIcon1P from "../../assests/Map-Icon/Unoccupied/Free 1P.png";
import { compose, withProps, withHandlers} from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";
import UserIcon from "../../assests/Map-Icon/Button icon/Driver-icon.jpg";
/*global google*/
import classes from './MapComponent.module.css'

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBQHtyAJNwYpl47skW7ySxFtuF6VCGm51A&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100vh` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) => {

    console.log('Direction: ', props.directions);
        let handleMarkerClick = (id) => {
            props.onSlotSelected(id)
        };

        return (
            <GoogleMap
                zoom={+props.zoomLevel}
                defaultCenter={{lat: props.userCurrentLoc.lat, lng: props.userCurrentLoc.lng}}
                defaultOptions={{
                    zoomControl: false,
                    fullscreenControl: false,
                    streetViewControl: false,
                    mapTypeControl: false
                }}
                onCenterChanged={props.onCenterChanged}

            >
                <Marker
                    position={{lat: props.userCurrentLoc.lat, lng: props.userCurrentLoc.lng}}
                    icon={{
                        url: UserIcon,
                        scaledSize: new google.maps.Size(50,50)
                    }}
                />
                {props.isChanged ? <div></div> : null}
                {/*Generate parking slot markers*/}
                {props.parkingSlots.length > 0 ? props.parkingSlots.map(slot => {
                        return (
                            <Marker
                                key={slot.st_marker_id}
                                position={{
                                    lat: +slot.lat,
                                    lng: +slot.lon
                                }}
                                icon={{
                                    url: slotIcon1P,
                                    scaledSize: new google.maps.Size(30,30)
                                }}
                                data={{
                                    id: slot.st_marker_id
                                }}
                                onClick={() => handleMarkerClick(slot.st_marker_id)}
                                title={"Available parking slot"}
                            />
                        )
                    })
                    : null
                }
                {props.directions ? (
                    <div>
                        <DirectionsRenderer options={{suppressMarkers: true, preserveViewport: true}} directions={props.directions} />
                        <button className={classes.CancelDirectionBtn} onClick={props.onCancelDirection}>
                            <i className="fas fa-ban"></i>
                        </button>
                        <div className={classes.DirectionDetails}>
                            <h4><strong>Trip Details</strong></h4>
                            {props.directions.routes[0].legs[0].duration.text}
                        </div>
                    </div>
                    ) : null
                }


                <button className={classes.ClosestButton} onClick={props.onGoToClosestSlot} >
                    <i className="fas fa-shipping-fast"></i>
                </button>
            </GoogleMap>
        );
    }

);

export default MyMapComponent;
