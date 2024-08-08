import React, { useEffect, useRef } from 'react';

const steps = [
    { number: '00', title: 'Start', description: 'The extension will initiate the process by sending the current website URL to be analyzed by our backend servers. This step ensures that the target webpage is correctly identified and prepared for data extraction.' },
    { number: '01', title: 'Comment Extraction', description: 'Our powerful server will meticulously search through the webpage to extract all the relevant comments. This process involves parsing the HTML structure and identifying user-generated content, ensuring no valuable feedback is missed.' },
    { number: '02', title: 'Comment Processing', description: 'Our state-of-the-art AI model, which has been rigorously trained to understand and process natural language, will analyze the extracted comments. This analysis includes sentiment detection, keyword extraction, and filtering out irrelevant or spam content to ensure the highest quality of data.' },
    { number: '03', title: 'AI Packaging', description: 'Once the comments have been processed, the AI server will compile all the valuable insights and data into a structured package. This package is formatted in a JSON file, making it easy for the application server to handle and further process.' },
    { number: '04', title: 'Application Server Collection', description: 'The application server will receive the JSON file from the AI server. It will then process this data to generate a preliminary summary for the user, offering a quick overview before diving into the detailed report. This step ensures that users have immediate access to key insights.' },
    { number: '05', title: 'Generation of Report', description: 'A comprehensive report will be generated, featuring intuitive visualizations and detailed analytics. This report is designed to provide users with clear and actionable insights, helping them make informed decisions based on the processed comments and data.' },
    { number: '06', title: 'Storage in Database', description: 'The final data package will be securely stored in our MongoDB database. This storage solution ensures that all processed data is preserved for future reference, allowing users to access and review their reports at any time.' },
    { number: '07', title: 'Final Report', description: 'The user can view the detailed report within the extension window or access it as a separate document. This final step is designed to ensure complete user satisfaction by providing a thorough and accessible summary of all analyzed data.' }
];

const HomeDetails = () => {
    const leftColumnRef = useRef(null);
    const parentRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth >= 768 && leftColumnRef.current && parentRef.current) {
                const scrollTop = window.scrollY;
                const parentTop = parentRef.current.offsetTop;
                const parentHeight = parentRef.current.clientHeight;
                const leftColumnHeight = leftColumnRef.current.clientHeight;
                const viewportHeight = window.innerHeight;

                const centerViewport = scrollTop + viewportHeight / 2;
                const centerLeftColumn = parentTop + leftColumnHeight / 2;
                const maxBottom = parentTop + parentHeight - leftColumnHeight + 90;

                if (centerViewport > centerLeftColumn && centerViewport < maxBottom) {
                    leftColumnRef.current.style.position = 'fixed';
                    leftColumnRef.current.style.top = '50%';
                    leftColumnRef.current.style.transform = 'translateY(-50%)';
                    leftColumnRef.current.style.opacity = '1';
                } else if (centerViewport >= (maxBottom + 30)) {
                    leftColumnRef.current.style.position = 'relative';
                    leftColumnRef.current.style.top = `${parentHeight - leftColumnHeight -80}px`;
                    leftColumnRef.current.style.transform = 'translateY(0)';
                    leftColumnRef.current.style.opacity = '1';
                } else {
                    leftColumnRef.current.style.position = 'relative';
                    leftColumnRef.current.style.top = '0';
                    leftColumnRef.current.style.transform = 'translateY(0)';
                    leftColumnRef.current.style.opacity = '1';
                }
            } else if (leftColumnRef.current) {
                leftColumnRef.current.style.position = 'relative';
                leftColumnRef.current.style.top = '0';
                leftColumnRef.current.style.transform = 'translateY(0)';
                leftColumnRef.current.style.opacity = '1';
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll(); // Initial check
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <div className="flex flex-col md:flex-row w-full bg-custom-lightgray py-16 px-10" ref={parentRef}>
            <div className="w-full md:w-1/4 p-4" style={{ maxHeight: '250px' }} ref={leftColumnRef}>
                <div className="text-center mb-12" style={{ minWidth: '300px', maxWidth: '800px' }}>
                    <h2 className="text-3xl font-bold mb-4">Our E-Commerce Report Generating Process</h2>
                    <p className="text-lg">Step-by-Step Analysis of Our Review Processing Approach</p>
                    <div className="w-24 h-1 mx-auto bg-blue-500 mt-4"></div>
                </div>
            </div>
            <div className="w-full md:w-2/3 ml-auto space-y-12">
                {steps.map((step, index) => (
                    <div key={index} className="p-6">
                        <div className="flex items-center mb-4">
                            <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
                                <span className="text-lg font-bold">{step.number}</span>
                            </div>
                            <h3 className="text-2xl font-bold">{step.title}</h3>
                        </div>
                        <p className="text-lg">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeDetails;
