import React, { useState, useEffect } from 'react';

const LandingPage = () => {
    return (
        <div>
            <div class="section">
                <h3>About the Project</h3>
                <p>
                    This project focuses on analyzing GASTech employee data related to vehicle tracking, credit card, and loyalty card transactions. 
                    The primary objective is to assist law enforcement in identifying suspicious patterns in employee behavior preceding their disappearance. 
                    By utilizing visual analytics, the investigation explores interactions between these data sources, uncovering hidden relationships, anomalies, and suspicious activities.
                </p>
                <br/>
            </div>

            <div class="section">
                <h3>Graphs and Visualizations</h3>
                <div style={{marginTop: '0px'}}>
                    <strong>Purchases per Location: </strong> 
                    Displays the number of purchases made at each location, providing insights into spending patterns.
                </div>
                <div style={{marginTop: '5px'}}>
                    <strong>Purchases Over Time: </strong>
                    Illustrates the evolution of purchases across different time categories. This visualization reveals when specific locations are popular, 
                    whether throughout the week or during a typical day.
                </div>
                <div style={{marginTop: '5px'}}>
                    <strong>Credit and Loyalty Card Matrix: </strong>
                    Matches loyalty cards with credit cards based on the time and location of their usage, uncovering potential correlations between them.
                </div>
                <div style={{marginTop: '5px'}}>
                    <strong>Cars and Credit Card Matrix: </strong>
                    Matches vehicles with credit cards based on their locations and purchase activities, shedding light on potential associations.
                </div>
                <div style={{marginTop: '5px'}}>
                    <strong>Location and Employee Map: </strong>
                    Visualizes clusters of parked vehicles (indicated by colors) and identifies meeting points where employees have gathered 
                    at least twice for a minimum of 10 minutes within the Abila street network.
                </div>

                <br/>
            </div>

            <div class="section">
                <h3>How to Use</h3>
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
                        For more details about filter options, refer to the information provided under the <strong>ⓘ</strong> icon.
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default LandingPage;