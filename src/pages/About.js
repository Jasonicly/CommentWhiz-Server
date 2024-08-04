import React from 'react';
import Header from '../components/Header'; // Adjust the path if necessary
import Footer from '../components/Footer';

const teamMembers = [
    {
        name: 'Thant Thu Ta',
        role: 'Spy',
        description: 'He is a refuge from mynammer pls help him with his life',
        image: process.env.PUBLIC_URL + '../images/thantthuta.png'
    },
    {
        name: 'Low Yang Kai Miguel',
        role: 'Leader',
        description: 'He likes childern and watches child porn',
        image: process.env.PUBLIC_URL + '../images/miguellyk.png'
    },
    {
        name: 'Lim Jie Hong Jonathan',
        role: 'Gang Leader',
        description: 'A key leader in 369 with extensive experience in gang management.',
        image: process.env.PUBLIC_URL + '../images/john.png'
    },
    {
        name: 'Neo Jason',
        role: 'Gay',
        description: 'A gay that is always willing to be command by anyone',
        image: process.env.PUBLIC_URL + '../images/jas.jpg'
    },
    {
        name: 'Lim Wei Liang',
        role: 'BackEnd Developer',
        description: 'Hard and long when doing the projects',
        image: process.env.PUBLIC_URL + '../images/lwl.png'
    }
];

const About = () => {
    return (
        <div className="overflow-x-hidden min-h-screen">
            <Header />
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">About Us</h1>
                <div className="space-y-12">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center text-center md:text-left">
                            <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto md:mx-0 md:mr-8 mb-4 md:mb-0 border-4 border-gray-300" />
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800">{member.name}</h2>
                                <h3 className="text-xl text-gray-600 mb-2">{member.role}</h3>
                                <p className="text-gray-600">{member.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
