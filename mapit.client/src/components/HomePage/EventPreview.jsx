import React from 'react';
import './EventPreview.css';

class EventPreview extends React.Component {
    render() {
        const { columnDescriptions } = this.props;

        const descriptionItems = Object.entries(columnDescriptions).map(([columnName, description]) => (
            <p key={columnName}><strong>{description}:</strong> {columnName}</p>
        ));

        return (
            <div className="event-preview">
                <h3>Event Data</h3>
                {descriptionItems}
            </div>
        );
    }
}

export default EventPreview;
