import React from 'react';

function HomeBanner() {
    return (
        <div className="relative w-full h-100 flex items-center justify-center">
            <div className="absolute top-10 left-0 w-full h-1/2 bg-custom-melon -mt-10" style={{width: '100%' }}></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-custom-gray" style={{width: '100%'}}></div>
            <div className="relative flex flex-col items-center justify-center h-full bg-gray-400 mt-10" style={{ borderRadius: '20px', width: '100%', maxWidth: '1400px' }}>
                <img src={process.env.PUBLIC_URL + '/images/frontLogo.png'} alt="Comment Whiz Logo" className="mb-4 justify-center" style={{ width: '300px', height: '300px' }} />
                <h1 className="text-6xl font-bold text-center" style={{ color: '#000000' }}>Comment Whiz</h1>
            </div>
        </div>
    );
}

export default HomeBanner;
