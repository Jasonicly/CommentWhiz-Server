import React, { Suspense, lazy } from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const FeaturesSection = lazy(() => import('../components/FeaturesSection'));

const Features = () => {
    const data = [
        {
          name: `Time-Saving Analysis`,
          img: `${process.env.PUBLIC_URL}/images/feature/time.png`,
          review: `Instead of manually sifting through countless reviews, our tool consolidates and visualizes the most relevant information, presenting it in an easy-to-digest format.`
        },
        {
          name: `Trend Identification`,
          img: `${process.env.PUBLIC_URL}/images/feature/trend.png`,
          review: `Our advanced scraping technology identifies common sentiments, helping you stay ahead of market shifts and choose products that align with the latest trends.`
        },
        {
          name: `Comprehensive Product Insights`,
          img: `${process.env.PUBLIC_URL}/images/feature/insight.png`,
          review: `Our AI-powered analysis enables you to make well-informed purchasing decisions based on real customer feedback.`
        },
        {
          name: `Sentiment Analysis`,
          img: `${process.env.PUBLIC_URL}/images/feature/sentiment.png`,
          review: `Quickly gauge whether the general consensus is positive, negative, or neutral, and make informed decisions based on this data.`
        },
        {
          name: `Detailed Visualizations`,
          img: `${process.env.PUBLIC_URL}/images/feature/visual.png`,
          review: `Benefit from detailed visualizations that summarize review data. These visual tools make it easier to interpret large volumes of comments and quickly grasp key insights.`
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 space-y-12">
                {/* Company Mission Section */}
                <section className="bg-gray-100 p-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
                        <p className="text-gray-700 text-lg text-left">
                            At <span className="text-2xl"><span className="text-lime-600 text-2xl font-bold">Comment</span><span className="text-black text-2xl">Whiz</span></span>, our mission is to empower consumers to make informed purchasing decisions by leveraging advanced AI technology to analyze and visualize product reviews. We transform raw comments from e-commerce platforms into clear, insightful graphs that reveal what real customers think about the products, helping users to confidently choose products that meet their needs and preferences.
                        </p>
                    </div>
                </section>
                
                {/* Advantages Section */}
                <section className="bg-white p-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-8 text-gray-800">Advantages</h2>
                        <p className="text-gray-700 text-lg mb-8">Our platform offers numerous benefits to ecommerce shoppers! Check us out!</p>
                        <div className="flex justify-around items-center">
                            {/* Advantage 1 */}
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
                                    <img
                                    src={`${process.env.PUBLIC_URL}/images/speed.png`}
                                    alt="Advantage 1"
                                    className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="font-bold text-gray-800">Speed</p>
                                <p className="text-gray-600">Save time taken to analyze comments.</p>
                            </div>
                            {/* Advantage 2 */}
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
                                    <img
                                    src={`${process.env.PUBLIC_URL}/images/insight.png`}
                                    alt="Advantage 2"
                                    className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="font-bold text-gray-800">Insightful</p>
                                <p className="text-gray-600">Gives user greater insights to make informed decisions.</p>
                            </div>
                            {/* Advantage 3 */}
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
                                    <img
                                    src={`${process.env.PUBLIC_URL}/images/friendly.png`}
                                    alt="Advantage 3"
                                    className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="font-bold text-gray-800">User friendly</p>
                                <p className="text-gray-600">Easy to understand graphical data representations.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Special Features Section */}
                <section className="bg-white p-8 w-screen overflow-hidden">
                    <div className="max-w-full mx-auto">
                        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Special Features</h2>
                        <div className='w-full'>
                            <div className="mt-20">
                                <Slider {...settings}>
                                    {data.map((d) => (
                                        <div key={d.name} className="text-black p-4">
                                            <div className='bg-white h-[350px] w-[300px] mx-2 rounded-xl shadow-lg'>
                                                <div className='h-48 bg-indigo-500 flex justify-center items-center rounded-t-xl'>
                                                    <img src={d.img} alt="" className="h-32 w-32 rounded-full" />
                                                </div>
                                                <div className="flex flex-col items-center justify-center p-4">
                                                    <p className="text-lg font-semibold">{d.name}</p>
                                                    <p className="text-center text-gray-600 text-sm">{d.review}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <Suspense fallback={<div>Loading features...</div>}>
                            <FeaturesSection />
                        </Suspense>
                    </div>
                </section>

                {/* Contact Information Section */}
                <section className="bg-white p-8">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
                        <iframe
                            className="w-full md:w-3/5 h-96 md:h-[600px] rounded-lg md:mr-8"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.738433396531!2d103.7733616738141!3d1.3330916616318897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da107d8eb4e359%3A0x75d2e7ffdeeb0c43!2sNgee%20Ann%20Polytechnic!5e0!3m2!1sen!2ssg!4v1722977338483!5m2!1sen!2ssg"
                            title="Google Maps"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                        <div className="p-4 md:w-2/5">
                            <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Address</h3>
                                    <p className="text-gray-600">535 Clementi Road, Singapore 599489</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
                                    <p className="text-gray-600">8778 2611</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Email</h3>
                                    <p className="text-gray-600">commentwhiz2@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Features;
