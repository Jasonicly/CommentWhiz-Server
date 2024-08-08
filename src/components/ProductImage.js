import React from 'react';

const ProductImage = ({ imageBase64 }) => {
    return (
        <div className="flex justify-center items-center p-4 m-2 rounded-lg shadow-md text-center border bg-white">
            <img 
                src={`data:image/jpeg;base64,${imageBase64}`} 
                alt="Product" 
                style={{ width: '250px', height: '250px', objectFit: 'contain' }} 
            />
        </div>
    );
};

export default ProductImage;
