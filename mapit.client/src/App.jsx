import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MapComponent from './components/MapComponent';
import ExcelUpload from './components/HomePage/ExcelUpload';
import HomePage from './components/HomePage/HomePage';  

function App() {
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
