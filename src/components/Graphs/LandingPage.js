import React, { useState, useEffect } from 'react';

const LandingPage = () => {
    return (
        <div>
            <section>
                <h4>What it's about:</h4>
                <p>The project focuses on analyzing GASTech employee data related to vehicle tracking, credit card, and loyalty card transactions. 
                    The goal is to support law enforcement in identifying suspicious patterns in employee behavior leading up to their disappearance. 
                    This investigation utilizes visual analytics to explore the interactions between these data sources, aiming to uncover hidden relationships, anomalies, and suspicious activities. </p>
            <h4>The Graphs</h4>
            <ul>
                <li><b>Purchases per Location:</b> This Graph shows how many purchases have been made for each location.</li>
                <li><b>Puchases over Time:</b> This Graph shows how the number of purchases evolves through differnet time categories. 
                    It is possible to see when a specific location is popular Through the week or through a typical day.</li>
                <li><b>Credit and Loyalty Card Matrix:</b> In this Graph we matched loyalty cards and credit crads to each other based on time and location they were used.</li>
                <li><b>Cars and Credit Card Matrix:</b> In this Graph we tried to match cars and credit cars based on their location and purchases to each other.</li>
                <li><b>Location and Emloyee Map:</b> This Map shows clusters of parking cars (color) and points where employees have met minimum 2 times for 10 minutes in the abila street network.</li>
            </ul>
            </section>
            <section>
                <h4>How to use:</h4>
                <ul>
                    <li>For each graph we provided a Filter selection as default to introduce important and interseting data.</li>
                    <li>Other interesting filter setting like location categories can be found as buttons in the filter section.</li>
                    <li>To deselect a location, car or card double click on the entry in the graph.</li>
                    <li>For more inforamtion on the filter options read the Information on the ?-Icon.</li>
                    <li>To get back to the default version of the dashboard simply reload the page.</li>
                    </ul> 
            </section> 
            <section>
                <h4>Suspecios Behavior:</h4>
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