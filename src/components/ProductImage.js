import React from 'react';

const ProductImage = ({ imageBase64 }) => {
    return (
        <div className="flex justify-center items-center p-4 m-2 rounded-lg shadow-md text-center border-2 border-black bg-white">
            <img 
                src={`data:image/jpeg;base64,${imageBase64}`} 
                alt="Product" 
                style={{ width: '200px', height: '200px', objectFit: 'contain' }} 
            />
        </div>
    );
};

export default ProductImage;
