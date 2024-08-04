import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ReportComponents/ProductCard';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const FavoritePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoriteReports = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const decodedToken = jwtDecode(token); // Decode the token to get user info
                const userId = decodedToken?.id;

                if (!userId) {
                    throw new Error('No userId found in token');
                }

                const response = await axios.get(`https://localhost:3001/user/${userId}/favoriteReports`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProducts(response.data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching favorite reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteReports();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-500" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500 text-xl">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 p-4">
                <div className="max-w-7xl mx-auto w-full">
                    <h1 className="text-3xl font-bold mb-6 text-center">My Favorite Reports</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard
                                key={product._id}
                                id={product._id}
                                image={product.summary?.productImageBase64}
                                name={product.summary?.['Product Name']}
                                rating={product.summary?.['Enhanced Rating']}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FavoritePage;
