import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ReportComponents/ProductCard';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [category, setCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const reportsPerPage = 10;

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://localhost:3001/api/allreports', {
                    params: {
                        page: currentPage,
                        limit: reportsPerPage,
                        search: searchQuery,
                        sort: sortOption,
                        category,
                    },
                });
                setProducts(response.data.reports);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [currentPage, searchQuery, sortOption, category]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

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
                <aside className="w-1/4 p-4 bg-white shadow-lg rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Search and Filter</h2>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search for keywords"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <select value={sortOption} onChange={handleSortChange} className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="Relevance">Sort by: Relevance</option>
                            <option value="Newest">Newest</option>
                            <option value="Positivity">Positive first</option>
                            <option value="Negativity">Negative first</option>
                        </select>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Categories</h2>
                        <select value={category} onChange={handleCategoryChange} className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="All">All Categories</option>
                            <option value="Beauty, Health & Personal Care">Beauty, Health & Personal Care</option>
                            <option value="Clothing, Shoes & Accessories">Clothing, Shoes & Accessories</option>
                            <option value="Electronics & Computers">Electronics & Computers</option>
                            <option value="Automotive & Industrial">Automotive & Industrial</option>
                            <option value="Toys, Kids & Baby">Toys, Kids & Baby</option>
                            <option value="Books, Media & Music">Books, Media & Music</option>
                            <option value="Grocery & Pet Supplies">Grocery & Pet Supplies</option>
                            <option value="Home, Kitchen & Garden">Home, Kitchen & Garden</option>
                            <option value="Sports & Outdoors">Sports & Outdoors</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </aside>
                <div className="flex flex-1 flex-col p-4 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Reports</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                image={product.pictureUrl}
                                name={product.productName}
                                rating={product.summary}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50 shadow-lg">
                            Previous
                        </button>
                        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50 shadow-lg">
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductList;
