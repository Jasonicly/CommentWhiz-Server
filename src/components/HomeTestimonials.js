import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const testimonials = [
    {
        quote: "The CommentWhiz extension has significantly improved our ability to analyze product reviews. The AI-generated reports are incredibly detailed and have helped us make informed decisions quickly.",
        author: "Lee Guan Xi",
        position: "Local Ngee Ann student, CSF01",
        company: "Ngee Ann Polytechnic Singapore",
    },
    {
        quote: "Using CommentWhiz has been a game changer for our team. The sentiment analysis and bot detection features provide us with comprehensive insights that we previously lacked.",
        author: "Lim Rachelle",
        position: "Local Ngee Ann student, CSF01",
        company: "Ngee Ann Polytechnic Singapore",
    },
    {
        quote: "The AI models used by CommentWhiz are impressive. The summarized reports are accurate and save us a lot of time. Highly recommend this extension for anyone dealing with large volumes of product reviews.",
        author: "Ong Jun Jie",
        position: "Local Ngee Ann student, CSF01",
        company: "Ngee Ann Polytechnic Singapore",
    }
];

const HomeTestimonials = () => {
    return (
        <div className="bg-white w-full py-16 px-10">
            <div className="mb-12 ml-10">
                <h3 className="text-3xl font-bold mb-4 text-left">Testimonials</h3>
                <div className="w-40 h-1 bg-blue-500"></div>
            </div>
            <div className="flex flex-wrap justify-center">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full max-w-sm p-4">
                        <div className="p-6 h-full">
                            <div className="text-left mb-4">
                                <FaQuoteLeft className="text-blue-500" />
                                <p className="italic text-lg">{testimonial.quote}</p>
                                <FaQuoteRight className="text-blue-500 float-right" />
                            </div>
                            <p className="font-bold text-lg">{testimonial.author}</p>
                            <p className="text-lg">{testimonial.position}</p>
                            <p className="text-lg">{testimonial.company}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeTestimonials;