import React, { useEffect, useState, useRef } from 'react';
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
    const [lastSearchQuery, setLastSearchQuery] = useState(''); // Store the last search query
    const reportsPerPage = 12;

    const enterPressedRef = useRef(false); // Ref to track if Enter was pressed

    // Fetch Products function
    const fetchProducts = async (search = searchQuery, page = currentPage) => {
        setLoading(true);
        try {
            const response = await axios.get('https://localhost:3001/api/allreports', {
                params: {
                    page,
                    limit: reportsPerPage,
                    search,
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

    // Debounce mechanism for search input
    useEffect(() => {
        if (enterPressedRef.current) {
            enterPressedRef.current = false; // Reset after handling Enter key
            return;
        }

        const delayDebounceFn = setTimeout(() => {
            if (searchQuery !== lastSearchQuery) {
                fetchProducts();
                setCurrentPage(1); // Reset to first page on search
                setLastSearchQuery(searchQuery); // Update last search query
            }
        }, 2000);

        return () => clearTimeout(delayDebounceFn); // Cleanup timeout if component unmounts or searchQuery changes
    }, [searchQuery, lastSearchQuery]); // Only trigger effect when searchQuery changes

    // Effect to trigger fetch when page, sort, or category changes
    useEffect(() => {
        fetchProducts();
    }, [currentPage, sortOption, category]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission behavior
            if (searchQuery !== lastSearchQuery) {
                enterPressedRef.current = true; // Set ref to true when Enter is pressed
                fetchProducts(); // Trigger immediate fetch
                setLastSearchQuery(searchQuery); // Update last search query
            }
        }
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
                            onKeyDown={handleSearchKeyDown}
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

                    {/* Loading and Error Handling */}
                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-xl">Error: {error}</div>
                    ) : (
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
                    )}

                    {/* Pagination */}
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
