import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Summary from './components/Summary';
import Reviews from './components/Reviews';
import KeyTopics from './components/KeyTopics';

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/process_reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sentiment Analysis</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        {data && (
          <>
            <Summary summary={data.summary} />
            <KeyTopics keyTopics={data.key_topics} />
            <Reviews reviews={data.reviews} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
