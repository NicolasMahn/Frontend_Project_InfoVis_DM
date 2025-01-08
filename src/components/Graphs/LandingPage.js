import React, { useState, useEffect } from 'react';

const LandingPage = () => {
    return (
        <div>
            <div class="section">
        <h2>About the Project</h2>
        <p>
            This project focuses on analyzing GASTech employee data related to vehicle tracking, credit card, and loyalty card transactions. 
            The primary objective is to assist law enforcement in identifying suspicious patterns in employee behavior preceding their disappearance. 
            By utilizing visual analytics, the investigation explores interactions between these data sources, uncovering hidden relationships, anomalies, and suspicious activities.
        </p>
    </div>

    <div class="section">
        <h2>Graphs and Visualizations</h2>
        <h3>Purchases per Location</h3>
        <p>
            Displays the number of purchases made at each location, providing insights into spending patterns.
        </p>

        <h3>Purchases Over Time</h3>
        <p>
            Illustrates the evolution of purchases across different time categories. This visualization reveals when specific locations are popular, 
            whether throughout the week or during a typical day.
        </p>

        <h3>Credit and Loyalty Card Matrix</h3>
        <p>
            Matches loyalty cards with credit cards based on the time and location of their usage, uncovering potential correlations between them.
        </p>

        <h3>Cars and Credit Card Matrix</h3>
        <p>
            Matches vehicles with credit cards based on their locations and purchase activities, shedding light on potential associations.
        </p>

        <h3>Location and Employee Map</h3>
        <p>
            Visualizes clusters of parked vehicles (indicated by colors) and identifies meeting points where employees have gathered 
            at least twice for a minimum of 10 minutes within the Abila street network.
        </p>
    </div>

    <div class="section">
        <h2>How to Use</h2>
        <ul>
            <li>
                Each graph comes with default filter selections that highlight significant and interesting data.
            </li>
            <li>
                Additional filtering options, such as location categories, are accessible via buttons in the filter section.
            </li>
            <li>
                To deselect a specific location, vehicle, or card, double-click on the corresponding entry in the graph.
            </li>
            <li>
                For more details about filter options, refer to the information provided under the <strong>?</strong> icon.
            </li>
            <li>
                To reset the dashboard to its default view, simply reload the page.
            </li>
        </ul>
    </div>
        </div>
    );
};

export default LandingPage;