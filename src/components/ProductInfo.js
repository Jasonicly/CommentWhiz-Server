import React, { useState } from 'react';
import ProductImage from './ProductImage';
import { Button } from './Button';
import LikeButton from './LikeButton';

const ProductInfo = ({ summary, reportId }) => {
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => setShowDetails(!showDetails);

    return (
        <div className="container mx-auto" style={{ marginTop: '60px' }}>
            <div className="bg-white flex flex-col items-center justify-center p-2 mb-4 rounded-lg border-t border-l border-r">
                <ProductImage imageBase64={summary.productImageBase64} />
                <div className="flex text-xl font-bold text-black max-w-6xl items-center justify-center" style={{ fontFamily: "'Oswald', sans-serif", textAlign: 'center' }}>
                    {summary["Product Name"]}
                </div>
                <div className="flex items-center justify-center space-x-2 mt-4 text-black border-black border-t-2 border-b-2 w-full mx-4">
                    <p>Add to favorites</p>
                    <LikeButton reportId={reportId} />
                </div>
                <Button
                    onClick={toggleDetails}
                    text={!showDetails ? "Product Specifications" : "View Less"}
                    className="w-auto m-10 min-w-[125px]"
                />
            </div>
            {showDetails && (
                <div className="flex items-center justify-center -mt-6 mb-4 p-5 bg-white border-b border-l border-r rounded-b-lg">
                    <div className="w-full bg-white p-2 mb-8 rounded-xl shadow-md border-black border custom-scrollbar" style={{ maxHeight: '800px', maxWidth: '900px', overflowY: 'auto' }}>
                        <ul className="list-disc list-inside">
                            {summary["Product Details"].split(', ').map((detail, index) => (
                                <li key={index} className="text-1xl mb-1">
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductInfo;
