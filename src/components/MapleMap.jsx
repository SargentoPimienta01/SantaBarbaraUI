import React from 'react';

const MapleGrid = () => {
    const eggs = Array.from({ length: 150 });

    return (
        <div className="maple-grid">
            {eggs.map((_, index) => (
                <div key={index} className="egg-slot"></div>
            ))}
        </div>
    );
};

export default MapleGrid;