import React, { useState } from 'react';
import Header from '../components/Header'; // Adjust the path if necessary
import Footer from '../components/Footer';

const teamMembers = [
    {
        name: 'Thant Thu Ta',
        role: 'AI Specialist',
        image: process.env.PUBLIC_URL + '/images/thantthuta.png'
    },
    {
        name: 'Low Yang Kai Miguel',
        role: 'Frontend/Backend Developer',
        image: process.env.PUBLIC_URL + '/images/miguellyk.png'
    },
    {
        name: 'Lim Jie Hong Jonathan',
        role: 'AI Specialist',
        image: process.env.PUBLIC_URL + '/images/john.png'
    },
    {
        name: 'Neo Jason',
        role: 'UI/UX Frontend Developer',
        image: process.env.PUBLIC_URL + '/images/jas.jpg'
    },
    {
        name: 'Lim Wei Liang',
        role: 'Backend/Integration Developer',
        image: process.env.PUBLIC_URL + '/images/lwl.png'
    }
];

// Role descriptions
const roleDescription = {
    'AI Specialist': 'We create algorithms to understand user sentiment, categorize feedback & streamline responses from real-time interactions to historical data.',
    'Frontend/Backend Developer': 'We develop and maintain both the front end and back end of our applications, ensuring seamless integration and performance.',
    'UI/UX Frontend Developer': 'We design user interfaces and user experiences that are both visually appealing and highly functional.',
    'Backend/Integration Developer': 'We handle the integration of various systems and ensure the back end is robust and scalable.'
};

// Get unique roles
const roles = [...new Set(teamMembers.map(member => member.role))];

const About = () => {
    const [currentRole, setCurrentRole] = useState('AI Specialist');

    const handleRoleClick = (role) => {
        setCurrentRole(role);
    };

    const displayedMembers = currentRole
        ? teamMembers.filter(member => member.role === currentRole)
        : teamMembers;

    return (
        <div className="overflow-x-hidden min-h-screen bg-white">
            <Header />
            <div className="container mx-auto py-16">
                <div className="flex flex-col md:flex-row items-center md:items-start mb-12 px-4">
                    <img
                        src={process.env.PUBLIC_URL + '/images/group.jpg'}
                        alt="Group"
                        className="w-full md:w-1/2 h-auto rounded-lg shadow-lg mb-8 md:mb-0 md:mr-8 transition-transform duration-300 transform hover:scale-105"
                    />
                    <div className="text-left md:text-left">
                        <h1 className="text-5xl font-bold text-gray-800 mb-4">Who We Are?</h1>
                        <p className="text-gray-600 text-lg">Home / Our Team</p>
                        <p className="text-gray-600 text-lg mt-4">
                            We are students from Ngee Ann Polytechnic, specializing in Cybersecurity. This is our capstone project, where we aim to apply our knowledge and skills to real-world scenarios.
                        </p>
                        <p className="text-gray-600 text-lg mt-4">
                            Our diverse and talented team brings together expertise from various fields, ensuring high-quality project delivery and making a positive impact on the community. Meet our team members and learn more about their roles and contributions.
                        </p>
                    </div>
                </div>

                <br></br>
                <br></br>

                <div className="flex flex-col md:flex-row items-start mb-3">
                    <div className="w-full md:w-1/3 mb-8 md:mb-0 md:mr-8">
                        <p></p>
                    </div>

                    <div className="flex flex-wrap justify-start gap-6 mb-8">
                        {roles.map((role, index) => (
                            <span
                                key={index}
                                className={`cursor-pointer transition-transform duration-300 transform hover:scale-105 ${currentRole === role ? 'text-blue-500 font-bold' : 'text-gray-800'}`}
                                onClick={() => handleRoleClick(role)}
                            >
                                #{role}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start bg-gray-200 px-4 py-4">

                    <div className="w-full md:w-1/5 mb-8 md:mb-0 md:mr-8">
                        <div className="relative text-black p-6 shadow-lg flex flex-col justify-center h-64 md:h-96">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
                                style={{
                                    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/bg.jpg'})`, // Update with your image path
                                }}
                            ></div>
                            <div className="relative z-10">
                                <h2 className="text-xl font-semibold mb-4">What We Do</h2>
                                <p>
                                    {roleDescription[currentRole]}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-4/5 flex justify-end">

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {displayedMembers.map((member, index) => (
                                <div key={index} className="bg-white shadow-lg flex flex-col items-center transition-transform duration-300 transform hover:scale-105 h-120 w-120 max-w-[300px]">

                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-50 object-cover mb-4"
                                    />

                                    <div className="p-4">
                                        <h3 className="text-xl font-bold text-center">{member.name}</h3>
                                        <p className="text-gray-600 text-center font-semibold">{member.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
