import React from 'react';
import { Tooltip } from 'react-tooltip';

const getArrowColor = (original, enhanced) => {
    if (enhanced > original) return 'text-green-500';
    if (enhanced < original) return 'text-red-500';
    return 'text-black';
};

const renderStars = (rating) => {
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const halfStar = roundedRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <>
            {[...Array(fullStars)].map((_, index) => (
                <svg key={`full-${index}`} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049.927C9.433.292 10.567.292 10.951.927l2.364 4.787 5.288.768c.663.097.93.912.448 1.379L15.949 11.5l.898 5.24c.113.657-.578 1.154-1.157.846L10 15.347l-4.69 2.46c-.579.308-1.27-.189-1.157-.846l.898-5.24-3.843-3.64c-.483-.467-.215-1.282.448-1.38l5.288-.767L9.049.927z" />
                </svg>
            ))}
            {halfStar && (
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id="half-grad">
                            <stop offset="50%" stopColor="#ecb10d" />
                            <stop offset="50%" stopColor="gray" stopOpacity="1" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#half-grad)" d="M9.049.927C9.433.292 10.567.292 10.951.927l2.364 4.787 5.288.768c.663.097.93.912.448 1.379L15.949 11.5l.898 5.24c.113.657-.578 1.154-1.157.846L10 15.347l-4.69 2.46c-.579.308-1.27-.189-1.157-.846l.898-5.24-3.843-3.64c-.483-.467-.215-1.282.448-1.38l5.288-.767L9.049.927z" />
                </svg>
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <svg key={`empty-${index}`} className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049.927C9.433.292 10.567.292 10.951.927l2.364 4.787 5.288.768c.663.097.93.912.448 1.379L15.949 11.5l.898 5.24c.113.657-.578 1.154-1.157.846L10 15.347l-4.69 2.46c-.579.308-1.27-.189-1.157-.846l.898-5.24-3.843-3.64c-.483-.467-.215-1.282.448-1.38l5.288-.767L9.049.927z" />
                </svg>
            ))}
        </>
    );
};

const EnhancedRating = ({ originalRating, enhancedRating }) => {
    const arrowColor = getArrowColor(originalRating, enhancedRating);

    return (
        <div className="col-span-1 bg-white p-4 m-2 rounded-lg shadow-md text-center flex flex-col justify-center items-center border-black border">
            <h4 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>Positivity Rating</h4>
            <div className="text-4xl font-bold flex items-center">
                <span data-tooltip-id="original-rating-tooltip">{originalRating}</span>
                <svg className={`w-12 h-12 mx-2 ${arrowColor}`} fill="currentColor" viewBox="-2 -2 20 20">
                    <path d="M10 0L8.59 1.41 13.17 6H0v2h13.17l-4.58 4.59L10 14l7-7-7-7z" />
                </svg>
                <span data-tooltip-id="enhanced-rating-tooltip">{enhancedRating}</span>
            </div>
            <div className="flex mt-2">
                {renderStars(enhancedRating)}
            </div>
            <Tooltip id="original-rating-tooltip" className="custom-tooltip" effect="solid" delayShow={0} place="left">
                Original Rating
            </Tooltip>
            <Tooltip id="enhanced-rating-tooltip" className="custom-tooltip" effect="solid" delayShow={0} place="right">
                Enhanced AI Rating
            </Tooltip>
        </div>
    );
};

export default EnhancedRating;
