import React, { useState, useEffect } from 'react';
import './Cursor.css'; // Import CSS file for cursor styles

const Cursor = () => {
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [isActive, setIsActive] = useState(false); // State to control cursor activity

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosX(e.clientX);
            setPosY(e.clientY);
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Function to toggle cursor activity
    const toggleActive = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            {/* Cursor dot */}
            <div className={`cursor-dot ${isActive ? 'active1' : ''}`} style={{ left: `${posX}px`, top: `${posY}px` }}></div>

            {/* Cursor outline */}
            <div className={`cursor-outline ${isActive ? 'active1' : ''}`} style={{ left: `${posX}px`, top: `${posY}px` }}></div>

            {/* Wrapper to trigger cursor activation */}
            <div className="cursor-wrapper" onMouseEnter={toggleActive} onMouseLeave={toggleActive}></div>
        </>
    );
};

export default Cursor;
