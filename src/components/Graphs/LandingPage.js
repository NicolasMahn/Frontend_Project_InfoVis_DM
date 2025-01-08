import React, { useState, useEffect } from 'react';

const LandingPage = () => {
    return (
        <div>
            <header>
                <h2>Welcome to the Gastech Employee Investigation Dashboard</h2>
            </header>
            <section>
                <h3>What it's about:</h3>
                <p>The project focuses on analyzing GASTech employee data related to vehicle tracking, credit card, and loyalty card transactions. 
                    The goal is to support law enforcement in identifying suspicious patterns in employee behavior leading up to their disappearance. 
                    This investigation utilizes visual analytics to explore the interactions between these data sources, aiming to uncover hidden relationships, anomalies, and suspicious activities. </p>
            </section>
            <section>
            <h3>The Graphs</h3>
                <h4>Purchases per Location</h4>
                <p>This Graph shows how many purchases have been made for each location.</p>
                <h4>Puchases over Time</h4>
                <p>This Graph shows how the number of purchases evolves through differnet time categories. 
                    It is possible to see when a specific location is popular Through the week or through a typical day.</p>
                <h4>Credit and Loyalty Card Matrix</h4>
                <p>In this Graph we matched loyalty cards and credit crads to each other based on time and location they were used.</p>
                <h4>Cars and Credit Card Matrix</h4>
                <p>In this Graph we tried to match cars and credit cars based on their location and purchases to each other.</p>
                <h4>Location and Emloyee Map</h4>
                <p>This Map shows clusters of parking cars (color) and points where employees have met minimum 2 times for 10 minutes in the abila street network.</p>
            </section>
            <section>
                <h3>How to use:</h3>
                <ul>
                    <li>For each graph we provided a Filter selection as default to introduce important and interseting data.</li>
                    <li>Other interesting filter setting like location categories can be found as buttons in the filter section.</li>
                    <li>To deselect a location, car or card double click on the entry in the graph.</li>
                    <li>For more inforamtion on the filter options read the Information on the ?-Icon.</li>
                    <li>To get back to the default version of the dashboard simply reload the page.</li>
                    </ul> 
            </section> 
            <section>
                <h3>Suspecios Behavior:</h3>
                <p>We could detect different suspecious behaviors through our analysis:</p>
                <ul>
                    <li>Cars: Not all Cars or Trucks are attached to a employee.</li>
                    <li>Example 2</li>
                </ul>
            </section>
        </div>
    );
};

export default LandingPage;