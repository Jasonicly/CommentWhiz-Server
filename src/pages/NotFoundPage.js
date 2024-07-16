import Header from "../components/Header";

const photos = [process.env.PUBLIC_URL + '../images/bonk.jpg', process.env.PUBLIC_URL + '../images/duckk.jpg', process.env.PUBLIC_URL + '../images/frog.jpg', process.env.PUBLIC_URL + '../images/hamster.jpg', 
process.env.PUBLIC_URL + '../images/nobread.jpg',
process.env.PUBLIC_URL + '../images/jas.jpg', process.env.PUBLIC_URL + '../images/jon.jpg', process.env.PUBLIC_URL + '../images/thant.jpg', process.env.PUBLIC_URL + '../images/thuta.jpg', 
process.env.PUBLIC_URL + '../images/wei.jpg'
]; //add pics here :D



const NotFoundPage = () => {
    // Function to get a random photo from the array
    const getRandomPhoto = () => {
      const randomIndex = Math.floor(Math.random() * (photos.length));
      return photos[randomIndex];
    };
  
    const randomPhoto = getRandomPhoto();

    return ( 
    <>
    <Header />
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-8">Oops! The page you are looking for does not exist.</p>
      <img src={randomPhoto} alt="Random" className="w-full max-w-lg rounded shadow-lg" />
    </div>
    </>
);
}

export default NotFoundPage;
