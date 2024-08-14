import React, { useEffect, useState } from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import ExcelUpload from './components/ExcelUpload'; // Ensure this import if you're using ExcelUpload

function App() {
    const [mapPins, setMapPins] = useState([]);
    const [isUploadCompleted, setIsUploadCompleted] = useState(false);

    // This useEffect will run only once on component mount
    useEffect(() => {
        populateMapPinsData();
    }, []);

    async function populateMapPinsData() {
        try {
            const response = await fetch('https://localhost:44382/locations');
            const data = await response.json(); // Make sure to parse the JSON response
            setMapPins(data);
        } catch (error) {
            console.error("Failed to fetch map pins:", error);
        }
    }

    const handleUploadComplete = () => {
        setIsUploadCompleted(true);
        populateMapPinsData(); // Refetch map pins data after upload completes
    };

    return (
        <div className="app-container">
            {isUploadCompleted ? (
                <MapComponent className="map-component" pins={mapPins} />
            ) : (
                <ExcelUpload className="excel-upload" onUploadComplete={handleUploadComplete} />
            )}
        </div>
    );
}

export default App;
