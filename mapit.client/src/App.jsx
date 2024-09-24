import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MapComponent from './components/MapComponent';
import ExcelUpload from './components/HomePage/ExcelUpload';
import HomePage from './components/HomePage/HomePage';  

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
        <Router>
        <div className="app-container">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/upload" element={<ExcelUpload />} />
                    <Route path="/map" element={<MapComponent />} />
                </Routes>
        </div>
        </Router>
    );
}

export default App;
