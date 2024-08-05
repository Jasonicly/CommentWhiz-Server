import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 

const Features = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 space-y-12">
            {/* Company Mission Section */}
            <section className="bg-gray-100 p-8">
                <div className="max-w-2xl mx-auto text-center"> {/* Set the width to 50% and center-align the content */}
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
                    <p className="text-gray-700 text-lg text-left">
                        At <span className="text-2xl"><span className="text-lime-600 text-2xl font-bold">Comment</span><span className="text-black text-2xl">Whiz</span></span>, our mission is to empower consumers to make informed purchasing decisions by leveraging advanced AI technology to analyze and visualize product reviews. We transform raw comments from e-commerce platforms into clear, insightful graphs that reveal what real customers think about the products, helping users to confidently choose products that meet their needs and preferences.
                    </p>
                </div>
            </section>
                {/* Advantages Section */}
            {/* Advantages Section */}
<section className="bg-white p-8">
    <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Advantages</h2>
        <p className="text-gray-700 text-lg mb-8">Here are some of the key advantages of using our platform:</p>
        <div className="flex justify-around items-center">
            {/* Advantage 1 */}
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
                    <img
                        src="https://via.placeholder.com/150" // Replace with your image URL
                        alt="Advantage 1"
                        className="w-full h-full object-cover"
                    />
                </div>
                <p className="font-bold text-gray-800">Advantage One</p>
                <p className="text-gray-600">Description of the first advantage.</p>
            </div>
            {/* Advantage 2 */}
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
                    <img
                        src="https://via.placeholder.com/150" // Replace with your image URL
                        alt="Advantage 2"
                        className="w-full h-full object-cover"
                    />
                </div>
                <p className="font-bold text-gray-800">Advantage Two</p>
                <p className="text-gray-600">Description of the second advantage.</p>
            </div>
            {/* Advantage 3 */}
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
                    <img
                        src="https://via.placeholder.com/150" // Replace with your image URL
                        alt="Advantage 3"
                        className="w-full h-full object-cover"
                    />
                </div>
                <p className="font-bold text-gray-800">Advantage Three</p>
                <p className="text-gray-600">Description of the third advantage.</p>
            </div>
        </div>
    </div>
</section>


{/* Video and Features Section */}
{/* Special Features Section */}
<section className="bg-white p-8">
    <div className="max-w-4xl mx-auto">
        {/* Centered Header */}
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Special Features</h2>
        
        {/* Carousel of Cards */}
        <div className="flex overflow-x-scroll space-x-4 pb-4">
            {/* Card 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md min-w-[300px]">
                <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                            src="https://via.placeholder.com/150" // Replace with your image URL
                            alt="Card Image 1"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-800">Card Header One</h3>
                        <p className="text-gray-600">Body text describing the content of the first card.</p>
                    </div>
                </div>
            </div>
            {/* Card 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md min-w-[300px]">
                <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                            src="https://via.placeholder.com/150" // Replace with your image URL
                            alt="Card Image 2"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-800">Card Header Two</h3>
                        <p className="text-gray-600">Body text describing the content of the second card.</p>
                    </div>
                </div>
            </div>
            {/* Card 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md min-w-[300px]">
                <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                            src="https://via.placeholder.com/150" // Replace with your image URL
                            alt="Card Image 3"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-800">Card Header Three</h3>
                        <p className="text-gray-600">Body text describing the content of the third card.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Features Grid */}
        <div className="mt-8 flex flex-col md:flex-row">
            <div className="md:w-3/5 md:pr-8">
                <p className="text-gray-700 text-lg mb-6">
                    Discover the unique features that make our product stand out. Each feature is designed to enhance your experience and provide unparalleled value.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Feature 1 */}
                    <div className="flex items-start">
                        <div className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-lime-600 text-gray-700 text-base font-bold p-4">
                            1
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">Feature One</h3>
                            <p className="text-gray-600">Description of the first feature that provides an incredible benefit to the users.</p>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="flex items-start">
                        <div className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-lime-600 text-gray-700 text-base font-bold p-4">
                            2
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">Feature Two</h3>
                            <p className="text-gray-600">Description of the second feature that provides an incredible benefit to the users.</p>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="flex items-start">
                        <div className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-lime-600 text-gray-700 text-base font-bold p-4">
                            3
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">Feature Three</h3>
                            <p className="text-gray-600">Description of the third feature that provides an incredible benefit to the users.</p>
                        </div>
                    </div>
                    {/* Feature 4 */}
                    <div className="flex items-start">
                        <div className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-lime-600 text-gray-700 text-base font-bold p-4">
                            4
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">Feature Four</h3>
                            <p className="text-gray-600">Description of the fourth feature that provides an incredible benefit to the users.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-2/5">
                <iframe
                    className="w-full h-64 md:h-full rounded-lg"
                    src="https://www.youtube.com/embed/example_video_id" // Replace with your video URL
                    title="Video"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    </div>
</section>

                {/* Contact Information Section */}
                <section className="bg-white p-8">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
        {/* Adjusted map width to 60% and added margin-right */}
        <iframe
            className="w-full md:w-3/5 h-96 md:h-[600px] rounded-lg md:mr-8"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019112484716!2d-122.4194154846811!3d37.77492927975965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f1a4e5b1%3A0x4c8b8b4b5f5e4b1!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1616161616161!5m2!1sen!2sin"
            title="Google Maps"
            frameBorder="0"
            allowFullScreen
        ></iframe>
        
        {/* Added more padding for the contact section */}
        <div className="p-4 md:w-2/5">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600">[Your Address Here]</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
                    <p className="text-gray-600">[Your Phone Number Here]</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600">[Your Email Here]</p>
                </div>
            </div>
        </div>
    </div>
</section>
            </main>
            <Footer />
        </div>
    );
}

export default Features;
