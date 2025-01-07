import React, { useState, useEffect } from 'react';

const LandingPage = () => {
    return (
        <div>
            <header>
                <h1>Welcome to the Landing Page</h1>
            </header>
            <section>
                <h2>About Us</h2>
                <p>This section contains information about the project.</p>
            </section>
            <section>
                <h2>Features</h2>
                <ul>
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                </ul>
            </section>
            <section>
                <h2>Contact</h2>
                <p>Contact us at: info@example.com</p>
            </section>
        </div>
    );
};

export default LandingPage;