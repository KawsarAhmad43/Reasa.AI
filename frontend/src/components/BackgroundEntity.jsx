import React from 'react';

const BackgroundEntity = () => {
    return (
        <div className="ai-entity-layer">
            <div className="entity-orb"></div>
            <div className="entity-ring"></div>
            <div className="entity-ring"></div>
            <div className="entity-ring"></div>
            {/* Optional: Add particles if standard library available or leave as CSS rings for performance */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>
    );
};

export default BackgroundEntity;
