import { useEffect, useState } from 'react';
import './App.css';
import MapComponent from './components/MapComponent';
import ExcelUpload from './components/ExcelUpload';

function App() {
    const [mapPins, setMapPins] = useState([]); // State variable to store location data

    useEffect(() => {
        populateMapPinsData(); // Fetch location data
    }, []);

    async function populateMapPinsData() {
        const response = await fetch('https://localhost:44382/locations');
        const data = await response.json();
        setMapPins(data);
    }

    return (
        <div className="app-container">
            <MapComponent className="map-component" pins={mapPins} />
            <ExcelUpload className="excel-upload" />
        </div>
    );
}

export default App;
