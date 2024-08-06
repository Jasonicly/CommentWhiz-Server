import React from 'react';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
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
        <p className="text-gray-700 text-lg mb-8">Our platform offers numerous benefits to ecommerce shoppers! Check us out!</p>
        <div className="flex justify-around items-center">
            {/* Advantage 1 */}
            <div className="flex flex-col items-center">
                <div className="w-32 h-32 mb-4 rounded-full overflow-hidden">
                    <img
                    src={`${process.env.PUBLIC_URL}/images/speed.png`} // Replace with your image URL
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
                    src={`${process.env.PUBLIC_URL}/images/insight.png`} // Replace with your image URL
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
                src={`${process.env.PUBLIC_URL}/images/friendly.png`} // Replace with your image URL
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


{/* Video and Features Section */}
{/* Special Features Section */}
<section className="bg-white p-8 w-screen overflow-hidden">
    <div className="max-w-full mx-auto">
        {/* Centered Header */}
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
                            </Slider>      </div>
      
    </div>

        {/* Features Grid */}
        <div className="mt-8 flex flex-col md:flex-row">
            <div className="md:w-3/5 md:pr-8">
                <p className="text-gray-700 text-lg mb-6">
                    Discover the unique features that make our AI-powered solution stand out. Each feature is designed to enhance your experience and provide unparalleled value.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Feature 1 */}
                    <div className="flex items-start">
                        <div className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-lime-600 text-gray-700 text-base font-bold p-4">
                            1
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">Cutting-Edge Tech</h3>
                            <p className="text-gray-600">We utilize the latest in AI and data science to offer state-of-the-art comment analysis, ensuring users benefit from the most advanced and reliable insights available.</p>
                        </div>
                    </div>
                    {/* Feature 2 */}
                    <div className="flex items-start">
                        <div className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-lime-600 text-gray-700 text-base font-bold p-4">
                            2
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">NLP</h3>
                            <p className="text-gray-600">Using cutting-edge NLP, our tool understands and processes natural language reviews, delivering concise summaries and highlighting key points that matter most to users.</p>
                        </div>
                    </div>
                    {/* Feature 3 */}
                    <div className="flex items-start">
                        <div className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-lime-600 text-gray-700 text-base font-bold p-4">
                            3
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">Deep Learning</h3>
                            <p className="text-gray-600">Our platform leverages advanced deep learning techniques to accurately analyze and interpret customer comments, providing users with insightful sentiment analysis and product feedback.</p>
                        </div>
                    </div>
                    {/* Feature 4 */}
                    <div className="flex items-start">
                        <div className="w-7 h-7 rounded-full inline-flex items-center justify-center bg-lime-600 text-gray-700 text-base font-bold p-4">
                            4
                        </div>
                        <div className="ml-4">
                            <h3 className="text-xl font-semibold text-gray-800">Gen AI</h3>
                            <p className="text-gray-600">By integrating generative AI, our tool not only analyzes but can also generate helpful summaries or alternative viewpoints based on user reviews, enhancing the decision-making process for users.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-2/5">
            <iframe
                    className="w-full h-64 md:h-full rounded-lg"
                    src="https://www.youtube.com/embed/5LkUtBlaW18" // Replace with your embeddable video URL
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
}

export default Features;
