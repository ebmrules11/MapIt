import React from 'react';
import './ExcelUpload.css';
import EventPreview from './EventPreview';

class ExcelUpload extends React.Component {
    state = {
        columnNames: [],
        selectedLatitude: '',
        selectedLongitude: '',
        columnDescriptions: {},
        latLongSubmitted: false,
        descriptionsSubmitted: false,
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const file = this.fileInput.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file, file.name);

            fetch('https://localhost:44382/locations/upload', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    // Update the state with the column names
                    this.setState({ columnNames: data });
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
        }
    };

    handleColumnSelect = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleDescriptionChange = (event) => {
        this.setState(prevState => ({
            columnDescriptions: {
                ...prevState.columnDescriptions,
                [event.target.name]: event.target.value
            }
        }));
    };

    handleSelectionSubmit = () => {
        console.log('Selected Latitude Column:', this.state.selectedLatitude);
        console.log('Selected Longitude Column:', this.state.selectedLongitude);
        this.setState({ latLongSubmitted: true }); // Set to true when lat/long are submitted
    };

    handleDescriptionSubmit = () => {
        console.log('Column Descriptions:', this.state.columnDescriptions);
        this.setState({ descriptionsSubmitted: true }); // Update the state to show the event preview
    };


    renderColumnDescriptions = () => {
        const { columnNames, selectedLatitude, selectedLongitude, columnDescriptions } = this.state

        const removeColumn = (columnName) => {
            // Filter out the column to remove
            const updatedColumnNames = columnNames.filter(name => name !== columnName);
            // Also remove the description of the column
            const updatedColumnDescriptions = { ...columnDescriptions };
            delete updatedColumnDescriptions[columnName];
            // Update the state
            this.setState({ columnNames: updatedColumnNames, columnDescriptions: updatedColumnDescriptions });
        };

        return columnNames
            .filter(name => name !== selectedLatitude && name !== selectedLongitude)
            .map(name => (
                <div key={name} className="description-item">
                    <label htmlFor={`desc-${name}`} className="description-label">
                        Description for "{name}":
                    </label>
                    <div className="description-input-container">
                        <input
                            type="text"
                            id={`desc-${name}`}
                            name={name}
                            value={columnDescriptions[name] || ''}
                            onChange={this.handleDescriptionChange}
                            className="description-input"
                        />
                        <button
                            type="button"
                            onClick={() => removeColumn(name)}
                            className="remove-button"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ));
    };

    render() {
        return (
            <div className="upload-box">
                <h2>Upload Excel File</h2>
                <form onSubmit={this.handleSubmit} className="upload-form">
                    <input
                        type="file"
                        ref={(input) => { this.fileInput = input; }}
                        accept=".xlsx, .xls, .csv"
                        className="file-input"
                    />
                    <button type="submit" className="general-button upload-button">Upload</button>
                </form>

                {this.state.columnNames.length > 0 && (
                    <div className="selection-area">
                        <div className="selection-group">
                            <label htmlFor="latitude-select" className="selection-label">
                                Please Select The Latitude Column:
                            </label>
                            <select
                                id="latitude-select"
                                name="selectedLatitude"
                                value={this.state.selectedLatitude}
                                onChange={this.handleColumnSelect}
                                className="selection-select"
                            >
                                <option value="">--Please choose an option--</option>
                                {this.state.columnNames.map((name, index) => (
                                    <option key={index} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="selection-group">
                            <label htmlFor="longitude-select" className="selection-label">
                                Please Select The Longitude Column:
                            </label>
                            <select
                                id="longitude-select"
                                name="selectedLongitude"
                                value={this.state.selectedLongitude}
                                onChange={this.handleColumnSelect}
                                className="selection-select"
                            >
                                <option value="">--Please choose an option--</option>
                                {this.state.columnNames.map((name, index) => (
                                    <option key={index} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={this.handleSelectionSubmit} className="general-button submit-button">Submit</button>
                    </div>
                )}

                {this.state.latLongSubmitted && (
                    <div className="description-area">
                        <h3>Provide Descriptions for the Other Columns</h3>
                        {this.renderColumnDescriptions()}
                        <button onClick={this.handleDescriptionSubmit} className="general-button submit-descriptions-button">
                            Submit Descriptions
                        </button>
                    </div>
                )}

                {this.state.descriptionsSubmitted && (
                    <EventPreview columnDescriptions={this.state.columnDescriptions} />
                )}
            </div>
        );
    }
}

export default ExcelUpload;

