import React from 'react';

class ExcelUpload extends React.Component {
    state = {
        columnNames: [],
        selectedLatitude: '',
        selectedLongitude: '',
        columnDescriptions: {},
        latLongSubmitted: false
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
        // Here you would typically send the selections to the backend or process them further
        console.log('Selected Latitude Column:', this.state.selectedLatitude);
        console.log('Selected Longitude Column:', this.state.selectedLongitude);
        this.setState({ latLongSubmitted: true }); // Set to true when lat/long are submitted
    };

    handleDescriptionSubmit = () => {
        console.log('Column Descriptions:', this.state.columnDescriptions);
        // TODO: Handle the column descriptions, such as sending them to a backend service
    };


    renderColumnDescriptions = () => {
        const { columnNames, selectedLatitude, selectedLongitude, columnDescriptions } = this.state;

        const wrapperStyle = {
            columns: '2 300px', // Creates a multi-column layout where each column is at least 300px wide
            maxWidth: '100%',
        };

        const inputStyle = {
            padding: '8px',
            margin: '5px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: 'calc(100% - 10px)', // Full width minus margin
            boxSizing: 'border-box', // Border included in width
        };

        const labelStyle = {
            display: 'block',
            margin: '10px 0 5px 0',
            fontWeight: 'bold',
        };

        const divStyle = {
            marginBottom: '15px',
            columns: '2 300px', // Creates a multi-column layout where each column is at least 300px wide
            maxWidth: '100%',
        };

        return columnNames
            .filter(name => name !== selectedLatitude && name !== selectedLongitude)
            .map(name => (
                <div key={name} style={divStyle}>
                    <label htmlFor={`desc-${name}`} style={labelStyle}>
                        {`Description for ${name}:`}
                    </label>
                    <input
                        type="text"
                        id={`desc-${name}`}
                        name={name}
                        value={columnDescriptions[name] || ''}
                        onChange={this.handleDescriptionChange}
                        style={inputStyle}
                    />
                </div>
            ));
    };


    render() {
        return (
            <div className="upload-box">
                <h2>Upload Excel File</h2>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="file"
                        ref={(input) => {
                            this.fileInput = input;
                        }}
                        accept=".xlsx, .xls, .csv"
                    />
                    <button type="submit">Upload</button>
                </form>

                {this.state.columnNames.length > 0 && (
                    <div>
                        <div>
                            <label htmlFor="latitude-select">Please Select The Latitude Column: </label>
                            <select
                                id="latitude-select"
                                name="selectedLatitude"
                                value={this.state.selectedLatitude}
                                onChange={this.handleColumnSelect}
                            >
                                <option value="">--Please choose an option--</option>
                                {this.state.columnNames.map((name, index) => (
                                    <option key={index} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="longitude-select">Please Select The Longitude Column: </label>
                            <select
                                id="longitude-select"
                                name="selectedLongitude"
                                value={this.state.selectedLongitude}
                                onChange={this.handleColumnSelect}
                            >
                                <option value="">--Please choose an option--</option>
                                {this.state.columnNames.map((name, index) => (
                                    <option key={index} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </select>

                            <button onClick={this.handleSelectionSubmit}>Submit</button>
                        </div>
                    </div>
                )}

                {this.state.latLongSubmitted && ( // Only show if the user submitted the latitude and longitude already
                    <div>
                        <h3>Provide Descriptions for Other Columns</h3>
                        {this.renderColumnDescriptions()}
                        <button onClick={this.handleDescriptionSubmit}>Submit Descriptions</button>
                    </div>
                )}
            </div>
        );
    }
}

export default ExcelUpload;

