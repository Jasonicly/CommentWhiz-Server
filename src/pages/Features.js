import React from 'react';
import Header from '../components/Header'; // Adjust the path if necessary

const Features = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-1 p-4 space-y-12">
				{/* Why use CommentWhiz Section */}
				<section className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-2xl font-bold mb-4">Why use CommentWhiz</h2>
					<p className="text-gray-700">[Add content here]</p>
				</section>

				{/* Advantages Section */}
				<section className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-2xl font-bold mb-4">Advantages</h2>
					<p className="text-gray-700">[Add content here]</p>
				</section>

				{/* Special Features Section */}
				<section className="bg-white shadow-lg rounded-lg p-6">
					<h2 className="text-2xl font-bold mb-4">Special Features</h2>
					<p className="text-gray-700">[Add content here]</p>
				</section>

				{/* Video and Text Section */}
				<section className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
					<div className="md:w-1/2 mb-4 md:mb-0">
						<h2 className="text-2xl font-bold mb-4">Our Video</h2>
						<p className="text-gray-700 mb-4">[Add text here]</p>
					</div>
					<div className="md:w-1/2">
						<iframe
							className="w-full h-64 md:h-full rounded-lg"
							src="https://www.youtube.com/embed/dQw4w9WgXcQ"
							title="YouTube video"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				</section>

				{/* Contact Us Section */}
				<section className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
					<div className="md:w-1/2 mb-4 md:mb-0">
						<iframe
							className="w-full h-64 md:h-full rounded-lg"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019112484716!2d-122.4194154846811!3d37.77492927975965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f1a4e5b1%3A0x4c8b8b4b5f5e4b1!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1616161616161!5m2!1sen!2sin"
							title="Google Maps"
							frameBorder="0"
							allowFullScreen
						></iframe>
					</div>
					<div className="md:w-1/2 p-4">
						<h2 className="text-2xl font-bold mb-4">Contact Us</h2>
						<p className="text-gray-700 mb-2">Address: [Add address here]</p>
						<p className="text-gray-700 mb-2">Phone: [Add phone number here]</p>
						<p className="text-gray-700 mb-2">Email: [Add email here]</p>
					</div>
				</section>
			</main>
		</div>
	);
}

export default Features;