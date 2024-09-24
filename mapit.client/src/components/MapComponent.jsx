import React, { useState } from 'react';
import { connect } from 'react-redux';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapStyles = {
    height: "73vh",
    width: "73vh"
};

const defaultCenter = {
    lat: 34.051926, // Center latitude for LA County
    lng: -118.226393 // Center longitude for LA County
};

const LA_BOUNDS = {
    north: 35.1233,
    south: 33.2037,
    west: -119.6682,
    east: -116.8553,
};

const MapComponent = ({ pins }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDMI6jKTqhitVdLVGcf6fUWJASvJHn0EAQ' // Consider moving API keys to environment variables
    });

    const [selectedPin, setSelectedPin] = useState(null);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading maps</div>;

    return (
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={10}
            center={defaultCenter}
            options={{
                restriction: {
                    latLngBounds: LA_BOUNDS,
                    strictBounds: true,
                },
            }}>
            {pins.map(pin => (
                <Marker
                    key={pin.id}
                    position={{ lat: pin.latitude, lng: pin.longitude }}
                    icon={{
                        url: pin.url,
                        scaledSize: new window.google.maps.Size(50, 50),
                    }}
                    onClick={() => setSelectedPin(pin)}
                />
            ))}
            {selectedPin && (
                <InfoWindow
                    position={{ lat: selectedPin.latitude, lng: selectedPin.longitude }}
                    onCloseClick={() => setSelectedPin(null)}
                >
                    <div style={{ width: "250px", height: "250px" }}>
                        <h2>Event Data</h2>
                        <p>Date Event Occurred: {selectedPin.date}</p>
                        <p>Location: {selectedPin.city}, {selectedPin.state}</p>
                        <p>Name of Deceased: {selectedPin.name}</p>
                        <p>Race: {selectedPin.race}</p>
                        <p>Threat Type: {selectedPin.threatType}</p>
                        <p>Was mental illness involved: {selectedPin.wasMentalIllnessRelated}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

const mapStateToProps = (state) => ({
    pins: state.mapPins.pins
});

export default connect(mapStateToProps)(MapComponent);
